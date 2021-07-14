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
	Animated,
	Easing,
	ActivityIndicator,
	Platform,
	Dimensions,
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

// import Img from "../assets/img/imgname.svg";

import MainBG from "../screens/MainBG";
import RewardedBG from "../screens/RewardedBG";

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

var selectedStates = topicList.map(({ selected }) => selected);
var unlockedStates = topicList.map(({ unlocked }) => unlocked);

var languagePref = "Eng";
var personalisedAds = false;

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
	if (topicsUnlocked == true) {
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
}

export const RewardedScreen = ({ rewardedCallback }) => {
	const [loadRewarded, setLoadRewarded] = useState(false);

	const rewardedTimeOut = () => {
		setLoadRewarded(true);
	};

	async function requestReward() {
		rewardedTimeOut();

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
		unlockChords();
	});

	function resetRewarded() {
		if (reward == false) {
			setTimeout(function () {
				setLoadRewarded(false);
			}, 10000);
		}
	}

	function unlockChords() {
		reward = true;
		rewardedCallback(false);
	}

	return (
		<View style={styles.rewardedWrapper}>
			<TouchableOpacity
				style={styles.exit}
				disabled={loadRewarded}
				onPress={() => rewardedCallback(false)}
			>
				<Svg height="100%" width="100%" viewBox="0 0 352 352">
					<Path
						fill={!loadRewarded ? colors.primary : colors.disabled}
						d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
					/>
				</Svg>
			</TouchableOpacity>
			<View style={styles.rewardedExp}>
				<Text style={styles.rewardedExpText}>To unlock topics</Text>
				<Text style={styles.rewardedExpText}>watch this Advert:</Text>
			</View>
			<TouchableOpacity
				style={
					!loadRewarded
						? styles.rewardedStart
						: styles.rewardedDisabled
				}
				activeOpacity={1}
				disabled={loadRewarded}
				onPress={() => requestReward()}
			>
				{!loadRewarded ? (
					<Text style={styles.rewardedStartText}>Watch the Ad</Text>
				) : (
					<ActivityIndicator size="large" color={colors.white} />
				)}
			</TouchableOpacity>
			<Text style={styles.rewardedDisc}>
				If no Advert is shown come back a bit later
			</Text>
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

export const LandingScreen = ({ gameCallback }) => {
	const [language, setLanguage] = useState(languagePref);
	const [languageModul, setLanguageModul] = useState(false);

	const changeLang = (value) => {
		setLanguage(value);
		languagePref = value;
		setLanguageModul(false);
	};

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
						{language == "Eng" ? (
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
						{language == "Eng" ? (
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
						onPress={() => changeLang("Eng")}
						underlayColor={colors.white}
						style={styles.landingBtn}
					>
						<Text style={styles.landingTxt}>English</Text>
					</TouchableHighlight>

					<TouchableHighlight
						onPress={() => changeLang("Hrv")}
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

export const GameScreen = ({ gameCallback, rewardedCallback }) => {
	const [language, setLanguage] = useState(languagePref);

	const [selectedTopics, setSelectedTopics] = useState(selectedStates);
	const [unlockedTopics, setUnlockedTopics] = useState(unlockedStates);

	const [customTopic, setCustomTopic] = useState(false);

	const selectTopic = (value, selected, index) => {
		if (!selected) {
			topicList[index].selected = true;
			if (value == "custom") {
				setCustomTopic(true);
			}
		} else {
			topicList[index].selected = false;
			if (value == "custom") {
				setCustomTopic(false);
			}
		}

		selectedStates = topicList.map(({ selected }) => selected);
		setSelectedTopics(selectedStates);
	};

	const openCustomModul = () => {
		console.log("Opening custom");
	};

	const startDrinking = () => {
		console.log("Start game!");
	};

	return (
		<View style={styles.screenWrapper}>
			<TouchableOpacity
				style={styles.exit}
				onPress={() => gameCallback(false)}
			>
				<Exit />
			</TouchableOpacity>

			<View style={styles.gamePageTopics}>
				{language == "Eng" ? (
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
								{language == "Eng" ? (
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
											!selectedTopics[index]
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
						onPress={!customTopic ? startDrinking : openCustomModul}
					>
						{!customTopic ? (
							language == "Eng" ? (
								<Text style={styles.bottomBtnPrimaryTxt}>
									Begin
								</Text>
							) : (
								<Text style={styles.bottomBtnPrimaryTxt}>
									Kreni
								</Text>
							)
						) : language == "Eng" ? (
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
						style={styles.bottomReward}
						onPress={() => rewardedCallback(true)}
					>
						{language == "Eng" ? (
							<Text style={styles.bottomRewardTxt}>
								Unlock more
							</Text>
						) : (
							<Text style={styles.bottomRewardTxt}>
								Otključaj više
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

function MainScreen() {
	const [rewardedOpen, setRewardedOpen] = useState(false);
	const [gameOpen, setGameOpen] = useState(false);

	useEffect(() => {
		askForPermission();
	}, []);

	const startGame = (value) => {
		setGameOpen(value);
	};

	const openRewardedModul = (value) => {
		setRewardedOpen(value);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />

			{rewardedOpen ? <RewardedBG /> : null}
			{rewardedOpen ? (
				<RewardedScreen rewardedCallback={openRewardedModul} />
			) : null}

			{!rewardedOpen ? <MainBG /> : null}
			{!rewardedOpen && !gameOpen ? (
				<LandingScreen gameCallback={startGame} />
			) : null}
			{!rewardedOpen && gameOpen ? (
				<GameScreen gameCallback={startGame} />
			) : null}

			<View style={styles.ads}>
				{!rewardedOpen ? (
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
