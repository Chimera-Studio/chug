import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Animated,
  Easing,
  ActivityIndicator,
  Platform,
  Dimensions,
  useWindowDimensions,
  Modal,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import {
  AdMobBanner,
  AdMobRewarded,
  requestPermissionsAsync,
  getPermissionsAsync,
} from "expo-ads-admob";
import * as Device from "expo-device";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../config/colors";
import styles from "../config/styles";
import admob from "../tokens";

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
  eng_gaming,
  eng_fashion,
  eng_occupation,
  eng_education,
  eng_travel,
  eng_animals,
} from "../assets/prompts/eng-prompts";
import {
  hrv_general,
  hrv_music,
  hrv_movies,
  hrv_cars,
  hrv_sports,
  hrv_food,
  hrv_gaming,
  hrv_fashion,
  hrv_occupation,
  hrv_education,
  hrv_travel,
  hrv_animals,
} from "../assets/prompts/hrv-prompts";

var general_eng = eng_general;
var music_eng = eng_music;
var movies_eng = eng_movies;
var cars_eng = eng_cars;
var sports_eng = eng_sports;
var food_eng = eng_food;
var gaming_eng = eng_gaming;
var fashion_eng = eng_fashion;
var occupation_eng = eng_occupation;
var education_eng = eng_education;
var travel_eng = eng_travel;
var animals_eng = eng_animals;

var general_hrv = hrv_general;
var music_hrv = hrv_music;
var movies_hrv = hrv_movies;
var cars_hrv = hrv_cars;
var sports_hrv = hrv_sports;
var food_hrv = hrv_food;
var gaming_hrv = hrv_gaming;
var fashion_hrv = hrv_fashion;
var occupation_hrv = hrv_occupation;
var education_hrv = hrv_education;
var travel_hrv = hrv_travel;
var animals_hrv = hrv_animals;

const countdownHours = 24;
const refreshHours = 5;

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
    nameEng: "General",
    nameHrv: "Klasik",
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
    unlocked: true,
  },
  {
    nameEng: "Movies",
    nameHrv: "Filmovi",
    value: "movies",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Music",
    nameHrv: "Glazba",
    value: "music",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Gaming",
    nameHrv: "Gaming",
    value: "gaming",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Fashion",
    nameHrv: "Moda",
    value: "fashion",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Occupation",
    nameHrv: "Zanimanje",
    value: "occupation",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Education",
    nameHrv: "Obrazovanje",
    value: "education",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Travel",
    nameHrv: "Putovanje",
    value: "travel",
    selected: false,
    unlocked: true,
  },
  {
    nameEng: "Animals",
    nameHrv: "Životinje",
    value: "animals",
    selected: false,
    unlocked: true,
  },
];

var presetList = [];
var rewardList = [];

var selectedStates = topicList.map(({ selected }) => selected);
var unlockedStates = topicList.map(({ unlocked }) => unlocked);
var presetListTitle = presetList.map(({ title }) => title);
var selectedPresetStates = presetList.map(({ selected }) => selected);
var customListPrompts = custom_list.slice();

var presetOpen = false;
var customOpen = false;
var customMoreOpen = false;

var timerStart = false;
var timerUpdate = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};
var tickVariable;

var rewardListName;
var rewardListVal;
var rewardIndex;
var rewardDisabled = false;
var refreshEnabled = false;
var gameCounter = 0;
var consentStatus = true;
var languagePref = "eng";
var personalisedAds = false;

const emulator = Device.isDevice;
const admob_ios = {
  banner: emulator ? admob.banner.ios : admob.banner.ios_test,
  rewarded: emulator ? admob.rewarded.ios : admob.rewarded.ios_test,
};
const admob_android = {
  banner: emulator ? admob.banner.android : admob.banner.android_test,
  rewarded: emulator ? admob.rewarded.android : admob.rewarded.android_test,
};

var deviceWidth = Dimensions.get("screen").width;
var useWidth = Math.round(deviceWidth + deviceWidth * 0.06);

function shuffle(e) {
  for (var t, l, n = e.length; 0 !== n;)
    (l = Math.floor(Math.random() * n)),
      (t = e[(n -= 1)]),
      (e[n] = e[l]),
      (e[l] = t);
  return e;
}

function ms2Time(value) {
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = value % 1000;
  value = (value - ms) / 1000;
  var secs = value % 60;
  value = (value - secs) / 60;
  var mins = value % 60;
  var hrs = (value - mins) / 60;

  timerUpdate.hours = pad(hrs);
  timerUpdate.minutes = pad(mins);
  timerUpdate.seconds = pad(secs);
}

var date;
function getDate() {
  var today = new Date();
  date =
    today.getFullYear() + "" + (today.getMonth() + 1) + "." + today.getDate();
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

/* Dismiss Keyboard Component */
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
    setHrs(("0" + timerUpdate.hours).slice(-2));
    setMins(("0" + timerUpdate.minutes).slice(-2));
    setSecs(("0" + timerUpdate.seconds).slice(-2));
    checkTimerStart();
    setSelectedRewardName(rewardListName);
    rewardIndex = topicList.findIndex((obj) => obj.value == rewardListVal);
  }, []);

  const [language, setLanguage] = useState(languagePref);
  const [loadRewarded, setLoadRewarded] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [selectedRewardName, setSelectedRewardName] = useState(rewardListName);
  const [countdownStart, setCountdownStart] = useState(timerStart);
  const [refresh, setRefresh] = useState(refreshEnabled);

  const [hrs, setHrs] = useState([timerUpdate.hours]);
  const [mins, setMins] = useState([timerUpdate.minutes]);
  const [secs, setSecs] = useState([timerUpdate.seconds]);

  async function checkTimerStart() {
    timerStart = await AsyncStorage.getItem("timerStart");

    if (timerStart !== null) {
      timerStart = true;
      setCountdownStart(timerStart);
      checkRewardCountdown();
    } else {
      timerStart = false;
      setCountdownStart(timerStart);
    }
    checkTopicList();
  }

  async function checkRewardCountdown() {
    var countdownDate = JSON.parse(await AsyncStorage.getItem("countdownTime"));

    var currentDate = new Date().getTime();
    var timeDiff = countdownDate - currentDate;
    ms2Time(timeDiff);

    if (timeDiff <= 0) {
      lockRewards();
    } else {
      tickVariable = setInterval(() => tick(), 1000);
    }
  }

  function tick() {
    if (
      timerUpdate.hours === 0 &&
      timerUpdate.minutes === 0 &&
      timerUpdate.seconds === 0
    ) {
      lockRewards();
    } else if (
      timerUpdate.hours <= -1 ||
      timerUpdate.minutes <= -1 ||
      timerUpdate.seconds <= -1
    ) {
      clearInterval(tickVariable);
      checkRewardCountdown();
    } else if (timerUpdate.minutes === 0 && timerUpdate.seconds === 0) {
      var calcTime = timerUpdate.hours - 1;
      timerUpdate.hours = calcTime;
      timerUpdate.minutes = 59;
      timerUpdate.seconds = 59;
    } else if (timerUpdate.seconds === 0) {
      var calcTime = timerUpdate.minutes - 1;
      timerUpdate.minutes = calcTime;
      timerUpdate.seconds = 59;
    } else {
      var calcTime = timerUpdate.seconds - 1;
      timerUpdate.seconds = calcTime;
    }

    setHrs(("0" + timerUpdate.hours).slice(-2));
    setMins(("0" + timerUpdate.minutes).slice(-2));
    setSecs(("0" + timerUpdate.seconds).slice(-2));
  }

  async function lockRewards() {
    clearInterval(tickVariable);
    timerUpdate.hours = 0;
    timerUpdate.minutes = 0;
    timerUpdate.seconds = 0;

    await AsyncStorage.removeItem("timerStart");
    await AsyncStorage.removeItem("countdownTime");
    await AsyncStorage.removeItem("unlockedRewards");
    timerStart = false;
    setCountdownStart(timerStart);

    for (var i = 0; i < topicList.length; i++) {
      if (i <= 3) {
        topicList[i].unlocked = true;
      } else {
        topicList[i].unlocked = false;
      }
    }
    unlockedStates = topicList.map(({ unlocked }) => unlocked);

    rewardList = [];
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
    setSelectedRewardName(rewardListName);
    rewardIndex = topicList.findIndex((obj) => obj.value == rewardListVal);
  }

  function checkTopicList() {
    for (var i = 0; i < unlockedStates.length; i++) {
      if (unlockedStates[i] == false) {
        rewardDisabled = false;
        break;
      } else {
        rewardDisabled = true;
      }
    }
    if (rewardDisabled) {
      refreshEnabled = true;
      setRefresh(refreshEnabled);
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

  function exitReward() {
    clearInterval(tickVariable);
    rewardedCallback(false);
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
    if (!rewardDisabled) {
      unlockTopic();
    } else {
      refreshCount();
    }
  });

  async function requestReward() {
    clearInterval(tickVariable);
    setLoadRewarded(true);

    await AdMobRewarded.setAdUnitID(
      Platform.OS === "ios" ? admob_ios.rewarded : admob_android.rewarded
    ); /* 1. iOS, 2. Android */
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  }

  function resetRewarded() {
    if (loadRewarded == true && rewardEarned == false) {
      setTimeout(function () {
        setLoadRewarded(false);
      }, 10000);
    }
  }

  async function unlockTopic() {
    await AsyncStorage.removeItem("timerStart");
    await AsyncStorage.removeItem("countdownTime");
    await AsyncStorage.removeItem("unlockedRewards");

    var countdownDate = new Date().getTime() + countdownHours * 36e5;
    await AsyncStorage.setItem("countdownTime", JSON.stringify(countdownDate));

    timerStart = true;
    await AsyncStorage.setItem("timerStart", JSON.stringify(timerStart));

    topicList[rewardIndex].unlocked = true;
    unlockedStates = topicList.map(({ unlocked }) => unlocked);
    await AsyncStorage.setItem(
      "unlockedRewards",
      JSON.stringify(unlockedStates)
    );

    rewardEarned = true;
    rewardedCallback(false);
  }

  async function refreshCount() {
    await AsyncStorage.removeItem("timerStart");
    await AsyncStorage.removeItem("countdownTime");

    var countdownDate = new Date().getTime() + countdownHours * 36e5;
    await AsyncStorage.setItem("countdownTime", JSON.stringify(countdownDate));

    timerStart = true;
    await AsyncStorage.setItem("timerStart", JSON.stringify(timerStart));

    rewardEarned = true;
    rewardedCallback(false);
  }

  return (
    <View style={styles.rewardedWrapper}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.exit}
        disabled={loadRewarded || openSelect ? true : false}
        onPress={exitReward}
      >
        <Svg height="100%" width="100%" viewBox="0 0 352 352">
          <Path
            fill={!loadRewarded ? colors.grayDark : colors.grayLight}
            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
          />
        </Svg>
      </TouchableOpacity>

      <View style={styles.countdownCon}>
        {countdownStart ? (
          <Text style={styles.countdownTimer}>
            {hrs}:{mins}:{secs}
          </Text>
        ) : (
          <Text style={styles.countdownTimer}>00:00:00</Text>
        )}
        {language == "eng" ? (
          <Text style={styles.countdownTxt}>until the topics are locked</Text>
        ) : (
          <Text style={styles.countdownTxt}>do zaključavanja kategorija</Text>
        )}
      </View>

      {!refresh ? (
        <View style={styles.rewardedCon}>
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
                watch one Advert:
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
                from <Text style={{ color: colors.primary }}>
                  the last one
                </Text>{" "}
                that you unlocked.
              </Text>
            ) : (
              <Text style={styles.rewardedExp2Text}>
                Otključane kategorije biti će dostupne{" "}
                <Text style={{ color: colors.primary }}>24h</Text>
                {"\n"}
                od <Text style={{ color: colors.primary }}>zadnje</Text>{" "}
                otključane.
              </Text>
            )}
            {language == "eng" ? (
              <Text style={styles.rewardedExp3Text}>
                After <Text style={{ color: colors.primary }}>ALL</Text> topics
                are unlocked{"\n"}a{" "}
                <Text style={{ color: colors.primary }}>Keep Rewards</Text>{" "}
                button{"\n"}
                will become available{"\n"}
                <Text style={{ color: colors.primary }}>6h</Text> before the
                timer runs out.
              </Text>
            ) : (
              <Text style={styles.rewardedExp3Text}>
                Nakon što su <Text style={{ color: colors.primary }}>SVE</Text>{" "}
                kategorije otključane{"\n"}
                gumb{" "}
                <Text style={{ color: colors.primary }}>
                  Zadrži otključano
                </Text>{" "}
                biti će omogućen{"\n"}
                <Text style={{ color: colors.primary }}>6h</Text> prije negoli
                vrijeme istekne.
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={
              !loadRewarded ? styles.rewardedStart : styles.rewardedDisabled
            }
            activeOpacity={1}
            disabled={loadRewarded || openSelect ? true : false}
            onPress={() => requestReward()}
          >
            {!loadRewarded && language == "eng" ? (
              <Text style={styles.rewardedStartText}>Watch the Ad</Text>
            ) : null}
            {!loadRewarded && language == "hrv" ? (
              <Text style={styles.rewardedStartText}>Pogledaj reklamu</Text>
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
        </View>
      ) : (
        <View style={styles.rewardedCon}>
          <View style={styles.rewardedExp}>
            {language == "eng" ? (
              <Text style={styles.rewardedExpText}>
                To keep the rewards,{"\n"}
                watch one Advert:
              </Text>
            ) : (
              <Text style={styles.rewardedExpText}>
                Da zadržiš otključano,{"\n"}
                pogledaj jednu Reklamu:
              </Text>
            )}
            {language == "eng" ? (
              <Text style={styles.rewardedExp2Text}>
                The refresh will give you{" "}
                <Text style={{ color: colors.primary }}>24h</Text>
                {"\n"}
                from{" "}
                <Text style={{ color: colors.primary }}>
                  the end of the Ad
                </Text>{" "}
                {"\n"}
                and will become available again{"\n"}
                <Text style={{ color: colors.primary }}>6h</Text> before the
                time runs out.
              </Text>
            ) : (
              <Text style={styles.rewardedExp2Text}>
                Ovo će ti dati{" "}
                <Text style={{ color: colors.primary }}>24h</Text> od{" "}
                <Text style={{ color: colors.primary }}>kraja reklame</Text>
                {"\n"}
                te će biti ponovno omogućeno{"\n"}
                <Text style={{ color: colors.primary }}>6h</Text> prije nego što
                vrijeme istekne.
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={
              !loadRewarded ? styles.rewardedStart : styles.rewardedDisabled
            }
            activeOpacity={1}
            disabled={loadRewarded || openSelect ? true : false}
            onPress={() => requestReward()}
          >
            {!loadRewarded && language == "eng" ? (
              <Text style={styles.rewardedStartText}>Watch the Ad</Text>
            ) : null}
            {!loadRewarded && language == "hrv" ? (
              <Text style={styles.rewardedStartText}>Pogledaj reklamu</Text>
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
        </View>
      )}

      <Modal animationType="fade" transparent={true} visible={openSelect}>
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
                      ? () => selectedTopic(topic.nameEng, topic.value)
                      : () => selectedTopic(topic.nameHrv, topic.value)
                  }
                >
                  {language == "eng" ? (
                    <Text style={styles.selectText}>{topic.nameEng}</Text>
                  ) : (
                    <Text style={styles.selectText}>{topic.nameHrv}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
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
        We do not promote underage or irresponsible drinking and/or use of any
        other substances.{"\n"}
        {"\n"}
        By continuing, you agree that you are responsible for any consequences
        that may result from the use of this app (Chug - Perfect Party Starter).
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
  useEffect(() => {
    setLangPref();
  }, []);

  const [language, setLanguage] = useState(languagePref);
  const [languageModul, setLanguageModul] = useState(false);

  const [opacityMenu, setOpacityMenu] = useState(new Animated.Value(1));
  const [opacityLang, setOpacityLang] = useState(new Animated.Value(0));

  const fadeEffectIn = () => {
    Animated.timing(opacityMenu, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setTimeout(function () {
      setLanguageModul(true);

      Animated.timing(opacityLang, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }, 300);
  };

  const fadeEffectOut = () => {
    Animated.timing(opacityLang, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();

    setTimeout(function () {
      setLanguageModul(false);

      Animated.timing(opacityMenu, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }, 300);
  };

  const fadeMenu = {
    opacity: opacityMenu,
  };
  const fadeLang = {
    opacity: opacityLang,
  };

  const changeLang = async (value) => {
    await AsyncStorage.removeItem("languagePref");

    languagePref = value;
    await AsyncStorage.setItem("languagePref", value);
    setLanguage(value);
    fadeEffectOut();
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

  return (
    <View style={styles.screenWrapper}>
      {!languageModul ? (
        <Animated.View style={[styles.landingContainer, fadeMenu]}>
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
            onPress={fadeEffectIn}
            underlayColor={colors.white}
            style={styles.landingBtn}
          >
            {language == "eng" ? (
              <Text style={styles.landingTxt}>Languages</Text>
            ) : (
              <Text style={styles.landingTxt}>Jezici</Text>
            )}
          </TouchableHighlight>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.landingContainer, fadeLang]}>
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
        </Animated.View>
      )}
    </View>
  );
};

export const GameScreen = ({ gameCallback, rewardedCallback }) => {
  useEffect(() => {
    selectedStates = topicList.map(({ selected }) => selected);
    setSelectedTopics(selectedStates);
    selectedPresetStates = presetList.map(({ selected }) => selected);
    setSelectedPreset(selectedPresetStates);
    checkCountdown();
  }, []);

  const [language, setLanguage] = useState(languagePref);

  const [selectedTopics, setSelectedTopics] = useState(selectedStates);
  const [unlockedTopics, setUnlockedTopics] = useState(unlockedStates);
  const [disabled, setDisabled] = useState(rewardDisabled);
  const [refresh, setRefresh] = useState(refreshEnabled);

  const [customTopic, setCustomTopic] = useState(false);

  const [presetListMap, setPresetListMap] = useState(presetListTitle);
  const [selectedPreset, setSelectedPreset] = useState(selectedPresetStates);
  const [customPreset, setCustomPreset] = useState(false);
  const [customPresetTitle, setCustomPresetTitle] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [customListMap, setCustomListMap] = useState(customListPrompts);

  const [gamePrompt, setGamePrompt] = useState("");
  const [againWait, setAgainWait] = useState(false);

  const [alertShow, setAlertShow] = useState(false);
  const [emptyPrompt, setEmptyPrompt] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [emptyGame, setEmptyGame] = useState(false);
  const [keepAlert, setKeepAlert] = useState(false);
  const [ruleAdded, setRuleAdded] = useState(false);
  const [emptyCustom, setEmptyCustom] = useState(false);
  const [presetSaved, setPresetSaved] = useState(false);
  const [customModul, setCustomModul] = useState(false);
  const [presetModul, setPresetModul] = useState(false);
  const [presetModulAlert, setPresetModulAlert] = useState(false);

  const fadeAlert = useState(new Animated.Value(0))[0];

  function alertFade() {
    Animated.timing(fadeAlert, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(function () {
      Animated.timing(fadeAlert, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 2700);
  }

  function alertFadeKeep() {
    Animated.timing(fadeAlert, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(function () {
      Animated.timing(fadeAlert, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 4700);
  }

  const showAlert = {
    opacity: fadeAlert,
  };

  async function checkCountdown() {
    var countdownDate = JSON.parse(await AsyncStorage.getItem("countdownTime"));

    if (countdownDate) {
      var currentDate = new Date().getTime();
      var timeDiff = countdownDate - currentDate;
      ms2Time(timeDiff);

      if (timeDiff <= 0) {
        lockRewards();
      } else {
        checkUnlocked();
      }
    }
  }

  async function lockRewards() {
    timerUpdate.hours = 0;
    timerUpdate.minutes = 0;
    timerUpdate.seconds = 0;

    await AsyncStorage.removeItem("timerStart");
    await AsyncStorage.removeItem("countdownTime");
    await AsyncStorage.removeItem("unlockedRewards");
    timerStart = false;

    for (var i = 0; i < topicList.length; i++) {
      if (i <= 3) {
        topicList[i].unlocked = true;
      } else {
        topicList[i].unlocked = false;
      }
    }
    unlockedStates = topicList.map(({ unlocked }) => unlocked);
    checkUnlocked();
  }

  async function checkUnlocked() {
    unlockedStates = JSON.parse(await AsyncStorage.getItem("unlockedRewards"));
    if (unlockedStates && unlockedStates.length) {
      for (var i = 0; i < topicList.length; i++) {
        topicList[i].unlocked = unlockedStates[i];
      }
      setUnlockedTopics(unlockedStates);
    } else {
      unlockedStates = topicList.map(({ unlocked }) => unlocked);
      setUnlockedTopics(unlockedStates);
    }

    checkTopicList();
  }

  function checkTopicList() {
    for (var i = 0; i < unlockedStates.length; i++) {
      if (unlockedStates[i] == false) {
        rewardDisabled = false;
        setDisabled(rewardDisabled);
        break;
      } else {
        rewardDisabled = true;
        setDisabled(rewardDisabled);
      }
    }

    if (rewardDisabled && timerUpdate.hours <= refreshHours) {
      refreshEnabled = true;
      setRefresh(refreshEnabled);
    } else {
      refreshEnabled = false;
      setRefresh(refreshEnabled);
    }
  }

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
  const [slidePreset, setSlidePreset] = useState(new Animated.Value(useWidth));
  const [slideCustom, setSlideCustom] = useState(
    new Animated.Value(useWidth * 2)
  );
  function slideEffect() {
    var slideTopicsVal = 0;
    var slidePresetVal = 0;
    var slideCustomVal = 0;
    if (!presetOpen && !customOpen) {
      slideTopicsVal = 0;
      slidePresetVal = useWidth;
      slideCustomVal = useWidth * 2;
    } else if (presetOpen && !customOpen) {
      slideTopicsVal = -useWidth;
      slidePresetVal = 0;
      slideCustomVal = useWidth;
    } else if (presetOpen && customOpen) {
      slideTopicsVal = -useWidth * 2;
      slidePresetVal = -useWidth;
      slideCustomVal = 0;
    }
    Animated.timing(slideTopics, {
      toValue: slideTopicsVal,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    Animated.timing(slidePreset, {
      toValue: slidePresetVal,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
    Animated.timing(slideCustom, {
      toValue: slideCustomVal,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }
  const moveTopic = {
    transform: [{ translateX: slideTopics }],
  };
  const movePreset = {
    transform: [{ translateX: slidePreset }],
  };
  const moveCustom = {
    transform: [{ translateX: slideCustom }],
  };

  const selectTopic = (value, selected, index) => {
    if (!selected) {
      topicList[index].selected = true;
      if (value == "custom") {
        setCustomTopic(true);
      }
    } else {
      if (value == "custom" && custom_list.length > 0) {
        setCustomModul(true);
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

  const togglePresetModul = async (boleon) => {
    presetOpen = boleon;

    presetList = JSON.parse(await AsyncStorage.getItem("presetList"));
    if (presetList && presetList.length) {
      setCustomPreset(true);
      presetListTitle = presetList.map(({ title }) => title);
      setPresetListMap(presetListTitle);
    } else {
      setCustomPreset(false);
      presetList = [];
    }

    slideEffect();
  };

  const toggleCustomModul = async (boleon) => {
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
    alertFade();
    setTimeout(function () {
      setAlertShow(false);
      setRuleAdded(false);
      setEmptyPrompt(false);
      setEmptyList(false);
      setEmptyGame(false);
      setKeepAlert(false);
      setEmptyCustom(false);
      setPresetSaved(false);
    }, 3000);
  };

  const keepCustom = () => {
    setCustomModul(false);
  };

  const clearCustom = () => {
    custom_list = [];
    customListPrompts = custom_list.slice();
    setCustomListMap(customListPrompts);

    topicList[0].selected = false;
    selectedStates = topicList.map(({ selected }) => selected);
    setSelectedTopics(selectedStates);

    setCustomTopic(false);
    setCustomModul(false);
  };

  const startGame = async () => {
    game_list = [];

    var oneIsChecked = false;
    for (var i = 0; i < topicList.length; i++) {
      if (topicList[i].selected == true) {
        oneIsChecked = true;
        break;
      } else {
        oneIsChecked = false;
      }
    }

    var onePresetIsChecked = false;
    for (var i = 0; i < presetList.length; i++) {
      if (presetList[i].selected == true) {
        onePresetIsChecked = true;
        break;
      } else {
        onePresetIsChecked = false;
      }
    }

    if (customTopic && custom_list.length == 0 && !onePresetIsChecked) {
      setEmptyList(true);
      alertDelay();
    } else if (!oneIsChecked) {
      setEmptyGame(true);
      alertDelay();
    } else {
      for (var i = 0; i < topicList.length; i++) {
        if (topicList[i].selected && topicList[i].value !== "custom") {
          var getTopicList = topicList[i].value + "_" + languagePref;
          game_list = game_list.concat(eval(getTopicList));
        }
      }
      for (var i = 0; i < presetList.length; i++) {
        if (presetList[i].selected) {
          var getPresetList = await AsyncStorage.getItem(presetList[i].title);
          game_list = game_list.concat(eval(getPresetList));
        }
      }
      game_list = game_list.concat(custom_list);
      shuffle(game_list);

      setGamePrompt(game_list[0]);

      custom_list = [];
      customListPrompts = custom_list.slice();
      setCustomListMap(customListPrompts);
      gameCounter = 0;

      startGameEffect();
    }
  };

  const continueGame = () => {
    game_list = game_list.concat(custom_list);
    shuffle(game_list);

    custom_list = [];
    customListPrompts = custom_list.slice();
    setCustomListMap(customListPrompts);
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

  const openPresetModul = () => {
    if (custom_list.length > 0) {
      setPresetModul(true);
    } else {
      setEmptyCustom(true);
      alertDelay();
    }
  };

  const exitPresetModul = () => {
    setPresetModul(false);
    setPresetModulAlert(false);
    setCustomPresetTitle("");
  };

  const save = () => {
    var titleAvailable = true;
    for (var i = 0; i < presetList.length; i++) {
      if (presetList[i].title == customPresetTitle) {
        titleAvailable = false;
        break;
      } else {
        titleAvailable = true;
      }
    }
    if (
      customPresetTitle == "" ||
      customPresetTitle == undefined ||
      customPresetTitle == null
    ) {
      setEmptyPrompt(true);
      alertDelay();
    } else if (titleAvailable) {
      savePreset(customPresetTitle);
    } else {
      setPresetModulAlert(true);
    }
  };

  const update = async () => {
    var updateIndex = presetList.findIndex(
      (obj) => obj.title == customPresetTitle
    );
    presetList.splice(updateIndex, 1);
    await AsyncStorage.removeItem(customPresetTitle);

    savePreset(customPresetTitle);
  };

  const savePreset = async (value) => {
    await AsyncStorage.removeItem("presetList");

    var obj = {};
    obj["title"] = value;
    obj["selected"] = false;
    presetList.push(obj);

    selectedPresetStates = presetList.map(({ selected }) => selected);
    setSelectedPreset(selectedPresetStates);

    await AsyncStorage.setItem("presetList", JSON.stringify(presetList));
    await AsyncStorage.setItem(value, JSON.stringify(custom_list));

    presetListTitle = presetList.map(({ title }) => title);
    setPresetListMap(presetListTitle);

    setPresetModul(false);
    setPresetModulAlert(false);
    setCustomPreset(true);
    setCustomPresetTitle("");

    setPresetSaved(true);
    alertDelay();
  };

  const deletePreset = async (index) => {
    var presetTitle = presetList[index].title;
    presetList.splice(index, 1);

    await AsyncStorage.removeItem("presetList");
    await AsyncStorage.removeItem(presetTitle);
    await AsyncStorage.setItem("presetList", JSON.stringify(presetList));

    if (presetList && presetList.length) {
      setCustomPreset(true);
    } else {
      setCustomPreset(false);
      presetList = [];
    }

    presetListTitle = presetList.map(({ title }) => title);
    setPresetListMap(presetListTitle);
  };

  const exitScreen = () => {
    presetOpen = false;
    customOpen = false;
    customMoreOpen = false;

    for (var i = 0; i < topicList.length; i++) {
      topicList[i].selected = false;
    }
    topicList[1].selected = true;
    for (var i = 0; i < presetList.length; i++) {
      presetList[i].selected = false;
    }

    selectedStates = topicList.map(({ selected }) => selected);
    selectedPresetStates = presetList.map(({ selected }) => selected);
    setSelectedTopics(selectedStates);
    setSelectedPreset(selectedPresetStates);

    gameCallback(false);
  };

  const keepDisabled = () => {
    setKeepAlert(true);
    setAlertShow(true);
    alertFadeKeep();
    setTimeout(function () {
      setAlertShow(false);
      setKeepAlert(false);
    }, 5000);
  };

  const openRewardedScreen = () => {
    if (custom_list.length > 0) {
      setCustomModul(true);
    } else {
      presetOpen = false;
      customOpen = false;
      customMoreOpen = false;

      for (var i = 0; i < topicList.length; i++) {
        topicList[i].selected = false;
      }
      topicList[1].selected = true;
      for (var i = 0; i < presetList.length; i++) {
        presetList[i].selected = false;
      }

      selectedStates = topicList.map(({ selected }) => selected);
      selectedPresetStates = presetList.map(({ selected }) => selected);
      setSelectedTopics(selectedStates);
      setSelectedPreset(selectedPresetStates);

      rewardedCallback(true);
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <TouchableOpacity
        style={styles.home}
        activeOpacity={0.6}
        onPress={exitScreen}
      >
        <Home />
      </TouchableOpacity>

      <View style={styles.gamePageWrapper}>
        <Animated.View style={[styles.gamePageConfig, moveTopic, fadeConfig]}>
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
                    selectTopic(topic.value, topic.selected, index)
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
              onPress={!customTopic ? startGame : () => togglePresetModul(true)}
            >
              {!customTopic ? (
                language == "eng" ? (
                  <Text style={styles.bottomBtnPrimaryTxt}>Begin</Text>
                ) : (
                  <Text style={styles.bottomBtnPrimaryTxt}>Kreni</Text>
                )
              ) : language == "eng" ? (
                <Text style={styles.bottomBtnPrimaryTxt}>Next Step</Text>
              ) : (
                <Text style={styles.bottomBtnPrimaryTxt}>Dalje</Text>
              )}
            </TouchableHighlight>

            {/*
            {!disabled ? (
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.bottomReward}
                onPress={openRewardedScreen}
              >
                {language == "eng" ? (
                  <Text style={styles.bottomRewardTxt}>Unlock more</Text>
                ) : (
                  <Text style={styles.bottomRewardTxt}>Otključaj više</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.6}
                style={
                  refresh ? styles.bottomReward : styles.bottomRewardDisabled
                }
                onPress={refresh ? openRewardedScreen : keepDisabled}
              >
                {language == "eng" ? (
                  <Text
                    style={
                      refresh
                        ? styles.bottomRewardTxt
                        : styles.bottomRewardTxtDisabled
                    }
                  >
                    Keep rewards
                  </Text>
                ) : (
                  <Text
                    style={
                      refresh
                        ? styles.bottomRewardTxt
                        : styles.bottomRewardTxtDisabled
                    }
                  >
                    Zadrži otključano
                  </Text>
                )}
              </TouchableOpacity>
            )}
            */}
          </View>
        </Animated.View>
        <Animated.View style={[styles.gamePageConfig, movePreset, fadeConfig]}>
          {!customPreset ? (
            <View>
              {language == "eng" ? (
                <Text style={styles.noPresetTitle}>
                  You have no presets saved!
                </Text>
              ) : (
                <Text style={styles.noPresetTitle}>
                  Nemaš spremljen preset!
                </Text>
              )}
            </View>
          ) : null}

          <ScrollView
            showsVerticalScrollIndicator={true}
            style={styles.presetScroll}
            contentContainerStyle={styles.presetScrollCont}
            centerContent={true}
          >
            {presetList.map((preset, index) => (
              <View key={index} style={styles.presetItemCont}>
                <TouchableHighlight
                  underlayColor={colors.white}
                  style={
                    !selectedPreset[index]
                      ? styles.presetItem
                      : styles.presetItemSelected
                  }
                  onPress={() => selectPreset(preset.selected, index)}
                >
                  <Text
                    style={
                      !selectedPreset[index]
                        ? styles.presetItemTxt
                        : styles.presetItemTxtSelected
                    }
                  >
                    {presetListMap[index]}
                  </Text>
                </TouchableHighlight>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.presetDeleteBtn}
                  onPress={() => deletePreset(index)}
                >
                  <Exit />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.bottomBtnCont}>
            <TouchableHighlight
              underlayColor={colors.white}
              style={styles.bottomBtnPrimary}
              onPress={() => toggleCustomModul(true)}
            >
              {language == "eng" ? (
                <Text style={styles.bottomBtnPrimaryTxt}>Next Step</Text>
              ) : (
                <Text style={styles.bottomBtnPrimaryTxt}>Dalje</Text>
              )}
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.white}
              style={styles.bottomSecondary}
              onPress={() => togglePresetModul(false)}
            >
              {language == "eng" ? (
                <Text style={styles.bottomSecondaryTxt}>Return</Text>
              ) : (
                <Text style={styles.bottomSecondaryTxt}>Nazad</Text>
              )}
            </TouchableHighlight>
          </View>
        </Animated.View>
        <DismissKeyboard>
          <Animated.View
            style={[styles.gamePageConfig, moveCustom, fadeConfig]}
          >
            <View style={styles.inputCont}>
              {language == "eng" ? (
                <Text style={styles.inputExp}>Add your own prompts:</Text>
              ) : (
                <Text style={styles.inputExp}>Dodaj svoja pravila:</Text>
              )}
              <View style={styles.inputFieldCont}>
                <TextInput
                  style={styles.inputField}
                  selectionColor={colors.white}
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
              <TouchableHighlight
                onPress={openPresetModul}
                underlayColor={colors.white}
                style={styles.savePresetBtn}
              >
                {language == "eng" ? (
                  <Text style={styles.savePresetBtnTxt}>Create preset</Text>
                ) : (
                  <Text style={styles.savePresetBtnTxt}>Stvori preset</Text>
                )}
              </TouchableHighlight>
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
                      <View style={styles.customPromptTxtCont}>
                        <Text style={styles.customPromptTxt}>{prompt}</Text>
                      </View>
                      <View style={styles.customPrompIconCont}>
                        <Svg
                          style={styles.customPromptIcon}
                          height="100%"
                          width="100%"
                          viewBox="0 0 352 352"
                        >
                          <Path
                            fill={colors.white}
                            d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
                          />
                        </Svg>
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
                  <Text style={styles.bottomBtnPrimaryTxt}>Begin</Text>
                ) : (
                  <Text style={styles.bottomBtnPrimaryTxt}>Kreni</Text>
                )}
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={colors.white}
                style={styles.bottomSecondary}
                onPress={() => toggleCustomModul(false)}
              >
                {language == "eng" ? (
                  <Text style={styles.bottomSecondaryTxt}>Return</Text>
                ) : (
                  <Text style={styles.bottomSecondaryTxt}>Nazad</Text>
                )}
              </TouchableHighlight>
            </View>
          </Animated.View>
        </DismissKeyboard>
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
                  <Text style={styles.againBtnTxt}>Again</Text>
                ) : (
                  <Text style={styles.againBtnTxt}>Ponovi</Text>
                )}

                <Animated.View
                  style={[
                    styles.againAnimatedBG,
                    {
                      transform: [{ translateY: fillAgain }],
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableHighlight
              underlayColor={colors.white}
              style={[
                styles.bottomSecondary,
                !customTopic ? { opacity: 0 } : null,
              ]}
              disabled={!customTopic}
              onPress={() => toggleMoreModul(true)}
            >
              {language == "eng" ? (
                <Text style={styles.bottomSecondaryTxt}>Customise</Text>
              ) : (
                <Text style={styles.bottomSecondaryTxt}>Podesi</Text>
              )}
            </TouchableHighlight>
          </View>
        </Animated.View>
        <Animated.View style={[styles.gamePageConfig, fadeMore]}>
          <View style={styles.inputCont}>
            {language == "eng" ? (
              <Text style={styles.inputExp}>Add more prompts:</Text>
            ) : (
              <Text style={styles.inputExp}>Dodaj još pravila:</Text>
            )}
            <View style={styles.inputFieldCont}>
              <TextInput
                style={styles.inputField}
                selectionColor={colors.white}
                onChangeText={(customPrompt) => customInputUpdate(customPrompt)}
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
                    <View style={styles.customPromptTxtCont}>
                      <Text style={styles.customPromptTxt}>{prompt}</Text>
                    </View>
                    <View style={styles.customPrompIconCont}>
                      <Svg
                        style={styles.customPromptIcon}
                        height="100%"
                        width="100%"
                        viewBox="0 0 352 352"
                      >
                        <Path
                          fill={colors.white}
                          d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
                        />
                      </Svg>
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
                <Text style={styles.bottomBtnPrimaryTxt}>Continue</Text>
              ) : (
                <Text style={styles.bottomBtnPrimaryTxt}>Nastavi</Text>
              )}
            </TouchableHighlight>
          </View>
        </Animated.View>
      </View>

      {!alertShow ? null : (
        <Animated.View style={[styles.alertWrapper, showAlert]}>
          {language == "eng" && ruleAdded ? (
            <Text style={styles.alertText}>Rule added!</Text>
          ) : null}
          {language == "hrv" && ruleAdded ? (
            <Text style={styles.alertText}>Pravilo dodano!</Text>
          ) : null}

          {language == "eng" && emptyPrompt ? (
            <Text style={styles.alertText}>You need to write something!</Text>
          ) : null}
          {language == "hrv" && emptyPrompt ? (
            <Text style={styles.alertText}>Moraš nešto napisati!</Text>
          ) : null}

          {language == "eng" && emptyList ? (
            <Text style={styles.alertText}>
              You need to add rules to the game!
            </Text>
          ) : null}
          {language == "hrv" && emptyList ? (
            <Text style={styles.alertText}>Moraš dodati pravila igri!</Text>
          ) : null}

          {language == "eng" && emptyCustom ? (
            <Text style={styles.alertText}>
              You need to add rules to be able to save them!
            </Text>
          ) : null}
          {language == "hrv" && emptyCustom ? (
            <Text style={styles.alertText}>
              Moraš dodati pravila da ih možeš spremiti!
            </Text>
          ) : null}

          {language == "eng" && presetSaved ? (
            <Text style={styles.alertText}>Preset saved!</Text>
          ) : null}
          {language == "hrv" && presetSaved ? (
            <Text style={styles.alertText}>Spremljeno!</Text>
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
          {language == "eng" && keepAlert ? (
            <Text style={styles.alertText}>
              This will become available{" "}
              <Text style={{ color: colors.green }}>6h</Text> before
              {"\n"}
              the timer runs out.
            </Text>
          ) : null}
          {language == "hrv" && keepAlert ? (
            <Text style={styles.alertText}>
              Ovaj gumb će biti omogućen{" "}
              <Text style={{ color: colors.green }}>6h</Text> prije
              {"\n"}
              nego li tajmer .
            </Text>
          ) : null}
        </Animated.View>
      )}

      <Modal animationType="fade" transparent={true} visible={customModul}>
        <View style={styles.modulWrapper}>
          {language == "eng" ? (
            <Text style={styles.modulExp}>
              This will delete the custom rules you added!
            </Text>
          ) : (
            <Text style={styles.modulExp}>
              Ovo će obrisati pravila koja ste dodali!
            </Text>
          )}

          <View style={styles.modulContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modulBtn}
              onPress={keepCustom}
            >
              {language == "eng" ? (
                <Text style={styles.modulText}>Keep</Text>
              ) : (
                <Text style={styles.modulText}>Zadrži</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modulBtn}
              onPress={clearCustom}
            >
              {language == "eng" ? (
                <Text style={styles.modulText}>Delete</Text>
              ) : (
                <Text style={styles.modulText}>Obriši</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={presetModul}>
        <View style={styles.presetModulWrapper}>
          {language == "eng" ? (
            <Text style={styles.presetModulExp}>Add a preset name:</Text>
          ) : (
            <Text style={styles.presetModulExp}>Dodaj ime za preset:</Text>
          )}
          <View style={styles.presetInputFieldCont}>
            <TextInput
              style={styles.presetInputField}
              selectionColor={colors.white}
              onChangeText={(customPresetTitle) =>
                setCustomPresetTitle(customPresetTitle)
              }
              value={customPresetTitle}
              multiline={false}
            />
            <TouchableHighlight
              onPress={save}
              underlayColor={colors.white}
              style={styles.presetInputFieldBtn}
            >
              {language == "eng" ? (
                <Text style={styles.presetInputFieldBtnTxt}>Save</Text>
              ) : (
                <Text style={styles.presetInputFieldBtnTxt}>Spremi</Text>
              )}
            </TouchableHighlight>
          </View>
          {!presetModulAlert ? null : (
            <View style={styles.presetModulContainer}>
              {language == "eng" ? (
                <Text style={styles.presetModulDisc}>
                  A preset with this name already exists.
                  {"\n"}
                  Change the name or update that preset?
                </Text>
              ) : (
                <Text style={styles.presetModulDisc}>
                  Preset sa ovim imenom već postoji.{"\n"}
                  Promijeni ime ili ažuriraj postojeći?
                </Text>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.presetModulBtn}
                onPress={update}
              >
                {language == "eng" ? (
                  <Text style={styles.presetModulText}>Update</Text>
                ) : (
                  <Text style={styles.presetModulText}>Ažuriraj</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.exitPresetSave}
            onPress={exitPresetModul}
          >
            <Svg height="100%" width="100%" viewBox="0 0 352 352">
              <Path
                fill={colors.primary}
                d="M242.7,176L342.8,75.9c12.3-12.3,12.3-32.2,0-44.5L320.6,9.2c-12.3-12.3-32.2-12.3-44.5,0L176,109.3L75.9,9.2 C63.7-3.1,43.7-3.1,31.5,9.2L9.2,31.4c-12.3,12.3-12.3,32.2,0,44.5L109.3,176L9.2,276.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L176,242.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L242.7,176z"
              />
            </Svg>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

function MainScreen() {
  const windowHeight = useWindowDimensions().height;
  const [adsShow, setAdsShow] = useState(false);
  const [consentOpen, setConsentOpen] = useState(true);
  const [gameOpen, setGameOpen] = useState(false);
  const [rewardedOpen, setRewardedOpen] = useState(false);

  const refBg = useRef(null);
  const opacity = useState(new Animated.Value(0))[0];

  function initialFadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    initialFadeIn();
    checkConsent();
    setTimeout(function () {
      askForPermission();
    }, 1000);
  }, []);

  async function askForPermission() {
    const { granted } = await getPermissionsAsync();
    if (granted) {
      personalisedAds = true;
      setAdsShow(true);
    } else {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        personalisedAds = true;
        setAdsShow(true);
      } else {
        setAdsShow(true);
      }
    }
  }

  async function checkConsent() {
    consentStatus = await AsyncStorage.getItem("consentStatus");
    if (consentStatus == undefined || consentStatus == null) {
      consentStatus = true;
      setConsentOpen(consentStatus);
    } else {
      fadeOut();
      setTimeout(function () {
        consentStatus = false;
        setConsentOpen(consentStatus);
        fadeIn();
      }, 150);
    }
  }

  const openLanding = async (value) => {
    var consentVal = value.toString();
    await AsyncStorage.removeItem("consentStatus");
    await AsyncStorage.setItem("consentStatus", consentVal);
    fadeOut();
    setTimeout(function () {
      setConsentOpen(value);
      fadeIn();
    }, 150);
  };

  const openGame = (value) => {
    fadeOut();
    setTimeout(function () {
      setGameOpen(value);
      fadeIn();
    }, 150);
  };

  const openRewardedModul = (value) => {
    if (value == true) {
      refBg.current.stop();
    }
    fadeOut();
    setTimeout(function () {
      setRewardedOpen(value);
      fadeIn();
    }, 150);
  };

  return (
    <SafeAreaView
      style={[styles.container, { minHeight: Math.round(windowHeight) }]}
    >
      <StatusBar hidden />

      {rewardedOpen || consentOpen ? <RewardedBG /> : null}
      {rewardedOpen ? (
        <Animated.View style={{ opacity, flex: 1 }}>
          <RewardedScreen rewardedCallback={openRewardedModul} />
        </Animated.View>
      ) : null}

      {!rewardedOpen && !consentOpen ? <MainBG ref={refBg} /> : null}
      {!rewardedOpen && consentOpen ? (
        <Animated.View style={{ opacity, flex: 1 }}>
          <ConsentScreen consentCallback={openLanding} />
        </Animated.View>
      ) : null}
      {!rewardedOpen && !gameOpen && !consentOpen ? (
        <Animated.View style={{ opacity, flex: 1 }}>
          <LandingScreen gameCallback={openGame} />
        </Animated.View>
      ) : null}
      {!rewardedOpen && gameOpen ? (
        <Animated.View style={{ opacity, flex: 1 }}>
          <GameScreen
            gameCallback={openGame}
            rewardedCallback={openRewardedModul}
          />
        </Animated.View>
      ) : null}

      <View style={styles.ads}>
        {adsShow && !rewardedOpen && !consentOpen ? (
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID={
              Platform.OS === "ios" ? admob_ios.banner : admob_android.banner
            } /* Live ads = true, 1. iOS, 2. Android */
            servePersonalizedAds={personalisedAds}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export default MainScreen;
