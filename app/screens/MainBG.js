import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import colors from "../config/colors";
import Foam from "../assets/img/foam.svg";

function MainBG() {
	return (
		<View style={styles.backgroundWrapper}>
			<Foam style={styles.foam} />
		</View>
	);
}

const styles = StyleSheet.create({
	backgroundWrapper: {
		position: "absolute",
		top: "-5%",
		left: "-6%",
		right: 0,
		bottom: 0,
		width: "112%",
		height: "120%",
		backgroundColor: colors.primary,
		flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
	},
	foam: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "200%",
		height: "15%",
	},
});

export default MainBG;
