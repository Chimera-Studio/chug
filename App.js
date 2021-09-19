import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import MainScreen from "./app/screens/MainScreen";

function App() {
  let [fontsLoaded] = useFonts({
    PrimaryFont: require("./app/assets/fonts/LondrinaSolid_Hrv.otf"),
    SecondaryFont: require("./app/assets/fonts/RobotoBlack.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <MainScreen />;
  }
}

export default App;
