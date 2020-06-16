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

/*
		this.handleStateChange = this.handleStateChange.bind(this);
		this.handleCountryChange = this.handleCountryChange.bind(this);
		this.state = {
			totalNumbers: {}, state.data.tottalNumbers
			country: "Global", state.location.country
			historicalData: {}, state.data.historicalData
			currentState: "", state.location.state
		};
		*/

//const totalNumbers = await totals(null);
//const historicalData = await historical();
//this.setState({ totalNumbers, historicalData });

/*
	//Get country and list of states is USA
	handleCountryChange = async (country) => {
		if (country === "USA") {
			const listOfStates = await states();
			const showHideStates = styles.statesShow;
			this.setState({ listOfStates, showHideStates, showHideCounties: styles.selectHiden });
		} else {
			//document.getElementById("state").selectedIndex = "0";
			this.setState({ showHideStates: styles.statesHiden, showHideCounties: styles.selectHiden });
		}
		const singleCountryData = await totals(country);
		const countryHistorical = await historical(country);

		this.setState({ totalNumbers: singleCountryData, historicalData: countryHistorical });
	};
	*/

/*
		const {
			totalNumbers,
			country,
			historicalData,
			listOfStates,
			showHideStates,
			listOfCounties,
			showHideCounties,
			currentState,
		} = this.state;
		*/

//Get State info and list of counties
//handleStateChange = async (state) => {
//	if (state === "") {
//		return this.handleCountryChange("USA");
//	} else {
//		document.getElementById("county").selectedIndex = "0";
//		const singleStateData = await statesTotals(state);
//		const singleStateHistorical = await historicalState(state);
//		const listOfCounties = await counties(state);
//		this.setState({
//			totalNumbers: singleStateData,
//			historicalData: singleStateHistorical,
//			showHideCounties: styles.selectShow,
//			listOfCounties,
//			currentState: state,
//		});
//	}
//};

//handleCountyChange = async (state, county) => {
//	if (county === "") {
//		return this.handleStateChange(state);
//	} else {
//		const singleCountyData = await countyTotals(state, county);
//		const countyHistoricalData = await countyHistorical(state, county);
//		this.setState({ totalNumbers: singleCountyData, historicalData: countyHistoricalData });
//	}
//};

{
	/*
				<CountryPicker
					handleCountryChange={this.handleCountryChange}
					handleStateChange={this.handleStateChange}
					handleCountyChange={this.handleCountyChange}
					listOfStates={listOfStates}
					statesClass={showHideStates}
					countyClass={showHideCounties}
					listOfCounties={listOfCounties}
					currentState={currentState}
				/>
				<Cards totalNumbers={totalNumbers} />
				<Chart country={country} historicalData={historicalData} />
				*/
}
