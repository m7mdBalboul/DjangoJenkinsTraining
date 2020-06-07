export const loadDataTable = ($, data, groupingColumnIndex = 0) => {
	$('#data-table').DataTable({
		data,
		columns: [
			{ data: 'parentBuildNumber', title: 'Parent Build Number' },
			{ data: 'buildNumber', title: 'Sub Build Number' },
			{ data: 'duration', title: 'Duration' },
			{ data: 'result', title: 'Result' },
		],
		drawCallback: function (settings) {
			const api = this.api();
			const rows = api.rows({ page: 'current' }).nodes();
			let last = null;

			api
				.column(groupingColumnIndex, { page: 'current' })
				.data()
				.each(function (group, i) {
					if (last !== group) {
						$(rows)
							.eq(i)
							.before(
								`<tr class="group"><td colspan="5">build No: ${group}</td></tr>`
							);

						last = group;
					}
				});
		},
	});
};
