import { StyleSheet, Platform } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Platform.OS === "ios" && !Platform.isPad ? 0 : "5%",
		marginBottom: "0%",
		marginLeft: "5%",
		marginRight: "5%",
		backgroundColor: colors.white,
	},
	ads: {
		position: "absolute",
		bottom: Platform.OS === "ios" && !Platform.isPad ? "4.5%" : 0,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
		height: "10%",
	},
	exit: {
		position: "absolute",
		top: 20,
		left: "5%",
		width: 30,
		aspectRatio: 1 / 1,
	},
	screenWrapper: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: "20%",
		marginBottom: "30%",
	},
	landingContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: "20%",
	},
	landingTitle: {
		fontFamily: "PrimaryFont",
		fontSize: 80,
		textAlign: "center",
		color: colors.white,
		marginBottom: 40,
	},
	landingBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "60%",
		height: 70,
		borderWidth: 6,
		borderRadius: 35,
		borderColor: colors.white,
		marginBottom: 20,
	},
	landingTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 30,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.white,
	},
	gamePageTopics: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "90%",
		flex: 1,
		marginTop: "18%",
	},
	gameSub: {
		fontFamily: "SecondaryFont",
		fontSize: 24,
		textAlign: "center",
		color: colors.white,
	},
	topicScrollWrapper: {
		width: "100%",
		flex: 1,
		marginTop: 10,
		marginBottom: 30,
	},
	topicScroll: {
		flexGrow: 1,
		width: "100%",
	},
	topicScrollCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	topicItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "50%",
		height: 40,
		borderWidth: 5,
		borderRadius: 20,
		borderColor: colors.white,
		marginVertical: 10,
	},
	topicItemSelected: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		width: "50%",
		height: 40,
		borderWidth: 5,
		borderRadius: 20,
		borderColor: colors.white,
		marginVertical: 10,
	},
	topicItemDisabled: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.transparent,
		width: "50%",
		height: 40,
		borderWidth: 5,
		borderRadius: 20,
		borderColor: colors.disabled,
		marginVertical: 10,
	},
	topicItemTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 18,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.white,
	},
	topicItemTxtSelected: {
		fontFamily: "SecondaryFont",
		fontSize: 18,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.primary,
	},
	topicItemTxtDisabled: {
		fontFamily: "SecondaryFont",
		fontSize: 18,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.disabled,
	},
	bottomBtnCont: {
		width: "100%",
		flexShrink: 1,
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	bottomBtnPrimary: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "60%",
		height: 60,
		borderWidth: 5,
		borderRadius: 30,
		borderColor: colors.white,
		marginBottom: 20,
	},
	bottomBtnPrimaryTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 28,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.white,
	},
	bottomReward: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		width: "60%",
		height: 46,
		borderWidth: 5,
		borderRadius: 23,
		borderColor: colors.white,
	},
	bottomRewardTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 20,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.primary,
	},
	rewardedWrapper: {
		flex: 1,
		display: "flex",
		alignItems: "center",
	},
	rewardedExp: {
		marginTop: "30%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	rewardedExpText: {
		color: colors.black,
		textAlign: "center",
		fontFamily: "PrimaryFont",
		fontSize: 24,
		marginVertical: 2,
	},
	rewardedStart: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "75%",
		height: 70,
		borderRadius: 35,
		marginTop: 60,
		marginBottom: 30,
	},
	rewardedDisabled: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.disabled,
		width: "75%",
		height: 70,
		borderRadius: 35,
		marginTop: 60,
		marginBottom: 30,
	},
	rewardedStartText: {
		color: colors.white,
		textAlign: "center",
		fontFamily: "PrimaryFont",
		fontSize: 20,
	},
	rewardedDisc: {
		color: colors.black,
		textAlign: "center",
		fontFamily: "PrimaryFont",
		fontSize: 12,
	},
});

export default styles;
