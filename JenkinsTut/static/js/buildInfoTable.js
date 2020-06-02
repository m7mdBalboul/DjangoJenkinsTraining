const apiLink = JSON.parse(document.getElementById('api').textContent);

$(document).ready(function() {
    const groupColumn = 2;
    let tableData;

    $.ajax({
            type: 'GET',
            url: apiLink,
            success: function (response) {
                tableData =  response && response.builds;
            },
            error: function (response) {
                console.error(`not valid and its ${response}`)
            }
        })
} );