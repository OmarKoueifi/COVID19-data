import axios from "axios";
import { capitalize } from "@material-ui/core";

//Countries
const countriesURL = "https://corona.lmao.ninja/v2/countries";

export const countries = async () => {
	try {
		const { data } = await axios.get(countriesURL);
		let newData = data.map((country) => country.country);
		return newData;
	} catch (err) {
		console.error(err);
	}
};

//States
const statesURL = "https://corona.lmao.ninja/v2/states";

export const states = async () => {
	try {
		const { data } = await axios.get(statesURL);
		const newData = data.map((state) => state.state);
		return newData;
	} catch (err) {
		console.error(err);
	}
};

//Counties
const countyURL = "https://corona.lmao.ninja/v2/historical/usacounties";
const countiesURL = (state) => `${countyURL}/${state.toLowerCase()}${lastDays}`;

const captialize = (words) =>
	words
		.split(" ")
		.map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
		.join(" ");

export const counties = async (state) => {
	try {
		const { data } = await axios.get(countiesURL(state));
		const listOfCounties = data.map((county) => capitalize(county.county));
		return listOfCounties;
	} catch (err) {
		console.error(err);
	}
};

const totalsURL = "https://corona.lmao.ninja/v2/all";
const historicalURL = "https://corona.lmao.ninja/v2/historical";
const usStatesURL = `${historicalURL}/usacounties`;
const lastDays = "?lastdays=30";

export const totals = async (country) => {
	let fullURL = totalsURL;
	console.log(country);
	if (country !== undefined) {
		fullURL = `${countriesURL}/${country}`;
	}
	try {
		const { data } = await axios.get(fullURL);

		const newData = {
			cases: data.cases,
			recovered: data.recovered,
			critical: data.critical,
			deaths: data.deaths,
			tests: data.tests,
			updated: data.updated,
			active: data.cases - data.deaths - data.recovered,
		};

		return newData;
	} catch (err) {
		console.error(err);
	}
};

export const statesTotals = async (state) => {
	try {
		const { data } = await axios.get(statesURL);
		const stateData = data.find((st) => st.state === state);
		const newData = {
			cases: stateData.cases,
			deaths: stateData.deaths,
			active: stateData.active,
			tests: stateData.tests,
			recovered: "--",
			updated: stateData.updated,
			critical: "--",
			state: state,
		};

		return newData;
	} catch (err) {
		console.error(err);
	}
};

export const historical = async (country) => {
	let fullURL = `${historicalURL}/all${lastDays}`;
	if (country) {
		fullURL = `${historicalURL}/${country}${lastDays}`;
	}
	try {
		let { data } = await axios.get(fullURL);
		if (data.timeline) {
			data = data.timeline;
		}
		const date = Object.keys(data.cases);
		const newData = date.map((day) => ({
			date: day,
			cases: data.cases[day],
			recovered: data.recovered[day],
			deaths: data.deaths[day],
			active: data.cases[day] - data.deaths[day] - data.recovered[day],
		}));
		return newData;
	} catch (err) {
		console.error(err);
	}
};

export const historicalState = async (state) => {
	const { data } = await axios.get(countiesURL(state));
	const dateList = Object.keys(data[0].timeline.cases);
	let newData = [];
	//Edit
	dateList.forEach((date) => {
		const totoalCasesForOneDay = data.reduce((acc, curr) => {
			return curr.timeline.cases[date] + acc;
		}, 0);
		const totoalDeathsForOneDay = data.reduce((acc, curr) => {
			return curr.timeline.deaths[date] + acc;
		}, 0);
		newData.push({ date: date, cases: totoalCasesForOneDay, deaths: totoalDeathsForOneDay });
	});
	return newData;
};

export const countyTotals = async (state, county) => {
	try {
		const allCounties = "https://corona.lmao.ninja/v2/jhucsse/counties";
		const { data } = await axios.get(allCounties);
		console.log("data couty totals");
		console.log(data);
		const countyToFetch = data.find(
			(singleCounty) => singleCounty.province == state && singleCounty.county == county
		);
		console.log("countyToFetch");
		console.log(countyToFetch);
		const newData = {
			cases: countyToFetch.stats.confirmed,
			recovered: "--",
			critical: "--",
			deaths: countyToFetch.stats.deaths,
			tests: "--",
			updated: countyToFetch.updatedAt,
			active: "--",
		};
		return newData;
	} catch (err) {
		console.error(err);
	}
};

export const countyHistorical = async (state, county) => {
	try {
		const { data } = await axios.get(countiesURL(state));
		console.log("data");
		console.log(data);
		const countyObj = data.find((singleCounty) => singleCounty.county === county.toLowerCase());
		console.log("countyObj");
		console.log(countyObj);
		const date = Object.keys(countyObj.timeline.cases);
		console.log("date");
		console.log(date);
		const newData = date.map((day) => ({
			date: day,
			cases: countyObj.timeline.cases[day],
			recovered: "--",
			deaths: countyObj.timeline.deaths[day],
			active: "--",
		}));
		console.log(newData);
		return newData;
	} catch (err) {
		console.error(err);
	}
};
