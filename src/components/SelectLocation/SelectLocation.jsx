import React, { useState, useEffect, forwardRef } from "react";
import SingleAutocom from "./SingleAutocom/SingleAutocom";
import { countries, states, counties } from "../../api";
import styles from "./SelectLocation.module.css";
import { capitalize } from "@material-ui/core";
//import cx from "classnames";

const SelectLocation = ({ location, handleChange }) => {
	const [hvaeStates, setHaveStates] = useState(false); //Will Change when country is USA
	const [haveCounty, setHaveCounty] = useState(false); //Will Change when state name is not state
	const [countriesList, setCountriesList] = useState([]);
	const [statesList, setStatesList] = useState([]);
	const [countiesList, setCountiesList] = useState([]);

	//Get all countries
	useEffect(() => {
		const fetchCountries = async () => {
			setCountriesList(await countries());
		};
		fetchCountries();
	}, []);

	//Get states when current country is usa
	useEffect(() => {
		{
			const fetchStates = async () => {
				setStatesList(await states());
			};
			fetchStates();
		}
		return () => {
			setStatesList([]);
		};
	}, [hvaeStates]);

	//Get counties when current country is usa
	useEffect(() => {
		{
			if (location.state !== null) {
				const fetchCounties = async () => {
					setCountiesList(await counties(location.state));
				};
				fetchCounties();
			}
		}
		return () => {
			setCountiesList([]);
		};
	}, [haveCounty]);

	useEffect(() => {
		console.log("statesList");
		console.log(statesList);
	}, [location.country]);

	//handle select country
	const selectCountry = async (e, value) => {
		if (value === "USA") {
			setHaveStates(true);
		} else if (value === null || value !== "USA") {
			setHaveStates(false);
			setHaveCounty(false);
			setStatesList([]);
		}
		const loc = { country: value, state: null, county: null };
		handleChange(e, loc);
	};

	//handle state select
	const selectState = async (e, value) => {
		if (value !== null) {
			const fetchCounties = async () => {
				setCountiesList(await counties(value));
			};
			fetchCounties();
			setHaveCounty(true);
		} else {
			setHaveCounty(false);
		}
		const loc = { country: location.country, state: value, county: null };
		handleChange(e, loc);
	};

	const selectCounty = async (e, value) => {
		setHaveCounty(true);
		const loc = { country: location.country, state: location.state, county: value };
		handleChange(e, loc);
	};

	const country = (
		<SingleAutocom
			options={countriesList}
			value={location.country}
			handleChange={selectCountry}
			label={"Country"}
		/>
	);
	const state = <SingleAutocom label={"State"} handleChange={selectState} options={statesList} />;

	const county = (
		<SingleAutocom label={"County"} handleChange={selectCounty} options={countiesList} />
	);

	if (!hvaeStates && !haveCounty) {
		return <div className={styles.container}>{country}</div>;
	} else if (hvaeStates && !haveCounty) {
		return (
			<div className={styles.container}>
				{country}
				{state}
			</div>
		);
	} else if (hvaeStates && haveCounty) {
		return (
			<div className={styles.container}>
				{country}
				{state}
				{county}
			</div>
		);
	}
};

export default SelectLocation;
