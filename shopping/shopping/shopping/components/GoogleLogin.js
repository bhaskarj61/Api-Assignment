import React from "react";
import { StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from "@react-native-community/google-signin";
import auth from '@react-native-firebase/auth';

class GoogleLogin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: [],
			signedIn: false,
		};
	}

	componentDidMount() {
		GoogleSignin.configure({
			scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
			webClientId:
				'370592732481-uum050koeal68jdoumsvc0d040vkjhne.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
			offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		});

		auth().onAuthStateChanged(user => {
			this.setState({userInfo: user});
			if (user) {
				this.setState({ signedIn: true });

				this.props.onSignIn({
					signInMethod: "GOOGLE",
					avatarSource: "",
					name: user.displayName,
					email: user.email,
				});
			}
		});
	}

	async signIn() {
		try {
			await GoogleSignin.hasPlayServices();
			const { accessToken, idToken } = await GoogleSignin.signIn();
			const credential = auth.GoogleAuthProvider.credential(
				idToken,
				accessToken,
			);
			await auth().signInWithCredential(credential);
			// Logged in
			this.setState({signedIn: true});
		}
		catch (error) {
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
				console.log("Google signin cancelled");
			}
			else if (error.code === statusCodes.IN_PROGRESS) {
				console.log("Google signin in progress");
				// operation (f.e. sign in) is in progress already
			}
			else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				console.log("PLAY_SERVICES_NOT_AVAILABLE");
				// play services not available or outdated
			}
			else {
				// some other error happened
				console.log("Google signin unknown error:", error);
				Alert.alert("Error", "Failed to sign-in using Google");
			}
		}
	}

	async signOut() {
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			auth()
				.signOut()
				.then(() => console.log('Your are signed out!'));
			// Logged out
			this.setState({userInfo: [], signedIn: false});
		}
		catch (error) {
			console.error("Google signout unknown error:", error);
		}
	};

	render() {
		if (this.state.signedIn) this.signOut();

		return (
			<TouchableOpacity
				onPress={() => {this.state.signedIn ? this.signOut() : this.signIn()}}
				style={styles.container}
			>
				<Image source={require("../assets/img/google.png")} style={styles.icon} />
			</TouchableOpacity>
		);
	}
}

export default GoogleLogin;

const styles = StyleSheet.create({
	container: {
		height: 40,
		width: 40,
		borderRadius: 40,
		borderWidth: 0.5,
		borderColor: "rgba(155, 0, 248, .4)",
		backgroundColor: "rgba(155, 0, 248, .1)",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		height: 30,
		width: 30,
		resizeMode: "contain",
	},
});