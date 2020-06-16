import React, { useState } from "react";
import { NativeSelect, FormControl, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import styles from "./CountryPicker.module.css";
import { countries } from "../../api";
import cx from "classnames";

//const CountryPicker = () => {
//	const [countryNames, setCountryNames] = useState();
//
//}

class CountryPicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countryNames: [],
		};
	}
	async componentDidMount() {
		const countryNames = await countries();
		this.setState({ countryNames: countryNames });
		console.log(countryNames);
	}

	render() {
		const captialize = (words) =>
			words
				.split(" ")
				.map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
				.join(" ");
		return (
			<div className={styles.container}>
				<FormControl className={styles.selectBox}>
					<Autocomplete
						className={styles.selectBox}
						value={this.state.countryNames}
						onChange={(e, newVal) => this.props.handleCountryChange(newVal)}
						options={this.state.countryNames}
						renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
					>
						)}
					</Autocomplete>
				</FormControl>
				<FormControl>
					<NativeSelect
						id={"state"}
						className={cx(this.props.statesClass, styles.selectBox)}
						defaultValue=""
						onChange={(e) => this.props.handleStateChange(e.target.value)}
					>
						<option value="">States</option>
						{this.props.listOfStates.map((state, i) => (
							<option key={i} value={state}>
								{state}
							</option>
						))}
					</NativeSelect>
				</FormControl>
				<FormControl>
					<NativeSelect
						id={"county"}
						className={cx(this.props.countyClass, styles.selectBox)}
						defaultValue=""
						onChange={(e) => this.props.handleCountyChange(this.props.currentState, e.target.value)}
					>
						<option value="">Counties</option>
						{this.props.listOfCounties.map((county, i) => (
							<option key={i} value={captialize(county)}>
								{captialize(county)}
							</option>
						))}
					</NativeSelect>
				</FormControl>
			</div>
		);
	}
}
//const CountryPicker = ({ handleCountryChange }) => {
//const [countryNames, setCountryNames] = useState([]);
//
//useEffect(() => {
//	const fetchCountries = async () => {
//		setCountryNames(await countries());
//	};
//
//	fetchCountries();
//}, [setCountryNames]);

//const getOptions = (optionsAPI) => {
//	const [optionsName, setOptionName] = useState([]);
//
//	useEffect(() => {
//		const fetchOptions = async () => {
//			setOptionName(await optionsAPI());
//		};
//
//		fetchOptions();
//	}, [setOptionName]);
//	return optionsName;
//};
//
//const countryNames = getOptions(countries);

//return (
//	<div className={styles.container}>
//		<FormControl className={styles.formControl}>
//			<NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
//				<option value="">Global</option>
//				{countryNames.map((country, i) => (
//					<option key={i} value={country}>
//						{country}
//					</option>
//				))}
//			</NativeSelect>
//
//			<NativeSelect className={styles.states} defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
//				<option value="">---</option>
//				{states.map((country, i) => (
//					<option key={i} value={country}>
//						{country}
//					</option>
//				))}
//			</NativeSelect>
//		</FormControl>
//	</div>
//);
//};

export default CountryPicker;
