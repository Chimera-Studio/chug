import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import colors from "../config/colors";
import Foam from "../assets/img/foam.svg";

function MainBG() {
	return <View style={styles.backgroundWrapper}></View>;
}

const styles = StyleSheet.create({
	backgroundWrapper: {
		position: "absolute",
		top: "-5%",
		left: "-6%",
		right: 0,
		bottom: 0,
		display: "flex",
		width: "112%",
		height: "120%",
		backgroundColor: colors.primary,
		flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
	},
	foam: {
		position: "absolute",
		top: "0",
		left: "0",
		width: "100%",
		aspectRatio: 1 / 10,
	},
});

export default MainBG;
