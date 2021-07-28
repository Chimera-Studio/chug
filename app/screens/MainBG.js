import React, {
	useState,
	forwardRef,
	useImperativeHandle,
	useEffect,
} from "react";
import { StyleSheet, Platform, View, Dimensions } from "react-native";
import colors from "../config/colors";
import Foam from "../assets/img/foam.svg";

var bubbleFPS;
var bubbles30 = [];
var bubbles50 = [];
var bubbles30posY;
var bubbles50posY;

const bubblesOnScreen = 30;
const maxBubbleWidth = 40;
const minBubbleWidth = 20;
const maxBubbleSpeed = 1.5;
const minBubbleSpeed = 0.5;

var deviceHeight = Math.round(Dimensions.get("screen").height);
var deviceWidth = Math.round(Dimensions.get("screen").width);
const MainBG = forwardRef((props, ref) => {
	const [bubblesReady, setBubblesReady] = useState(false);
	const [bubbles30Y, setBubbles30Y] = useState();
	const [bubbles50Y, setBubbles50Y] = useState();

	function initBubbles() {
		bubbles30 = [];
		bubbles50 = [];

		for (var i = 0; i < bubblesOnScreen / 2; i++) {
			var width30 =
				Math.floor(Math.random() * (maxBubbleWidth - minBubbleWidth)) +
				minBubbleWidth;
			var obj30 = {};
			obj30["top"] = Math.floor(Math.random() * (deviceHeight - 0)) + 0;
			obj30["left"] = Math.floor(Math.random() * (deviceWidth - 0)) + 0;
			obj30["width"] = width30;
			obj30["speed"] =
				Math.floor(Math.random() * (maxBubbleSpeed - minBubbleSpeed)) +
				minBubbleSpeed;
			bubbles30.push(obj30);

			var width50 =
				Math.floor(Math.random() * (maxBubbleWidth - minBubbleWidth)) +
				minBubbleWidth;
			var obj50 = {};
			obj50["top"] = Math.floor(Math.random() * (deviceHeight - 0)) + 0;
			obj50["left"] = Math.floor(Math.random() * (deviceWidth - 0)) + 0;
			obj50["width"] = width50;
			obj50["speed"] =
				Math.floor(Math.random() * (maxBubbleSpeed - minBubbleSpeed)) +
				minBubbleSpeed;
			bubbles50.push(obj50);
		}
		bubbles30posY = bubbles30.map(({ top }) => top);
		bubbles50posY = bubbles50.map(({ top }) => top);
		setBubbles30Y(bubbles30posY);
		setBubbles50Y(bubbles50posY);

		setBubblesReady(true);
	}

	function float() {
		for (var i = 0; i < bubbles30.length; i++) {
			var newY30 = bubbles30[i].top + bubbles30[i].speed;
			var newY50 = bubbles50[i].top + bubbles50[i].speed;
			if (newY30 >= deviceHeight) {
				bubbles30[i].top = 0;
				bubbles30[i].left =
					Math.floor(Math.random() * (deviceWidth - 0)) + 0;
				bubbles30[i].speed =
					Math.floor(
						Math.random() * (maxBubbleSpeed - minBubbleSpeed)
					) + minBubbleSpeed;
			} else if (newY50 >= deviceHeight) {
				bubbles50[i].top = 0;
				bubbles50[i].left =
					Math.floor(Math.random() * (deviceWidth - 0)) + 0;
				bubbles50[i].speed =
					Math.floor(
						Math.random() * (maxBubbleSpeed - minBubbleSpeed)
					) + minBubbleSpeed;
			} else {
				bubbles30[i].top = newY30;
				bubbles50[i].top = newY50;
			}
		}
		bubbles30posY = bubbles30.map(({ top }) => top);
		bubbles50posY = bubbles50.map(({ top }) => top);
		setBubbles30Y(bubbles30posY);
		setBubbles50Y(bubbles50posY);
	}

	const stop = () => {
		clearInterval(bubbleFPS);
	};

	useEffect(() => {
		initBubbles();
		bubbleFPS = setInterval(() => float(), 16.7);
	}, []);

	useImperativeHandle(ref, () => {
		return {
			stop: stop,
		};
	});

	return (
		<View style={styles.backgroundWrapper}>
			<Foam style={styles.foam} />

			{!bubblesReady ? null : (
				<View style={styles.bubbleWrapper}>
					{bubbles30.map((bubble30, index) => (
						<View
							key={index}
							style={[
								styles.b30,
								{
									left: bubble30.left,
									bottom: bubbles30Y[index],
									width: bubble30.width,
									borderRadius: maxBubbleWidth,
								},
							]}
						/>
					))}

					{bubbles50.map((bubble50, index) => (
						<View
							key={index}
							style={[
								styles.b50,
								{
									left: bubble50.left,
									bottom: bubbles50Y[index],
									width: bubble50.width,
									borderRadius: maxBubbleWidth,
								},
							]}
						/>
					))}
				</View>
			)}
		</View>
	);
});

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
		zIndex: 2,
	},
	bubbleWrapper: {
		width: "100%",
		height: "100%",
		flex: 1,
		zIndex: 1,
	},
	b30: {
		position: "absolute",
		aspectRatio: 1 / 1,
		backgroundColor: colors.white,
		opacity: 0.3,
	},
	b50: {
		position: "absolute",
		aspectRatio: 1 / 1,
		backgroundColor: colors.white,
		opacity: minBubbleSpeed,
	},
});

export default MainBG;
