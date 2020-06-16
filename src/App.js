import React from "react";
import styles from "./App.module.css";

import { Cards, Chart, SelectLocation } from "./components";
import {
	totals,
	historical,
	statesTotals,
	historicalState,
	countyTotals,
	countyHistorical,
} from "./api";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				country: null,
				state: null,
				county: null,
			},
			data: {
				totalNumbers: {},
				historicalData: {},
			},
		};
		this.handleListChange = this.handleListChange.bind(this);
	}

	fetchCountryData = async (countryData) => {
		const totalNumbers = await totals(countryData);
		const historicalData = await historical(countryData);
		this.setState(
			{
				data: {
					totalNumbers,
					historicalData,
				},
			},
			() => console.log(this.state)
		);
	};

	fetchStateData = async (stateData) => {
		const totalNumbers = await statesTotals(stateData);
		const historicalData = await historicalState(stateData);
		this.setState(
			{
				data: {
					totalNumbers,
					historicalData,
				},
			},
			() => console.log(this.state)
		);
	};

	fetchCountyData = async (stateData, countyData) => {
		const singleCountyData = await countyTotals(stateData, countyData);
		const countyHistoricalData = await countyHistorical(stateData, countyData);
		this.setState(
			{
				data: {
					totalNumbers: singleCountyData,
					historicalData: countyHistoricalData,
				},
			},
			() => console.log(this.state)
		);
	};

	async componentDidMount() {
		this.fetchCountryData();
	}

	handleListChange = async (e, value) => {
		if (value === null) {
			this.setState({
				location: {
					country: null,
					state: null,
					county: null,
				},
			});
		}
		//Set state when country is empty and get global data
		else if (value.country === null) {
			this.setState(
				(state) => {
					state.location.country = null;
					state.location.state = null;
					state.location.county = null;
					this.fetchCountryData();
				},
				() => console.log(this.state)
			);
		}
		//set state when country is set and get data
		else if (value.country !== null && value.state === null) {
			this.setState(
				(state) => {
					state.location.country = value.country;
					state.location.state = value.state;
					state.location.county = null;
					this.fetchCountryData(value.country);
				},
				() => console.log(this.state)
			);
		}
		//country and state are set but not county
		else if (value.country !== null && value.state !== null && value.county === null) {
			this.setState(
				(state) => {
					state.location.state = value.state;
					state.location.county = null;
					this.fetchStateData(value.state);
				},
				() => console.log(this.state)
			);
		}
		//country, state and couty are set
		else if (value.country !== null && value.state !== null && value.county !== null) {
			this.setState(
				(state) => {
					state.location.county = value.county;
					this.fetchCountyData(value.state, value.county);
				},
				() => console.log(this.state)
			);
		}
	};

	render() {
		return (
			<div className={styles.container}>
				<SelectLocation location={this.state.location} handleChange={this.handleListChange} />
				<Cards totalNumbers={this.state.data.totalNumbers} />
				<Chart historicalData={this.state.data.historicalData} />
			</div>
		);
	}
}

export default App;
