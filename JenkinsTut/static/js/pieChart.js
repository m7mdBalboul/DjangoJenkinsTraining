export const createPieChart = (title = 'pie', data = [], chartId) =>
	Highcharts.chart(chartId, {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie',
		},
		title: {
			text: title,
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
		},
		accessibility: {
			point: {
				valueSuffix: '%',
			},
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
				},
			},
		},
		series: [
			{
				name: 'Brands',
				colorByPoint: true,
				data: [
					{
						name: 'Chrome',
						y: 61.41,
					},
					{
						name: 'Internet Explorer',
						y: 11.84,
					},
					{
						name: 'Firefox',
						y: 10.85,
					},
					{
						name: 'Edge',
						y: 4.67,
					},
					{
						name: 'Safari',
						y: 4.18,
					},
					{
						name: 'Sogou Explorer',
						y: 1.64,
					},
					{
						name: 'Opera',
						y: 1.6,
					},
					{
						name: 'QQ',
						y: 1.2,
					},
					{
						name: 'Other',
						y: 2.61,
					},
				],
			},
		],
	});
