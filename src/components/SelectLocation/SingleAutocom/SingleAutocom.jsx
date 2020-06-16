import React from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import styles from "./SingleAutocom.module.css";
//import cx from "classnames";

const SingleAutocom = ({ options, handleChange, value, label }) => {
	return (
		<Autocomplete
			className={styles.autoCompleat}
			onChange={(e, val) => handleChange(e, val)}
			options={options}
			value={value}
			renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
		/>
	);
};

export default SingleAutocom;
