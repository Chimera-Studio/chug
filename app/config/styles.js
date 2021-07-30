import { StyleSheet, Platform } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Platform.OS === "ios" && !Platform.isPad ? 0 : "5%",
		marginBottom: "0%",
		marginLeft: "5%",
		marginRight: "5%",
		backgroundColor: colors.primary,
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
		shadowRadius: 10,
		shadowOpacity: 1,
		shadowColor: colors.primary,
	},
	screenWrapper: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: "20%",
		marginBottom: "30%",
	},
	consentWrapper: {
		width: "100%",
		flex: 1,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: "20%",
	},
	consentTitle: {
		fontFamily: "SecondaryFont",
		fontSize: 24,
		textAlign: "center",
		color: colors.primary,
	},
	consentTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 16,
		textAlign: "left",
		color: colors.grayDark,
		marginTop: 40,
		marginBottom: 60,
	},
	consentBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "60%",
		height: 60,
		backgroundColor: colors.primary,
		borderColor: colors.primary,
		borderWidth: 5,
		borderRadius: 30,
	},
	consentBtnTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 24,
		lineHeight: 24,
		textAlign: "center",
		color: colors.white,
	},
	landingWrapper: {
		width: "90%",
		flex: 1,
	},
	landingContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: "20%",
	},
	landingTitleCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	landingTitle: {
		fontFamily: "PrimaryFont",
		fontSize: 80,
		textAlign: "center",
		color: colors.white,
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		textShadowRadius: 20,
		shadowColor: colors.primary,
		textShadowColor: colors.primary,
		paddingVertical: 20,
		paddingHorizontal: 20,
		marginTop: -20,
		zIndex: 2,
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
		justifyContent: "flex-start",
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
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		textShadowRadius: 20,
		shadowColor: colors.primary,
		textShadowColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: -10,
		marginHorizontal: -10,
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
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		textShadowRadius: 20,
		shadowColor: colors.primary,
		textShadowColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginTop: -10,
	},
	topicScrollWrapper: {
		width: "100%",
		height: "65%",
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
		flexGrow: 1,
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
	noPresetTitle: {
		fontFamily: "SecondaryFont",
		fontSize: 20,
		textAlign: "center",
		color: colors.white,
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		textShadowRadius: 20,
		shadowColor: colors.primary,
		textShadowColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	presetScroll: {
		width: "100%",
		flex: 1,
		marginBottom: "45%",
	},
	presetScrollCont: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		flexGrow: 1,
	},
	presetItemCont: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	presetItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "85%",
		borderWidth: 5,
		borderRadius: 30,
		borderColor: colors.white,
		paddingVertical: 5,
		marginVertical: 8,
		marginRight: "5%",
	},
	presetItemSelected: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.white,
		width: "85%",
		borderWidth: 5,
		borderRadius: 30,
		borderColor: colors.white,
		paddingVertical: 5,
		marginVertical: 8,
		marginRight: "5%",
	},
	presetItemTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textAlign: "center",
		color: colors.white,
	},
	presetItemTxtSelected: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textAlign: "center",
		color: colors.primary,
	},
	presetDeleteBtn: {
		width: "10%",
		aspectRatio: 1 / 1,
	},
	presetDeleteIcon: {
		width: "100%",
		aspectRatio: 1 / 1,
	},
	inputCont: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	inputExp: {
		fontFamily: "SecondaryFont",
		fontSize: 16,
		textAlign: "center",
		color: colors.white,
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 10,
		textShadowRadius: 20,
		shadowColor: colors.primary,
		textShadowColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: -10,
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
		lineHeight: 36,
		textAlign: "center",
		color: colors.white,
	},
	savePresetBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: "80%",
		borderWidth: 5,
		borderRadius: 30,
		borderColor: colors.white,
		paddingVertical: 5,
	},
	savePresetBtnTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 16,
		textAlign: "center",
		color: colors.white,
	},
	customListWrapper: {
		width: "80%",
		height: "45%",
		marginTop: "5%",
		marginBottom: "45%",
	},
	customList: {
		flexGrow: 1,
		width: "100%",
	},
	customListCont: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		flexGrow: 1,
	},
	customPromptCont: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "90%",
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
		shadowOpacity: 1,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 5,
		textShadowRadius: 8,
		shadowColor: colors.primary,
		textShadowColor: colors.primary,
		paddingVertical: 5,
		paddingHorizontal: 5,
		marginVertical: -5,
	},
	customPrompIconCont: {
		width: "10%",
		height: 20,
	},
	customPromptIcon: {
		width: 10,
		aspectRatio: 1 / 1,
		shadowOpacity: 1,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 0 },
		shadowColor: colors.primary,
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
		zIndex: 99,
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
	presetModulWrapper: {
		position: "absolute",
		top: "15%",
		width: "100%",
		backgroundColor: colors.white,
		paddingVertical: 20,
		borderRadius: 30,
		zIndex: 1,
		elevation: 1,
	},
	exitPresetSave: {
		position: "absolute",
		top: 20,
		right: 20,
		width: 20,
		aspectRatio: 1 / 1,
	},
	presetModulExp: {
		fontFamily: "SecondaryFont",
		color: colors.primary,
		textAlign: "center",
		fontSize: 16,
	},
	presetInputFieldCont: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginVertical: 20,
	},
	presetInputField: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		textAlign: "left",
		color: colors.white,
		paddingLeft: 10,
		width: "60%",
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
		borderColor: colors.disabled,
	},
	presetInputFieldBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "20%",
		height: 40,
		backgroundColor: colors.primary,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
		borderTopWidth: 5,
		borderRightWidth: 5,
		borderBottomWidth: 5,
		borderLeftWidth: 5,
		borderColor: colors.disabled,
	},
	presetInputFieldBtnTxt: {
		fontFamily: "SecondaryFont",
		fontSize: 14,
		//lineHeight: 14,
		textAlign: "center",
		color: colors.white,
	},
	presetModulContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: "10%",
	},
	presetModulDisc: {
		flex: 1,
		fontFamily: "SecondaryFont",
		color: colors.grayDark,
		textAlign: "left",
		fontSize: 12,
		marginBottom: 10,
	},
	presetModulBtn: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "40%",
		borderRadius: 20,
		backgroundColor: colors.primary,
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
	presetModulText: {
		fontFamily: "SecondaryFont",
		color: colors.white,
		textAlign: "center",
		textTransform: "uppercase",
		fontSize: 14,
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
	countdownCon: {
		marginTop: 5,
		width: "70%",
		paddingVertical: 10,
		borderRadius: 30,
		backgroundColor: colors.primary,
	},
	countdownTimer: {
		fontFamily: "PrimaryFont",
		textAlign: "center",
		fontSize: 22,
		color: colors.white,
		marginBottom: 5,
	},
	countdownTxt: {
		fontFamily: "SecondaryFont",
		textAlign: "center",
		fontSize: 12,
		color: colors.grayDark,
	},
	rewardedCon: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	rewardedExp: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		marginHorizontal: "5%",
		marginVertical: "15%",
	},
	rewardedExpText: {
		fontFamily: "SecondaryFont",
		textAlign: "center",
		fontSize: 22,
		color: colors.primary,
	},
	rewardedExp2Text: {
		fontFamily: "SecondaryFont",
		textAlign: "center",
		fontSize: 14,
		color: colors.grayDark,
		marginTop: "20%",
	},
	rewardedExp3Text: {
		fontFamily: "SecondaryFont",
		textAlign: "center",
		fontSize: 14,
		color: colors.grayDark,
		marginTop: "5%",
	},
	rewardedStart: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: 240,
		height: 60,
		borderRadius: 30,
		marginBottom: 20,
	},
	rewardedDisabled: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.disabled,
		width: 240,
		height: 60,
		borderRadius: 30,
		marginBottom: 20,
	},
	rewardedStartText: {
		color: colors.white,
		textAlign: "center",
		textTransform: "uppercase",
		fontFamily: "PrimaryFont",
		fontSize: 28,
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
		fontSize: 18,
		marginTop: 40,
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
		marginVertical: "30%",
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
		fontFamily: "SecondaryFont",
		color: colors.white,
		textAlign: "center",
		fontSize: 18,
		marginVertical: 10,
	},
});

export default styles;
