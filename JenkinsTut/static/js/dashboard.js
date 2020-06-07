const jQuery = window.jQuery.noConflict(true);
const apiLink = JSON.parse(document.getElementById('api').textContent);
import { createStackedBarChart } from './stackedBarChart.js';
import { createPieChart } from './pieChart.js';
import { loadDataTable } from './buildInfoTable.js';

const getData = async ($) => {
	const result = await $.ajax({
		type: 'GET',
		url: apiLink,
	});
	const data = result.builds.reduce(
		(acc, current) => [
			...acc,
			...current.subBuilds.map((sub) => ({
				...sub,
				date: new Date(current.timestamp).toLocaleDateString(),
			})),
		],
		[]
	);

	return data;
};

const formatBarData = (data, categoryKey, serieKey) => {
	const categories = [...new Set(data.map((el) => el[categoryKey]))];
	const seriesNames = [...new Set(data.map((el) => el[serieKey]))];
	const seriesData = Object.assign(
		{},
		...seriesNames.map((name) => ({
			[name]: new Array(categories.length).fill(0),
		}))
	);

	data.forEach((el) => {
		const index = categories.findIndex((cat) => cat === el.date);
		seriesData[el.result][index]++;
	});

	const result = Object.entries(seriesData).map(([key, val]) => ({
		name: key,
		data: val,
	}));

	return {
		series: result,
		categories,
	};
};

const formatPieData = (data, sliceKey, dataKey) => {
	const resultsTypes = [...new Set(data.map((el) => el[dataKey]))];
	const slices = [...new Set(data.map((el) => el[sliceKey]))];
	const pieData = slices.reduce(
		(acc, el) => ({
			...acc,
			[el]: Object.assign(
				{},
				...resultsTypes.map((result) => ({ [result]: 0 }))
			),
		}),
		{}
	);

	data.forEach((el) => {
		pieData[el.date][el.result]++;
	});

	return pieData;
};

const init = async ($) => {
	const data = await getData($);
	const barData = formatBarData(data, 'date', 'result');
	const pieData = formatPieData(data, 'date', 'result');

	createStackedBarChart(barData, 'demo', 'barChart', 'fail/success');
	createPieChart('pie', [], 'pieChart');
	loadDataTable($, data, 0);
};

jQuery(function ($) {
	init($);
});
