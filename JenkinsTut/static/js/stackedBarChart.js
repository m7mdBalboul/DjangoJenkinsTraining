export const createStackedBarChart = (
	data,
	title,
	chartId,
	yAxisTitle,
	...options
) =>
	Highcharts.chart(chartId, {
		chart: {
			type: 'column',
		},
		title: {
			text: title,
		},
		xAxis: {
			categories: data.categories,
		},
		yAxis: {
			min: 0,
			title: {
				text: yAxisTitle,
			},
		},
		tooltip: {
			pointFormat:
				'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			shared: true,
		},
		legend: {
			enabled: false,
		},
		plotOptions: {
			column: {
				stacking: 'percent',
			},
		},
		series: data.series,
		...options,
	});
