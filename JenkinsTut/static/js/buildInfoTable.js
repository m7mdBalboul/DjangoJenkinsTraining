const apiLink = JSON.parse(document.getElementById('api').textContent);

$(document).ready(function() {
    const groupColumn = 0;
    let tableData;
    const loadDataTable = async () => {
        const data = await $.ajax({
            type: 'GET',
            url: apiLink,
            success: function (response) {
                tableData =  response && response.builds.reduce((acc, current) => (
                        [...acc, ...current.subBuilds.map(sub => ({...sub, number: current.number}))]
                    ), []);
            },
            error: function (response) {
                console.error(`not valid and its ${response}`)
            }
        })
        $('#data-table').DataTable( {
            data: tableData,
            columns: [
                { data: "number", title: "Build Number" },
                { data: "buildNumber", title: "Sub Build Number" },
                { data: "duration", title: "Duration" },
                { data: "result", title: "Result" },
            ],
            drawCallback: function ( settings ) {
                const api = this.api();
                const rows = api.rows( {page:'current'} ).nodes();
                let last=null;

                api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
                    if ( last !== group ) {
                        $(rows).eq( i ).before(
                            '<tr class="group"><td colspan="5">'+group+'</td></tr>'
                        );

                        last = group;
                    }
                } );
            }
        });
    }
    loadDataTable()
});