import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import colors from "../config/colors";

function MainBG() {
	return <View style={styles.backgroundWrapper} />;
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
		backgroundColor: colors.primaryLight,
		flex: Platform.OS === "ios" && !Platform.isPad ? null : 1,
	},
});

export default MainBG;
