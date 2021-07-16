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
	home: {
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
	gamePageWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		flex: 1,
		marginTop: "18%",
	},
	gamePageConfig: {
		position: "absolute",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
		height: "100%",
		flex: 1,
	},
	gamePage: {
		position: "absolute",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		flex: 1,
	},
	gamePromptCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "60%",
		flex: 1,
		marginBottom: "40%",
	},
	gamePromptTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 24,
		textAlign: "center",
		color: colors.white,
		textShadowColor: colors.primary,
		textShadowRadius: 10,
	},
	againBtn: {
		backgroundColor: colors.primary,
		width: "60%",
		height: 60,
		borderWidth: 5,
		borderRadius: 30,
		borderColor: colors.white,
		marginBottom: 20,
		overflow: "hidden",
	},
	againBtnCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	againBtnTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 28,
		lineHeight: 48,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.primary,
		zIndex: 1,
	},
	againAnimatedBG: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: 60,
		backgroundColor: colors.white,
		zIndex: 0,
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
		height: 36,
		borderWidth: 5,
		borderRadius: 33,
		borderColor: colors.white,
		marginVertical: 8,
	},
	topicItemSelected: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		width: "50%",
		height: 36,
		borderWidth: 5,
		borderRadius: 33,
		borderColor: colors.white,
		marginVertical: 8,
	},
	topicItemDisabled: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.transparent,
		width: "50%",
		height: 36,
		borderWidth: 5,
		borderRadius: 33,
		borderColor: colors.disabled,
		marginVertical: 8,
	},
	topicItemTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.white,
	},
	topicItemTxtSelected: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.primary,
	},
	topicItemTxtDisabled: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.disabled,
	},
	inputCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: "20%",
	},
	inputExp: {
		fontFamily: "SecondaryFont",
		fontSize: 16,
		textAlign: "center",
		color: colors.white,
	},
	inputTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textAlign: "center",
		color: colors.white,
	},
	inputFieldCont: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginVertical: 20,
	},
	inputField: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textAlign: "center",
		color: colors.white,
		paddingLeft: "15%",
		width: "65%",
		height: 40,
		backgroundColor: colors.primary,
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		borderTopWidth: 5,
		borderLeftWidth: 5,
		borderBottomWidth: 5,
		borderRightWidth: 0,
		borderColor: colors.white,
	},
	inputFieldBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "15%",
		height: 40,
		backgroundColor: colors.primary,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
		borderTopWidth: 5,
		borderRightWidth: 5,
		borderBottomWidth: 5,
		borderLeftWidth: 0,
		borderColor: colors.white,
	},
	inputFieldBtnTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 40,
		lineHeight: 42,
		textAlign: "center",
		color: colors.white,
	},
	customListWrapper: {
		width: "80%",
		height: "45%",
		marginBottom: "45%",
	},
	customList: {
		flexGrow: 1,
		width: "100%",
	},
	customListCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	customPromptCont: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "90%",
		height: 20,
		marginVertical: 10,
	},
	customPromptTxtCont: {
		width: "100%",
		borderBottomWidth: 2,
		borderColor: colors.whiteTransparent,
	},
	customPromptTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		lineHeight: 16,
		textAlign: "left",
		color: colors.white,
		textShadowColor: colors.primary,
		textShadowRadius: 10,
	},
	customPrompIconCont: {
		width: "10%",
	},
	customPromptIcon: {
		width: 10,
		aspectRatio: 1 / 1,
	},
	bottomBtnCont: {
		position: "absolute",
		bottom: 0,
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
	bottomSecondary: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "60%",
		height: 46,
		borderWidth: 5,
		borderRadius: 23,
		borderColor: colors.white,
	},
	bottomSecondaryTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 20,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.white,
	},
	alertWrapper: {
		position: "absolute",
		top: "12%",
		width: "100%",
		backgroundColor: colors.white,
		borderRadius: 30,
		zIndex: 1,
		elevation: 1,
	},
	alertText: {
		fontFamily: "SecondaryFont",
		color: colors.primary,
		textAlign: "center",
		fontSize: 14,
		marginVertical: 10,
	},
	modulWrapper: {
		position: "absolute",
		top: "15%",
		width: "100%",
		backgroundColor: colors.white,
		borderRadius: 30,
		zIndex: 1,
		elevation: 1,
	},
	modulExp: {
		fontFamily: "SecondaryFont",
		color: colors.primary,
		textAlign: "center",
		fontSize: 16,
		marginVertical: 20,
		marginHorizontal: 10,
	},
	modulContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	modulBtn: {
		width: "40%",
		borderRadius: 38,
		backgroundColor: colors.primary,
		paddingVertical: 10,
		marginBottom: 20,
		marginHorizontal: "5%",
	},
	modulText: {
		fontFamily: "SecondaryFont",
		color: colors.white,
		textAlign: "center",
		textTransform: "uppercase",
		fontSize: 18,
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
	bottomRewardDisabled: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "60%",
		height: 46,
		borderWidth: 5,
		borderRadius: 23,
		borderColor: colors.disabled,
	},
	bottomRewardTxt: {
		fontFamily: "PrimaryFont",
		fontSize: 20,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.primary,
	},
	bottomRewardTxtDisabled: {
		fontFamily: "PrimaryFont",
		fontSize: 20,
		textTransform: "uppercase",
		textAlign: "center",
		color: colors.disabled,
	},
	rewardedWrapper: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		backgroundColor: colors.primaryLight,
	},
	exit: {
		position: "absolute",
		top: "3%",
		right: 0,
		width: 30,
		aspectRatio: 1 / 1,
	},
	rewardedExp: {
		marginTop: "30%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	rewardedExpText: {
		color: colors.primary,
		textAlign: "center",
		fontFamily: "SecondaryFont",
		fontSize: 22,
		marginVertical: 2,
	},
	rewardedStart: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: 240,
		height: 50,
		borderRadius: 25,
		marginTop: 80,
		marginBottom: 20,
	},
	rewardedDisabled: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.disabled,
		width: 240,
		height: 50,
		borderRadius: 25,
		marginTop: 80,
		marginBottom: 20,
	},
	rewardedStartText: {
		color: colors.white,
		textAlign: "center",
		textTransform: "uppercase",
		fontFamily: "PrimaryFont",
		fontSize: 30,
	},
	rewardedDisc: {
		color: colors.grayDark,
		textAlign: "center",
		fontFamily: "SecondaryFont",
		fontSize: 12,
	},
	selectReward: {
		flexShrink: 1,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	rewardTitle: {
		fontFamily: "SecondaryFont",
		color: colors.primary,
		textAlign: "right",
		fontSize: 14,
		marginTop: 80,
	},
	selectRewardInput: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 240,
		height: 30,
		backgroundColor: colors.primary,
		borderRadius: 15,
		marginTop: 20,
	},
	selectRewardInputText: {
		fontFamily: "SecondaryFont",
		color: colors.grayDark,
		textAlign: "right",
		fontSize: 18,
	},
	selectRewardListArrow: {
		position: "absolute",
		right: 20,
		width: 10,
		aspectRatio: 1 / 1,
	},
	selectListShadow: {
		position: "absolute",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		width: "100%",
		height: "80%",
		marginVertical: "20%",
		zIndex: 99,
		elevation: 99,
	},
	selectListWrapper: {
		width: "100%",
		maxHeight: "100%",
		borderRadius: 30,
		overflow: Platform.OS == "ios" ? "scroll" : "hidden",
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 100,
		shadowOpacity: 1,
		elevation: 100,
	},
	selectList: {
		backgroundColor: colors.primary,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: colors.grayDark,
		width: "100%",
		flexGrow: 1,
	},
	selectItem: {
		width: "100%",
		borderBottomColor: colors.whiteTransparent,
		borderBottomWidth: 1,
	},
	selectItemNoBorder: {
		borderBottomWidth: 0,
	},
	selectText: {
		fontFamily: "PrimaryFont",
		color: colors.white,
		textAlign: "center",
		fontSize: 18,
		marginVertical: 10,
	},
});

export default styles;
