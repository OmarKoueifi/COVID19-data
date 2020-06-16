import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
//import { spacing, flexbox, typography } from "@material-ui/system";
import styles from "./Cards.module.css";
import cx from "classnames";

const Cards = ({
	totalNumbers: { cases, recovered, critical, deaths, tests, updated, active },
}) => {
	//if (!cases) {
	//	return "Loading...";
	//}
	const formatNumber = (num) => {
		if (isNaN(num)) return "--";
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	};
	const updatedDate = new Date(updated).toLocaleString();

	return (
		<div className={styles.container}>
			<Grid container spacing={0} justify="space-around" alignItems="center">
				<Grid item component={Card} xs={4} md={3} className={cx(styles.card, styles.cases)}>
					<CardContent>
						<Typography variant="h5">Cases</Typography>
						<Typography variant="h5">{formatNumber(!cases ? "Loading..." : cases)}</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={4} md={3} className={cx(styles.card, styles.critical)}>
					<CardContent>
						<Typography variant="h5">Critical</Typography>
						<Typography variant="h5">{formatNumber(critical)}</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={4} md={3} className={cx(styles.card, styles.tests)}>
					<CardContent>
						<Typography variant="h5">Tests</Typography>
						<Typography variant="h5">{formatNumber(tests)}</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={4} md={3} className={cx(styles.card, styles.recovered)}>
					<CardContent>
						<Typography variant="h5">Recovered</Typography>
						<Typography variant="h5">{formatNumber(recovered)}</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={4} md={3} className={cx(styles.card, styles.deaths)}>
					<CardContent>
						<Typography variant="h5">Deaths</Typography>
						<Typography variant="h5">{formatNumber(deaths)}</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={4} md={3} className={cx(styles.card, styles.active)}>
					<CardContent>
						<Typography variant="h5">Active</Typography>
						<Typography variant="h5">{formatNumber(active)}</Typography>
					</CardContent>
				</Grid>
			</Grid>
			<Grid container justify="center" alignItems="center">
				<Typography variant="body2">{`Last update: ${updatedDate}`}</Typography>
			</Grid>
		</div>
	);
};

export default Cards;
