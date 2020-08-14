/*
* This component is used to render the products in the `Dashboard` page when `Grid` view is active
* */

import React from "react";
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
} from "react-native";

import AppText from "./AppText";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";

export default class ProductItemGrid extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			navigation,
			style,
			data,
		} = this.props;

		const {
			id,
			name,
			description,
			price,
			discount,
			thumbnail_image,
		} = data;

		return (
             <TouchableOpacity
	             activeOpacity={0.8}
	             style={[styles.container, style]}
	             onPress={() => navigation.push("Product", {id})}
             >
	             <View style={styles.imageContainer}>
		             <Image
			             source={{uri: thumbnail_image}}
			             style={styles.image}
			             resizeMode="contain"
		             />
	             </View>
	             <AppText style={styles.name}>{name}</AppText>
	             <AppText style={styles.description}>{description}</AppText>
	             <View style={styles.footer}>
		             <View style={styles.footerInfo}>
			             <AppText style={styles.footerLabel}>Price</AppText>
			             <AppText style={styles.footerText}>₹{price}</AppText>
		             </View>
		             <View style={[styles.footerInfo, styles.discountContainer]}>
			             <AppText style={styles.footerText}>{discount}%</AppText>
			             <AppText style={styles.footerLabel}>Off</AppText>
		             </View>
	             </View>
             </TouchableOpacity>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "stretch",
		paddingTop: 20,
		paddingHorizontal: 10,
		paddingBottom: 10,
		borderRadius: 13 * Layout.ratio,
		backgroundColor: Theme.bright,
		elevation: 4,
	},
	imageContainer: {
		marginHorizontal: 10,
		marginBottom: 16 * Layout.ratio,
	},
	image: {
		height: 200 * Layout.ratio,
		width: "100%",
	},
	name: {
		fontSize: FontSize[14],
		fontWeight: "bold",
		color: Theme.text,
		marginBottom: 6 * Layout.ratio,
	},
	description: {
		alignSelf: "stretch",
		fontSize: FontSize[10],
		color: Theme.dim,
		marginBottom: 10 * Layout.ratio,
	},
	footer: {
		flexDirection: "row",
	},
	footerInfo: {
		alignItems: "flex-start",
	},
	footerLabel: {
		fontSize: FontSize[10],
		fontWeight: "bold",
		color: Theme.dim,
	},
	footerText: {
		fontSize: FontSize[20],
		fontWeight: "bold",
		color: Theme.text,
	},
	discountContainer: {
		marginLeft: "auto",
	},
});