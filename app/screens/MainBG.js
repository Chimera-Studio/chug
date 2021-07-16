import React, { Component, PureComponent } from "react";
import { StyleSheet, Platform, Text, View, Dimensions } from "react-native";
import colors from "../config/colors";
import Foam from "../assets/img/foam.svg";

/*
const bubbleFPS = 1000 / 60;
const ANGE_RANGE = 0;
const HALF_ANGLE_RANGE = 0;
const HALF_PI = Math.PI / 2;
const ANGLE_SEED = 100;
const ANGLE_DIVISOR = 10000;
const INCREMENT_LOWER = 2;
const INCREMENT_UPPER = 4;
const FLAKE_SIZE_LOWER = 10;
const FLAKE_SIZE_UPPER = 20;

export function getRandom(lower, upper) {
	const min = Math.min(lower, upper);
	const max = Math.max(lower, upper);
	return getRandomFloat(max - min) + min;
}

export function getRandomFloat(upper) {
	return Math.random() * upper;
}

export function getRandomInt(upper) {
	return Math.floor(Math.random() * (upper - 1 + 1)) + 1;
}

export class AnimatedSnow extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
		};
	}

	render() {
		const snow = [];
		if (this.state.width > 0 && this.state.height > 0) {
			for (let i = 0; i < 40; i++) {
				snow.push(
					<Snow
						key={i}
						width={this.state.width}
						height={this.state.height}
					/>
				);
			}
		}

		return (
			<View
				{...this.props}
				onLayout={(e) => {
					const { width, height } = e.nativeEvent.layout;
					this.setState({
						width: width,
						height: height,
					});
				}}
			>
				{snow}
			</View>
		);
	}
}

export class Snow extends Component {
	constructor(props) {
		super(props);

		this.x = getRandomInt(this.props.width);
		this.y = getRandomInt(this.props.height);

		this.angle =
			(getRandomFloat(ANGLE_SEED) / ANGLE_SEED) * ANGE_RANGE +
			HALF_PI -
			HALF_ANGLE_RANGE;
		this.increment = getRandom(INCREMENT_LOWER, INCREMENT_UPPER);
		this.flakeSize = getRandom(FLAKE_SIZE_LOWER, FLAKE_SIZE_UPPER);
		this.opacity = Math.random();
	}

	componentDidMount() {
		this.updateInterval = setInterval(() => {
			this.move(this.props.width, this.props.height);
			this.forceUpdate();
		}, bubbleFPS);
	}

	componentWillUnmount() {
		clearInterval(this.updateInterval);
	}

	move(width, height) {
		const x = this.x + this.increment * Math.cos(this.angle);
		const y = this.y + this.increment * Math.sin(this.angle);

		this.angle += getRandom(-ANGLE_SEED, ANGLE_SEED) / ANGLE_DIVISOR;

		this.x = x;
		this.y = y;

		if (!this.isInside(width, height)) {
			this.reset(width);
		}
	}

	isInside(width, height) {
		const x = this.x;
		const y = this.y;
		const flakeSize = this.flakeSize;
		return (
			x >= -flakeSize - 1 &&
			x + flakeSize <= width &&
			y >= -flakeSize - 1 &&
			y - flakeSize < height
		);
	}

	reset(width) {
		const x = getRandomInt(width);
		const y = -this.flakeSize - 1;
		const angle =
			(getRandomFloat(ANGLE_SEED) / ANGLE_SEED) * ANGE_RANGE +
			HALF_PI -
			HALF_ANGLE_RANGE;

		this.x = x;
		this.y = y;
		this.angle = angle;
	}

	getPosition() {
		return {
			top: this.y,
			left: this.x,
			width: this.flakeSize,
			height: this.flakeSize,
			borderRadius: this.flakeSize / 2,
			opacity: this.opacity,
		};
	}

	render() {
		const snowShape = this.getPosition();

		return <View {...this.props} style={[styles.snow, snowShape]} />;
	}
}

<AnimatedSnow style={styles.snowContainer} />
*/

var deviceWidth = Math.round(Dimensions.get("screen").width);
var deviceHeight = Math.round(Dimensions.get("screen").height);
function MainBG() {
	return (
		<View style={styles.backgroundWrapper}>
			<Foam style={styles.foam} />
		</View>
	);
}

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
		zIndex: 1,
	},
	snow: {
		backgroundColor: "#FFFFFF",
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	snowContainer: {
		position: "absolute",
		top: 0,
		width: "100%",
		height: "100%",
	},
});

export default MainBG;
