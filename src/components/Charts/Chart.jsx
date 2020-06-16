import React from "react";
import styles from "./Chart.module.css";
import { Grid, Paper } from "@material-ui/core";
import { Line, Bar } from "react-chartjs-2";

const Chart = ({ historicalData }) => {
	if (!historicalData[0]) return <h2>Loading......</h2>;
	const labels = historicalData.map(({ date }) => date);
	const cases = historicalData.map(({ cases }) => cases);
	const recovered = historicalData.map(({ recovered }) => recovered);
	const deaths = historicalData.map(({ deaths }) => deaths);
	const active = historicalData.map(({ active }) => active);
	const casesDayBefore = historicalData.map((day, i, arr) =>
		i === 0 ? day.cases - day.cases : arr[i - 1].cases
	);
	const casesForDay = historicalData.map(({ cases }, i, arr) =>
		i === 0 ? 0 : cases - arr[i - 1].cases
	);
	const lineChart = historicalData[0] ? (
		<Line
			data={{
				labels,
				datasets: [
					{
						//Cases
						data: cases,
						label: "Cases",
						borderColor: "rgba(255, 0, 29, 0.8)",
						backgroundColor: "rgba(255, 0, 29, 0.2)",
						pointBackgroundColor: "rgba(255, 0, 29, 1)",
						pointHoverBorderColor: "black",
						fill: true,
					},
					{
						//Recovered
						data: recovered,
						label: "Recovered",
						borderColor: "rgba(0, 244, 85, 0.8)",
						backgroundColor: "rgba(0, 244, 85, 0.2)",
						pointBackgroundColor: "rgba(0, 244, 85, 1)",
						pointHoverBorderColor: "black",
						fill: true,
					},
					{
						//Deaths
						data: deaths,
						label: "Deaths",
						borderColor: "rgba(137, 0, 16, 0.8)",
						backgroundColor: "rgba(137, 0, 16, 0.2)",
						pointBackgroundColor: "rgba(137, 0, 16, 1)",
						pointHoverBorderColor: "black",
						fill: true,
					},
					{
						//Active
						data: active,
						label: "Active",
						borderColor: "rgba(222, 220, 57, 0.8)",
						backgroundColor: "rgba(222, 220, 57, 0.2)",
						pointBackgroundColor: "rgba(222, 220, 57, 1)",
						pointHoverBorderColor: "black",
						fill: true,
					},
				],
			}}
			options={{
				responsive: true,
				tooltips: {
					mode: "label",
					callbacks: {
						label: function (tooltipItem, data) {
							var value = data.datasets[0].data[tooltipItem.index];
							value = value.toString();
							value = value.split(/(?=(?:...)*$)/);
							value = value.join(",");
							return value;
						},
					},
				},
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
								userCallback: function (value, index, values) {
									// Convert the number to a string and splite the string every 3 charaters from the end
									value = value.toString();
									value = value.split(/(?=(?:...)*$)/);
									value = value.join(",");
									return value;
								},
							},
						},
					],
					xAxes: [
						{
							ticks: {},
						},
					],
				},
			}}
		/>
	) : null;

	const barChart = (
		<Bar
			data={{
				labels,
				datasets: [
					{
						//New cases
						data: casesForDay,
						label: "New cases",
						borderColor: "rgba(255, 0, 29)",
						backgroundColor: "rgba(255, 0, 29, 0.8)",
						pointBackgroundColor: "rgba(255, 0, 29)",
						pointHoverBorderColor: "black",
						fill: true,
					},
				],
			}}
			options={{
				responsive: true,
				tooltips: {
					mode: "label",
					callbacks: {
						label: function (tooltipItem, data) {
							var value = data.datasets[0].data[tooltipItem.index];
							value = value.toString();
							value = value.split(/(?=(?:...)*$)/);
							value = value.join(",");
							return value;
						},
					},
				},
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
								userCallback: function (value, index, values) {
									// Convert the number to a string and splite the string every 3 charaters from the end
									value = value.toString();
									value = value.split(/(?=(?:...)*$)/);
									value = value.join(",");
									return value;
								},
							},
						},
					],
					xAxes: [
						{
							ticks: {},
						},
					],
				},
			}}
		/>
	);
	return (
		<div className={styles.container}>
			<Grid
				container
				spacing={0}
				justify="space-around"
				alignItems="center"
				className={styles.container}
			>
				<Grid component={Paper} className={styles.paper} item xs={12} md={5}>
					{<h4>Totals</h4>}
					{lineChart}
				</Grid>
				<Grid component={Paper} className={styles.paper} item xs={12} md={5}>
					{<h4>Daily cases</h4>}
					{barChart}
				</Grid>
			</Grid>
		</div>
	);
};

export default Chart;
