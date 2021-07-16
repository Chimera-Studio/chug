import { StatusBar } from "expo-status-bar";
import React, {
	Component,
	useRef,
	forwardRef,
	useImperativeHandle,
	useState,
	useEffect,
} from "react";
import {
	SafeAreaView,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	TextInput,
	Animated,
	Easing,
	ActivityIndicator,
	Platform,
	Dimensions,
	useWindowDimensions,
} from "react-native";
import { Svg, Circle, Path, Polygon, G } from "react-native-svg";
import {
	AdMobBanner,
	AdMobRewarded,
	requestPermissionsAsync,
	getPermissionsAsync,
} from "expo-ads-admob";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import styles from "../config/styles";

import Home from "../assets/img/home.svg";
import ListArrow from "../assets/img/arrow.svg";

import MainBG from "../screens/MainBG";
import RewardedBG from "../screens/RewardedBG";

import {
	eng_general,
	eng_music,
	eng_movies,
	eng_cars,
	eng_sports,
	eng_food,
} from "../assets/prompts/eng-prompts";
import {
	hrv_general,
	hrv_music,
	hrv_movies,
	hrv_cars,
	hrv_sports,
	hrv_food,
} from "../assets/prompts/hrv-prompts";

var general_eng = eng_general;
var music_eng = eng_music;
var movies_eng = eng_movies;
var cars_eng = eng_cars;
var sports_eng = eng_sports;
var food_eng = eng_food;

var general_hrv = hrv_general;
var music_hrv = hrv_music;
var movies_hrv = hrv_movies;
var cars_hrv = hrv_cars;
var sports_hrv = hrv_sports;
var food_hrv = hrv_food;

var game_list = new Array();
var custom_list = new Array();

var topicList = [
	{
		nameEng: "Custom",
		nameHrv: "Prilagodi",
		value: "custom",
		selected: false,
		unlocked: true,
	},
	{
		nameEng: "Genaral",
		nameHrv: "Klasika",
		value: "general",
		selected: true,
		unlocked: true,
	},
	{
		nameEng: "Food",
		nameHrv: "Hrana",
		value: "food",
		selected: false,
		unlocked: true,
	},
	{
		nameEng: "Sports",
		nameHrv: "Sport",
		value: "sports",
		selected: false,
		unlocked: true,
	},
	{
		nameEng: "Cars",
		nameHrv: "Auti",
		value: "cars",
		selected: false,
		unlocked: false,
	},
	{
		nameEng: "Movies",
		nameHrv: "Filmovi",
		value: "movies",
		selected: false,
		unlocked: false,
	},
	{
		nameEng: "Music",
		nameHrv: "Glazba",
		value: "music",
		selected: false,
		unlocked: false,
	},
];

var presetList = [
	{
		title: "This is a Preset 1 test",
		selected: false,
	},
	{
		title: "This is a Preset 2 long test name to see the result",
		selected: false,
	},
	{
		title: "Preset 3",
		selected: false,
	},
];

var rewardList = [];

var selectedStates = topicList.map(({ selected }) => selected);
var unlockedStates = topicList.map(({ unlocked }) => unlocked);
var selectedPresetStates = presetList.map(({ selected }) => selected);
var customListPrompts = custom_list.slice();
var rewardListName;
var rewardListVal;
var rewardIndex;
var rewardDisabled = false;
var gameCounter = 0;
var consentStatus = true;
var languagePref = "eng";
var personalisedAds = false;

function shuffle(e) {
	for (var t, l, n = e.length; 0 !== n; )
		(l = Math.floor(Math.random() * n)),
			(t = e[(n -= 1)]),
			(e[n] = e[l]),
			(e[l] = t);
	return e;
}

function checkTopicList() {
	for (var i = 0; i < topicList.length; i++) {
		if (topicList[i].unlocked == false) {
			rewardDisabled = false;
			break;
		} else {
			rewardDisabled = true;
		}
	}
}

async function askForPermission() {
	const { granted } = await getPermissionsAsync();
	if (granted) {
		personalisedAds = true;
	} else {
		const { status } = await requestPermissionsAsync();
		if (status === "granted") {
			personalisedAds = true;
		}
	}
}

var date;
function getDate() {
	var today = new Date();
	date =
		today.getFullYear() +
		"" +
		(today.getMonth() + 1) +
		"." +
		today.getDate();
}
getDate();

async function askForReview() {
	var numberDATE = Number(date);

	var timeStamp = await AsyncStorage.getItem("reviewTimeStampSAVE");
	var reviewTimeStamp = Number(timeStamp);

	if (
		(reviewTimeStamp <= numberDATE || reviewTimeStamp == 0) &&
		(await StoreReview.isAvailableAsync()) &&
		(await StoreReview.hasAction())
	) {
		StoreReview.requestReview();

		var newTimeStamp = numberDATE + 1;
		/* 0.1 = 1day, 1 = 1month */

		await AsyncStorage.setItem(
			"reviewTimeStampSAVE",
			JSON.stringify(newTimeStamp)
		);
	}
}

export const RewardedScreen = ({ rewardedCallback }) => {
	rewardList = [];
	var rewardEarned = false;
	var disableList = false;

	for (var i = 0; i < topicList.length; i++) {
		if (topicList[i].unlocked == false) {
			rewardList.push(topicList[i]);
		}
	}

	if (rewardList.length == undefined || rewardList.length == 0) {
		rewardListName = "N/A";
		disableList = true;
	} else {
		if (languagePref == "eng") {
			rewardListName = rewardList[0].nameEng;
		} else {
			rewardListName = rewardList[0].nameHrv;
		}
		rewardListVal = rewardList[0].value;
	}

	useEffect(() => {
		setSelectedRewardName(rewardListName);
		rewardIndex = topicList.findIndex((obj) => obj.value == rewardListVal);
	}, []);

	const [language, setLanguage] = useState(languagePref);
	const [loadRewarded, setLoadRewarded] = useState(false);
	const [openSelect, setOpenSelect] = useState(false);
	const [selectedRewardName, setSelectedRewardName] =
		useState(rewardListName);

	async function requestReward() {
		setLoadRewarded(true);

		await AdMobRewarded.setAdUnitID(
			Platform.OS === "ios"
				? "ca-app-pub-3940256099942544/1712485313"
				: "ca-app-pub-3940256099942544/5224354917"
		); // Test ID, Replace with your-admob-unit-id
		await AdMobRewarded.requestAdAsync();
		await AdMobRewarded.showAdAsync();
	}

	AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
		resetRewarded();
	});

	AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
		resetRewarded();
	});

	AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
		resetRewarded();
	});

	AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
		unlockTopic();
	});

	function resetRewarded() {
		if (loadRewarded == true && rewardEarned == false) {
			setTimeout(function () {
				setLoadRewarded(false);
			}, 10000);
		}
	}

	const openSelectList = () => {
		setOpenSelect(true);
	};

	const selectedTopic = (name, value) => {
		setSelectedRewardName(name);
		rewardIndex = topicList.findIndex((obj) => obj.value == value);

		setOpenSelect(false);
	};

	function unlockTopic() {
		topicList[rewardIndex].unlocked = true;
		unlockedStates = topicList.map(({ unlocked }) => unlocked);
		rewardEarned = true;

		checkTopicList();
		rewardedCallback(false);
	}

	return (
		<View style={styles.rewardedWrapper}>
			<TouchableOpacity
				activeOpacity={0.6}
				style={styles.exit}
				disabled={loadRewarded || openSelect ? true : false}
				onPress={() => rewardedCallback(false)}
			>
				<Svg height="100%" width="100%" viewBox="0 0 352 352">
					<Path
						fill={
							!loadRewarded ? colors.grayDark : colors.grayLight
						}
						d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
					/>
				</Svg>
			</TouchableOpacity>

			<View style={styles.selectReward}>
				{language == "eng" ? (
					<Text style={styles.rewardTitle}>Choose a topic:</Text>
				) : (
					<Text style={styles.rewardTitle}>Odaberi kategoriju:</Text>
				)}

				<TouchableOpacity
					activeOpacity={0.6}
					style={styles.selectRewardInput}
					disabled={disableList}
					onPress={openSelectList}
				>
					<Text style={styles.selectRewardInputText}>
						{selectedRewardName}
					</Text>
					<ListArrow style={styles.selectRewardListArrow} />
				</TouchableOpacity>
			</View>

			<View style={styles.rewardedExp}>
				{language == "eng" ? (
					<Text style={styles.rewardedExpText}>
						To unlock it,{"\n"}
						watch this Advert:
					</Text>
				) : (
					<Text style={styles.rewardedExpText}>
						Da otključaš,{"\n"}
						pogledaj jednu Reklamu:
					</Text>
				)}
				{language == "eng" ? (
					<Text style={styles.rewardedExp2Text}>
						The unlocked topics will be available for{" "}
						<Text style={{ color: colors.primary }}>24h</Text>
						{"\n"}
						from{" "}
						<Text style={{ color: colors.primary }}>
							the last one
						</Text>{" "}
						that you unlocked.
					</Text>
				) : (
					<Text style={styles.rewardedExp2Text}>
						Otključane kategorije biti će dostupne{" "}
						<Text style={{ color: colors.primary }}>24h</Text>
						{"\n"}
						od <Text style={{ color: colors.primary }}>
							zadnje
						</Text>{" "}
						otključane.
					</Text>
				)}
			</View>
			<TouchableOpacity
				style={
					!loadRewarded
						? styles.rewardedStart
						: styles.rewardedDisabled
				}
				activeOpacity={1}
				disabled={loadRewarded || openSelect ? true : false}
				onPress={() => requestReward()}
			>
				{!loadRewarded && language == "eng" ? (
					<Text style={styles.rewardedStartText}>Watch the Ad</Text>
				) : null}
				{!loadRewarded && language == "hrv" ? (
					<Text style={styles.rewardedStartText}>
						Pogledaj reklamu
					</Text>
				) : null}
				{loadRewarded ? (
					<ActivityIndicator size="large" color={colors.white} />
				) : null}
			</TouchableOpacity>
			{language == "eng" ? (
				<Text style={styles.rewardedDisc}>
					If no Advert is shown come back a bit later.
				</Text>
			) : (
				<Text style={styles.rewardedDisc}>
					Ako se ne prikaže reklama, vrati se kasnije.
				</Text>
			)}

			{!openSelect ? null : (
				<View style={styles.selectListShadow}>
					<View style={styles.selectListWrapper}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							style={styles.selectList}
							centerContent={true}
						>
							{rewardList.map((topic, index) => (
								<TouchableOpacity
									activeOpacity={0.6}
									style={
										index === rewardList.length - 1
											? styles.selectItemNoBorder
											: styles.selectItem
									}
									key={topic.value}
									onPress={
										language == "eng"
											? () =>
													selectedTopic(
														topic.nameEng,
														topic.value
													)
											: () =>
													selectedTopic(
														topic.nameHrv,
														topic.value
													)
									}
								>
									{language == "eng" ? (
										<Text style={styles.selectText}>
											{topic.nameEng}
										</Text>
									) : (
										<Text style={styles.selectText}>
											{topic.nameHrv}
										</Text>
									)}
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</View>
			)}
		</View>
	);
};

export const Exit = () => {
	return (
		<Svg height="100%" width="100%" viewBox="0 0 352 352">
			<Path
				fill={colors.white}
				d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
			/>
		</Svg>
	);
};

export const ConsentScreen = ({ consentCallback }) => {
	return (
		<View style={styles.consentWrapper}>
			<Text style={styles.consentTitle}>Drink Responsibly!</Text>
			<Text style={styles.consentTxt}>
				Please drink responsibly.{"\n"}
				{"\n"}
				This is a party game, for entertainment purposes only.{"\n"}
				{"\n"}
				Know your limit!{"\n"}
				{"\n"}
				We do not promote underage or irresponsible drinking and/or use
				of any other substances.{"\n"}
				{"\n"}
				By continuing, you agree that you are responsible for any
				consequences that may result from the use of this app (Chug -
				Perfect Party Starter).
			</Text>
			<TouchableHighlight
				style={styles.consentBtn}
				underlayColor={colors.disabled}
				onPress={() => consentCallback(false)}
			>
				<Text style={styles.consentBtnTxt}>Agree</Text>
			</TouchableHighlight>
		</View>
	);
};

export const LandingScreen = ({ gameCallback }) => {
	const [language, setLanguage] = useState(languagePref);
	const [languageModul, setLanguageModul] = useState(false);

	const changeLang = async (value) => {
		await AsyncStorage.removeItem("languagePref");

		languagePref = value;
		await AsyncStorage.setItem("languagePref", value);
		setLanguage(value);
		setLanguageModul(false);
	};

	const setLangPref = async () => {
		languagePref = await AsyncStorage.getItem("languagePref");
		if (languagePref == undefined || languagePref == null) {
			languagePref = "eng";
			setLanguage(languagePref);
		} else {
			setLanguage(languagePref);
		}
	};
	setLangPref();

	return (
		<View style={styles.screenWrapper}>
			{languageModul ? null : (
				<View style={styles.landingContainer}>
					<Text style={styles.landingTitle}>Chug</Text>
					<TouchableHighlight
						onPress={() => gameCallback(true)}
						underlayColor={colors.white}
						style={styles.landingBtn}
					>
						{language == "eng" ? (
							<Text style={styles.landingTxt}>Start</Text>
						) : (
							<Text style={styles.landingTxt}>Kreni</Text>
						)}
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => setLanguageModul(true)}
						underlayColor={colors.white}
						style={styles.landingBtn}
					>
						{language == "eng" ? (
							<Text style={styles.landingTxt}>Languages</Text>
						) : (
							<Text style={styles.landingTxt}>Jezici</Text>
						)}
					</TouchableHighlight>
				</View>
			)}

			{!languageModul ? null : (
				<View style={styles.landingContainer}>
					<TouchableHighlight
						onPress={() => changeLang("eng")}
						underlayColor={colors.white}
						style={styles.landingBtn}
					>
						<Text style={styles.landingTxt}>English</Text>
					</TouchableHighlight>

					<TouchableHighlight
						onPress={() => changeLang("hrv")}
						underlayColor={colors.white}
						style={styles.landingBtn}
					>
						<Text style={styles.landingTxt}>Hrvatski</Text>
					</TouchableHighlight>
				</View>
			)}
		</View>
	);
};

var deviceWidth = Dimensions.get("screen").width;
var useWidth = Math.round(deviceWidth + deviceWidth * 0.06);
export const GameScreen = ({ gameCallback, rewardedCallback }) => {
	const [language, setLanguage] = useState(languagePref);

	const [selectedTopics, setSelectedTopics] = useState(selectedStates);
	const [unlockedTopics, setUnlockedTopics] = useState(unlockedStates);
	const [selectedPreset, setSelectedPreset] = useState(selectedPresetStates);

	useEffect(() => {
		unlockedStates = topicList.map(({ unlocked }) => unlocked);
		setUnlockedTopics(unlockedStates);
	}, []);

	const [gamePrompt, setGamePrompt] = useState("");
	const [againWait, setAgainWait] = useState(false);

	const [fillAgain, setFillAgain] = useState(new Animated.Value(0));
	function fillEffect() {
		fillAgain.setValue(60);
		Animated.timing(fillAgain, {
			toValue: 0,
			duration: 5e3,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
	}

	const [alertShow, setAlertShow] = useState(false);
	const [emptyPrompt, setEmptyPrompt] = useState(false);
	const [emptyList, setEmptyList] = useState(false);
	const [emptyGame, setEmptyGame] = useState(false);
	const [ruleAdded, setRuleAdded] = useState(false);
	const [presetModul, setPresetModul] = useState(false);

	const [customTopic, setCustomTopic] = useState(false);
	const [customPreset, setCustomPreset] = useState(true);
	const [customPrompt, setCustomPrompt] = useState("");
	const [customListMap, setCustomListMap] = useState(customListPrompts);
	var customOpen = false;
	var customMoreOpen = false;
	var isPlaying = false;

	const selectTopic = (value, selected, index) => {
		if (!selected) {
			topicList[index].selected = true;
			if (value == "custom") {
				setCustomTopic(true);
			}
		} else {
			if (value == "custom" && custom_list.length > 0) {
				setPresetModul(true);
			} else if (value == "custom" && custom_list.length == 0) {
				topicList[index].selected = false;
				setCustomTopic(false);
			} else {
				topicList[index].selected = false;
			}
		}

		selectedStates = topicList.map(({ selected }) => selected);
		setSelectedTopics(selectedStates);
	};

	const selectPreset = (selected, index) => {
		if (!selected) {
			presetList[index].selected = true;
		} else {
			presetList[index].selected = false;
		}

		selectedPresetStates = presetList.map(({ selected }) => selected);
		setSelectedPreset(selectedPresetStates);
	};

	const [opacityConfig, setOpacityConfig] = useState(new Animated.Value(1));
	const [opacityGame, setOpacityGame] = useState(new Animated.Value(0));
	const [opacityMore, setOpacityMore] = useState(new Animated.Value(0));

	function startGameEffect() {
		var fadeConfigVal = 0;
		var fadeGameVal = 1;
		Animated.timing(opacityConfig, {
			toValue: fadeConfigVal,
			duration: 300,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
		Animated.timing(opacityGame, {
			toValue: fadeGameVal,
			duration: 300,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
	}

	function customiseEffect() {
		var fadeGameVal = 0;
		var fadeMoreVal = 1;
		if (customMoreOpen) {
			fadeGameVal = 0;
			fadeMoreVal = 1;
		} else {
			fadeGameVal = 1;
			fadeMoreVal = 0;
		}
		Animated.timing(opacityGame, {
			toValue: fadeGameVal,
			duration: 300,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
		Animated.timing(opacityMore, {
			toValue: fadeMoreVal,
			duration: 300,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
	}
	const fadeConfig = {
		opacity: opacityConfig,
		zIndex: opacityConfig,
	};
	const fadeGame = {
		opacity: opacityGame,
		zIndex: opacityGame,
	};
	const fadeMore = {
		opacity: opacityMore,
		zIndex: opacityMore,
	};
	const toggleMoreModul = (boleon) => {
		customMoreOpen = boleon;
		customiseEffect();
	};

	const [slideTopics, setSlideTopics] = useState(new Animated.Value(0));
	const [slideCustom, setSlideCustom] = useState(
		new Animated.Value(useWidth)
	);
	function slideEffect() {
		var fadeConfigVal = 0;
		var fadeGameVal = 0;
		if (customOpen) {
			fadeGameVal = -useWidth;
			fadeConfigVal = 0;
		} else {
			fadeGameVal = 0;
			fadeConfigVal = useWidth;
		}
		Animated.timing(slideTopics, {
			toValue: fadeGameVal,
			duration: 300,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
		Animated.timing(slideCustom, {
			toValue: fadeConfigVal,
			duration: 300,
			useNativeDriver: true,
			easing: Easing.linear,
		}).start();
	}
	const moveTopic = {
		transform: [{ translateX: slideTopics }],
	};
	const moveCustom = {
		transform: [{ translateX: slideCustom }],
	};

	const toggleCustomModul = (boleon) => {
		customOpen = boleon;
		slideEffect();
	};

	const blurCustom = () => {
		// console.log("Input blured");
	};

	const focusCustom = () => {
		// console.log("Input in focus");
	};

	const customInputUpdate = (value) => {
		setCustomPrompt(value);
	};

	const addPrompt = () => {
		if (
			customPrompt == "" ||
			customPrompt == undefined ||
			customPrompt == null
		) {
			setEmptyPrompt(true);
			alertDelay();
		} else {
			custom_list.push(customPrompt);
			customListPrompts = custom_list.slice();
			setCustomListMap(customListPrompts);
			setRuleAdded(true);
			alertDelay();
			setCustomPrompt("");
		}
	};

	const deletePrompt = (index) => {
		custom_list.splice(index, 1);
		customListPrompts = custom_list.slice();
		setCustomListMap(customListPrompts);
	};

	const alertDelay = () => {
		setAlertShow(true);

		setTimeout(function () {
			setAlertShow(false);
			setRuleAdded(false);
			setEmptyPrompt(false);
			setEmptyList(false);
			setEmptyGame(false);
		}, 3000);
	};

	const clearCustom = () => {
		custom_list = [];
		customListPrompts = custom_list.slice();
		setCustomListMap(customListPrompts);

		topicList[0].selected = false;
		selectedStates = topicList.map(({ selected }) => selected);
		setSelectedTopics(selectedStates);

		setCustomTopic(false);
		setPresetModul(false);
	};

	const startGame = () => {
		var oneIsChecked = false;
		for (var i = 0; i < topicList.length; i++) {
			if (topicList[i].selected == true) {
				oneIsChecked = true;
				break;
			} else {
				oneIsChecked = false;
			}
		}
		if (customTopic == true && custom_list.length == 0) {
			setEmptyList(true);
			alertDelay();
		} else if (oneIsChecked == false) {
			setEmptyGame(true);
			alertDelay();
		} else {
			startGameEffect();

			for (var i = 0; i < topicList.length; i++) {
				if (topicList[i].selected && topicList[i].value !== "custom") {
					var getTopicList = topicList[i].value + "_" + languagePref;
					game_list = game_list.concat(eval(getTopicList));
				}
			}
			game_list = game_list.concat(custom_list);
			shuffle(game_list);

			setGamePrompt(game_list[0]);

			custom_list = [];
			gameCounter = 0;
		}
	};

	const continueGame = () => {
		game_list = game_list.concat(custom_list);
		shuffle(game_list);

		custom_list = [];
		gameCounter = 0;

		toggleMoreModul(false);
	};

	const again = () => {
		gameCounter++;
		game_list.push(game_list.shift());

		if (game_list.length == gameCounter) {
			shuffle(game_list);
			setGamePrompt(game_list[0]);
		} else {
			setGamePrompt(game_list[0]);
		}

		if (gameCounter == 10) {
			askForReview();
		}

		fillEffect();
		setAgainWait(true);
		setTimeout(function () {
			setAgainWait(false);
		}, 5e3);
	};

	return (
		<View style={styles.screenWrapper}>
			<TouchableOpacity
				style={styles.home}
				activeOpacity={0.6}
				onPress={() => gameCallback(false)}
			>
				<Home />
			</TouchableOpacity>

			<View style={styles.gamePageWrapper}>
				<Animated.View
					style={[styles.gamePageConfig, moveTopic, fadeConfig]}
				>
					{language == "eng" ? (
						<Text style={styles.gameSub}>Pick your topics:</Text>
					) : (
						<Text style={styles.gameSub}>Izaberi kategorije:</Text>
					)}

					<View style={styles.topicScrollWrapper}>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={styles.topicScroll}
							contentContainerStyle={styles.topicScrollCont}
							centerContent={true}
						>
							{topicList.map((topic, index) => (
								<TouchableHighlight
									underlayColor={colors.white}
									style={
										!unlockedTopics[index]
											? styles.topicItemDisabled
											: !selectedTopics[index]
											? styles.topicItem
											: styles.topicItemSelected
									}
									key={index}
									disabled={!topic.unlocked}
									onPress={() =>
										selectTopic(
											topic.value,
											topic.selected,
											index
										)
									}
								>
									{language == "eng" ? (
										<Text
											style={
												!unlockedTopics[index]
													? styles.topicItemTxtDisabled
													: !selectedTopics[index]
													? styles.topicItemTxt
													: styles.topicItemTxtSelected
											}
										>
											{topic.nameEng}
										</Text>
									) : (
										<Text
											style={
												!unlockedTopics[index]
													? styles.topicItemTxtDisabled
													: !selectedTopics[index]
													? styles.topicItemTxt
													: styles.topicItemTxtSelected
											}
										>
											{topic.nameHrv}
										</Text>
									)}
								</TouchableHighlight>
							))}
						</ScrollView>
					</View>

					<View style={styles.bottomBtnCont}>
						<TouchableHighlight
							underlayColor={colors.white}
							style={styles.bottomBtnPrimary}
							onPress={
								!customTopic
									? startGame
									: () => toggleCustomModul(true)
							}
						>
							{!customTopic ? (
								language == "eng" ? (
									<Text style={styles.bottomBtnPrimaryTxt}>
										Begin
									</Text>
								) : (
									<Text style={styles.bottomBtnPrimaryTxt}>
										Kreni
									</Text>
								)
							) : language == "eng" ? (
								<Text style={styles.bottomBtnPrimaryTxt}>
									Next Step
								</Text>
							) : (
								<Text style={styles.bottomBtnPrimaryTxt}>
									Dalje
								</Text>
							)}
						</TouchableHighlight>
						<TouchableOpacity
							activeOpacity={0.6}
							style={
								!rewardDisabled
									? styles.bottomReward
									: styles.bottomRewardDisabled
							}
							disabled={rewardDisabled}
							onPress={() => rewardedCallback(true)}
						>
							{language == "eng" ? (
								<Text
									style={
										!rewardDisabled
											? styles.bottomRewardTxt
											: styles.bottomRewardTxtDisabled
									}
								>
									Unlock more
								</Text>
							) : (
								<Text
									style={
										!rewardDisabled
											? styles.bottomRewardTxt
											: styles.bottomRewardTxtDisabled
									}
								>
									Otključaj više
								</Text>
							)}
						</TouchableOpacity>
					</View>
				</Animated.View>
				{customPreset ? (
					<Animated.View
						style={[styles.gamePageConfig, moveCustom, fadeConfig]}
					>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={styles.presetScroll}
							contentContainerStyle={styles.presetScrollCont}
							centerContent={true}
						>
							{presetList.map((preset, index) => (
								<TouchableHighlight
									underlayColor={colors.white}
									style={
										!selectedPreset[index]
											? styles.presetItem
											: styles.presetItemSelected
									}
									key={index}
									onPress={() =>
										selectPreset(preset.selected, index)
									}
								>
									<Text
										style={
											!selectedPreset[index]
												? styles.presetItemTxt
												: styles.presetItemTxtSelected
										}
									>
										{preset.title}
									</Text>
								</TouchableHighlight>
							))}
						</ScrollView>
						<View style={styles.bottomBtnCont}>
							<TouchableHighlight
								underlayColor={colors.white}
								style={styles.bottomBtnPrimary}
								onPress={startGame}
							>
								{language == "eng" ? (
									<Text style={styles.bottomBtnPrimaryTxt}>
										Begin
									</Text>
								) : (
									<Text style={styles.bottomBtnPrimaryTxt}>
										Kreni
									</Text>
								)}
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={colors.white}
								style={styles.bottomSecondary}
								onPress={() => setCustomPreset(false)}
							>
								{language == "eng" ? (
									<Text style={styles.bottomSecondaryTxt}>
										Return
									</Text>
								) : (
									<Text style={styles.bottomSecondaryTxt}>
										Nazad
									</Text>
								)}
							</TouchableHighlight>
						</View>
					</Animated.View>
				) : (
					<Animated.View
						style={[styles.gamePageConfig, moveCustom, fadeConfig]}
					>
						<View style={styles.inputCont}>
							{language == "eng" ? (
								<Text style={styles.inputExp}>
									Add your own prompts:
								</Text>
							) : (
								<Text style={styles.inputExp}>
									Dodaj svoja pravila:
								</Text>
							)}
							<View style={styles.inputFieldCont}>
								<TextInput
									style={styles.inputField}
									onChangeText={(customPrompt) =>
										customInputUpdate(customPrompt)
									}
									onSubmitEditing={addPrompt}
									onBlur={blurCustom}
									onFocus={focusCustom}
									value={customPrompt}
									multiline={false}
								/>
								<TouchableHighlight
									onPress={addPrompt}
									underlayColor={colors.white}
									style={styles.inputFieldBtn}
								>
									<Text style={styles.inputFieldBtnTxt}>
										+
									</Text>
								</TouchableHighlight>
							</View>
						</View>
						<View style={styles.customListWrapper}>
							<ScrollView
								showsVerticalScrollIndicator={true}
								style={styles.customList}
								contentContainerStyle={styles.customListCont}
								centerContent={true}
							>
								{customListMap.map((prompt, index) => (
									<TouchableOpacity
										activeOpacity={0.6}
										key={index}
										onPress={() => deletePrompt(index)}
									>
										<View style={styles.customPromptCont}>
											<View
												style={
													styles.customPromptTxtCont
												}
											>
												<Text
													style={
														styles.customPromptTxt
													}
												>
													{prompt}
												</Text>
											</View>
											<View
												style={
													styles.customPrompIconCont
												}
											>
												<Exit
													style={
														styles.customPromptIcon
													}
												/>
											</View>
										</View>
									</TouchableOpacity>
								))}
							</ScrollView>
						</View>
						<View style={styles.bottomBtnCont}>
							<TouchableHighlight
								underlayColor={colors.white}
								style={styles.bottomBtnPrimary}
								onPress={startGame}
							>
								{language == "eng" ? (
									<Text style={styles.bottomBtnPrimaryTxt}>
										Begin
									</Text>
								) : (
									<Text style={styles.bottomBtnPrimaryTxt}>
										Kreni
									</Text>
								)}
							</TouchableHighlight>
							<TouchableHighlight
								underlayColor={colors.white}
								style={styles.bottomSecondary}
								onPress={() => toggleCustomModul(false)}
							>
								{language == "eng" ? (
									<Text style={styles.bottomSecondaryTxt}>
										Return
									</Text>
								) : (
									<Text style={styles.bottomSecondaryTxt}>
										Nazad
									</Text>
								)}
							</TouchableHighlight>
						</View>
					</Animated.View>
				)}

				<Animated.View style={[styles.gamePage, fadeGame]}>
					<View style={styles.gamePromptCont}>
						<Text style={styles.gamePromptTxt}>{gamePrompt}</Text>
					</View>

					<View style={styles.bottomBtnCont}>
						<TouchableOpacity
							activeOpacity={0.6}
							style={styles.againBtn}
							disabled={againWait}
							onPress={again}
						>
							<View style={styles.againBtnCont}>
								{language == "eng" ? (
									<Text style={styles.againBtnTxt}>
										Again
									</Text>
								) : (
									<Text style={styles.againBtnTxt}>
										Ponovi
									</Text>
								)}

								<Animated.View
									style={[
										styles.againAnimatedBG,
										{
											transform: [
												{ translateY: fillAgain },
											],
										},
									]}
								/>
							</View>
						</TouchableOpacity>
						<TouchableHighlight
							underlayColor={colors.white}
							style={styles.bottomSecondary}
							onPress={() => toggleMoreModul(true)}
						>
							{language == "eng" ? (
								<Text style={styles.bottomSecondaryTxt}>
									Customise
								</Text>
							) : (
								<Text style={styles.bottomSecondaryTxt}>
									Prilagodi
								</Text>
							)}
						</TouchableHighlight>
					</View>
				</Animated.View>
				<Animated.View style={[styles.gamePageConfig, fadeMore]}>
					<View style={styles.inputCont}>
						{language == "eng" ? (
							<Text style={styles.inputExp}>
								Add more of your own prompts...
							</Text>
						) : (
							<Text style={styles.inputExp}>
								Dodaj još svojih pravila:
							</Text>
						)}
						<View style={styles.inputFieldCont}>
							<TextInput
								style={styles.inputField}
								onChangeText={(customPrompt) =>
									customInputUpdate(customPrompt)
								}
								onSubmitEditing={addPrompt}
								onBlur={blurCustom}
								onFocus={focusCustom}
								value={customPrompt}
								multiline={false}
							/>
							<TouchableHighlight
								onPress={addPrompt}
								underlayColor={colors.white}
								style={styles.inputFieldBtn}
							>
								<Text style={styles.inputFieldBtnTxt}>+</Text>
							</TouchableHighlight>
						</View>
					</View>
					<View style={styles.customListWrapper}>
						<ScrollView
							showsVerticalScrollIndicator={true}
							style={styles.customList}
							contentContainerStyle={styles.customListCont}
							centerContent={true}
						>
							{customListMap.map((prompt, index) => (
								<TouchableOpacity
									activeOpacity={0.6}
									key={index}
									onPress={() => deletePrompt(index)}
								>
									<View style={styles.customPromptCont}>
										<View
											style={styles.customPromptTxtCont}
										>
											<Text
												style={styles.customPromptTxt}
											>
												{prompt}
											</Text>
										</View>
										<View
											style={styles.customPrompIconCont}
										>
											<Exit
												style={styles.customPromptIcon}
											/>
										</View>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
					<View style={styles.bottomBtnCont}>
						<TouchableHighlight
							underlayColor={colors.white}
							style={styles.bottomBtnPrimary}
							onPress={continueGame}
						>
							{language == "eng" ? (
								<Text style={styles.bottomBtnPrimaryTxt}>
									Continue
								</Text>
							) : (
								<Text style={styles.bottomBtnPrimaryTxt}>
									Nastavi
								</Text>
							)}
						</TouchableHighlight>
					</View>
				</Animated.View>
			</View>

			{!alertShow ? null : (
				<View style={styles.alertWrapper}>
					{language == "eng" && ruleAdded ? (
						<Text style={styles.alertText}>Rule added!</Text>
					) : null}
					{language == "hrv" && ruleAdded ? (
						<Text style={styles.alertText}>Pravilo dodano!</Text>
					) : null}

					{language == "eng" && emptyPrompt ? (
						<Text style={styles.alertText}>
							You need to write something!
						</Text>
					) : null}
					{language == "hrv" && emptyPrompt ? (
						<Text style={styles.alertText}>
							Moraš nešto napisati!
						</Text>
					) : null}

					{language == "eng" && emptyList ? (
						<Text style={styles.alertText}>
							You need to add rules to the game!
						</Text>
					) : null}
					{language == "hrv" && emptyList ? (
						<Text style={styles.alertText}>
							Moraš dodati pravila igri!
						</Text>
					) : null}

					{language == "eng" && emptyGame ? (
						<Text style={styles.alertText}>
							You need to select at least one topic!
						</Text>
					) : null}
					{language == "hrv" && emptyGame ? (
						<Text style={styles.alertText}>
							Moraš odabrati barem jednu kategoriju!
						</Text>
					) : null}
				</View>
			)}

			{!presetModul ? null : (
				<View style={styles.modulWrapper}>
					<Text style={styles.modulExp}>
						This will delete the custom rules you added!
					</Text>
					<View style={styles.modulContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.modulBtn}
							onPress={() => setPresetModul(false)}
						>
							<Text style={styles.modulText}>Keep</Text>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.modulBtn}
							onPress={clearCustom}
						>
							<Text style={styles.modulText}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
};

function MainScreen() {
	const windowHeight = useWindowDimensions().height;
	const [consentOpen, setConsentOpen] = useState(true);
	const [gameOpen, setGameOpen] = useState(false);
	const [rewardedOpen, setRewardedOpen] = useState(false);

	async function checkConsent() {
		consentStatus = await AsyncStorage.getItem("consentStatus");
		if (consentStatus == undefined || consentStatus == null) {
			consentStatus = true;
			setConsentOpen(consentStatus);
		} else {
			consentStatus = false;
			setConsentOpen(consentStatus);
		}
	}

	useEffect(() => {
		checkConsent();
		askForPermission();
	}, []);

	const openLanding = async (value) => {
		var consentVal = value.toString();
		await AsyncStorage.removeItem("consentStatus");
		await AsyncStorage.setItem("consentStatus", consentVal);
		setConsentOpen(value);
	};

	const openGame = (value) => {
		setGameOpen(value);
	};

	const openRewardedModul = (value) => {
		setRewardedOpen(value);
	};

	return (
		<SafeAreaView
			style={[styles.container, { minHeight: Math.round(windowHeight) }]}
		>
			<StatusBar hidden />

			{rewardedOpen || consentOpen ? <RewardedBG /> : null}
			{rewardedOpen ? (
				<RewardedScreen rewardedCallback={openRewardedModul} />
			) : null}

			{!rewardedOpen && !consentOpen ? <MainBG /> : null}
			{!rewardedOpen && consentOpen ? (
				<ConsentScreen consentCallback={openLanding} />
			) : null}
			{!rewardedOpen && !gameOpen && !consentOpen ? (
				<LandingScreen gameCallback={openGame} />
			) : null}
			{!rewardedOpen && gameOpen ? (
				<GameScreen
					gameCallback={openGame}
					rewardedCallback={openRewardedModul}
				/>
			) : null}

			<View style={styles.ads}>
				{!rewardedOpen && !consentOpen ? (
					<AdMobBanner
						bannerSize="smartBannerPortrait"
						adUnitID={
							Platform.OS === "ios"
								? "ca-app-pub-3940256099942544/2934735716"
								: "ca-app-pub-3940256099942544/6300978111"
						} // Test ID, Replace with your-admob-unit-id
						servePersonalizedAds={personalisedAds}
					/>
				) : null}
			</View>
		</SafeAreaView>
	);
}

export default MainScreen;
