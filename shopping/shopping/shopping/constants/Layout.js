import { Dimensions } from "react-native";
import { StatusBar } from 'react-native';

const ratio = 1; // All the lengths across the app is multiplies by this ratio, so that if at any point the
				// the size needs to be a big bigger or smaller, it can be easily managed from here
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
	ratio,
	window: {
		width,
		height,
	},
	statusBarHeight: StatusBar.currentHeight,
};
