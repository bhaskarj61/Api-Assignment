import React from "react";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import {
	StyleSheet,
	ScrollView,
	View,
	Image,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import AppText from "../components/AppText";
import FormField from "../components/FormField";
import FacebookLogin from "../components/FacebookLogin";
import GoogleLogin from "../components/GoogleLogin";
import Button from "../components/Button";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";

import bind from "../redux/bind";
import { signIn } from "../helpers/authentication";

const HEIGHT = 220 * Layout.ratio;
const DIMENSION = 2000;

class LoginScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	async handleSignin(info) {
		const {
			authenticateUser,
			updateCart,
			updatePromo,
		} = this.props;

		const data = {
			...this.state,
			...info,
		};

		const error = await signIn(data, authenticateUser, updateCart, updatePromo, this.props.navigation);
	}

	render() {
		return (
			<SafeAreaInsetsContext.Consumer>
				{(insets) => (
					<ScrollView style={{flex: 1, backgroundColor: Theme.bright,}}>
						<View style={styles.curvedHeaderContainer}>
							<LinearGradient
								colors={[Theme.gradient.start, Theme.gradient.end]}
								style={[styles.headerContainer, { paddingTop: insets.top, }]}
							>
								<Image source={require("../assets/img/logo.png")} style={styles.headerLogo} />
								<AppText style={styles.screenTitle}>Welcome back!</AppText>
							</LinearGradient>
						</View>
						<View style={[
							styles.formContainer,
							{
								paddingTop: HEIGHT + 26 * Layout.ratio,
								paddingBottom: insets.bottom + 20 * Layout.ratio,
							}
						]}>
							<FormField
								style={styles.formField}
								icon={
									<Image
										source={require("../assets/img/mail.png")}
										style={[styles.formFieldIcon, { width: 20 * Layout.ratio }]}
									/>
								}
								secureTextEntry={false}
								onChangeText={(text) => this.setState({ email: text })}
								value={this.state.email}
								placeholder="Email"
							/>
							<FormField
								style={styles.formField}
								icon={
									<Image
										source={require("../assets/img/password.png")}
										style={styles.formFieldIcon}
									/>
								}
								secureTextEntry={true}
								onChangeText={(text) => this.setState({ password: text })}
								value={this.state.password}
								placeholder="Password"
							/>
							<View style={styles.socialLoginRow}>
								<FacebookLogin onSignIn={data => this.handleSignin(data)}/>
								<GoogleLogin onSignIn={data => this.handleSignin(data)} />
							</View>
							<Button
								style={styles.submitButton}
								label="Login"
								onPress={() => this.handleSignin({signInMethod: "EMAIL"})}
							/>
							<View style={styles.horizontalBar} />
							<View style={styles.footerContainer}>
								<AppText style={styles.footerText}>
									Not a member yet?
								</AppText>
								<AppText
									style={styles.footerLink}
									onPress={() => {this.props.navigation.jumpTo("Signup");}}
								>
									Register here
								</AppText>
								<Image
									source={require("../assets/img/chevron.png")}
									style={styles.footerChevron}
								/>
							</View>
						</View>
					</ScrollView>
				)}
			</SafeAreaInsetsContext.Consumer>
		);
	}
}

const styles = StyleSheet.create({
	curvedHeaderContainer: {
		position: "absolute",
		alignItems: "center",
		height: DIMENSION,
		width: DIMENSION,
		borderRadius: DIMENSION / 2,
		top: -DIMENSION + HEIGHT,
		left: (Layout.window.width - DIMENSION) / 2,
		paddingTop: DIMENSION - HEIGHT,
		zIndex: 1,
		overflow: "hidden",
	},
	headerContainer: {
		height: HEIGHT,
		width: Layout.window.width,
		alignItems: "center",
	},
	headerLogo: {
		height: 70 * Layout.ratio,
		width: 70 * Layout.ratio,
		resizeMode: "contain",
		marginTop: 30 * Layout.ratio,
		marginBottom: 16 * Layout.ratio,
	},
	screenTitle: {
		fontSize: FontSize[30],
		fontWeight: "bold",
		color: Theme.bright,
	},

	formContainer: {
		flex: 1,
		alignItems: "center",
		backgroundColor: Theme.bright,
	},

	formField: {
		alignSelf: "stretch",
		marginHorizontal: 20 * Layout.ratio,
		marginBottom: 16 * Layout.ratio,
	},
	formFieldIcon: {
		width: 17 * Layout.ratio,
		resizeMode: "contain",
	},
	socialLoginRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	submitButton: {
		alignSelf: "stretch",
		marginTop: 10 * Layout.ratio,
		marginHorizontal: 20 * Layout.ratio,
		marginBottom: 16 * Layout.ratio,
	},

	horizontalBar: {
		alignSelf: "stretch",
		height: 1,
		marginHorizontal: 45 * Layout.ratio,
		marginBottom: 12 * Layout.ratio,
		backgroundColor: Theme.medium,
	},

	footerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	footerText: {
		fontSize: FontSize[10],
		color: Theme.text,
	},
	footerLink: {
		marginLeft: 4 * Layout.ratio,
		fontSize: FontSize[10],
		fontWeight: "bold",
		color: Theme.primary,
	},
	footerChevron: {
		marginTop: 2.4,
		marginLeft: 1.5,
		height: 10 * Layout.ratio,
		width: 10 * 500 / 700 * Layout.ratio,
	},
});

export default bind(LoginScreen);