import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import styles from "../config/styles";

const Timer = ({ hoursMinSecs, timerCallback }) => {
	const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
	const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

	const tick = () => {
		if (hrs === 0 && mins === 0 && secs === 0) reset();
		else if (mins === 0 && secs === 0) {
			setTime([hrs - 1, 59, 59]);
		} else if (secs === 0) {
			setTime([hrs, mins - 1, 59]);
		} else {
			setTime([hrs, mins, secs - 1]);
		}
	};

	const reset = () => {
		timerCallback();
		// setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
	};

	useEffect(() => {
		const timerId = setInterval(() => tick(), 1000);
		return () => clearInterval(timerId);
	});

	return (
		<Text style={styles.countdownTimer}>{`${hrs
			.toString()
			.padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`}</Text>
	);
};

export default Timer;
