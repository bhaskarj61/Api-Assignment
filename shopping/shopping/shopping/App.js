import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
	StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthenticationScreen from "./screens/AuthenticationScreen";
import DrawerScreen from "./screens/DrawerScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";

import realmConnect from "./realm";
import bind from "./redux/bind";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import { signIn } from "./helpers/authentication";

const store = createStore(reducer);

const Stack = createStackNavigator();

/*
* Using this component allows us to check if the user has already logged-in, if he has then we hide the
* authentication screens, so when he presses back button from Dashboard, the app exits instead of taking him
* back to the authentication screens
* */
class Screens extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			realm: null,
		}
	}

	componentDidMount() {
		const {
			authenticateUser,
			updateCart,
			updatePromo
		} = this.props;

		try {
			realmConnect(realm => {
				realm.write(() => {
					let userCheck = realm.objects("User").filtered(`isSignedIn = true`);
					if (userCheck.length) {
						const user = userCheck[0];
						signIn({
							email: user.email,
							password: user.password,
						}, authenticateUser, updateCart, updatePromo, this.props.navigation);
					}

					/*
					* If promotion codes haven't been inserted yet to the database yet, then do them now
					* */
					let findPromoHALF = realm.objects("Promo").filtered(`code = "HALF"`);
					let findPromoQUARTER = realm.objects("Promo").filtered(`code = "QUARTER"`);
					if (!findPromoHALF.length) {
						realm.create("Promo", {
							code: "HALF",
							discount: 50,
						});
					}
					if (!findPromoQUARTER.length) {
						realm.create("Promo", {
							code: "QUARTER",
							discount: 25,
						});
					}
				});
				this.setState({realm});
			});
		}
		catch (e) {
			console.log("Error while checking existing logged-in account:", e);
		}
	}

	render() {
		const {email} = this.props.user;

		return (
			<SafeAreaProvider>
				<StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
				<NavigationContainer>
					<Stack.Navigator
						initialRouteName={email ? "Drawer" : "Authentication"}
						screenOptions={{
							headerShown: false,
						}}
					>
						{
							!email &&
							<Stack.Screen name="Authentication" component={AuthenticationScreen}/>
						}
						<Stack.Screen name="Drawer" component={DrawerScreen}/>
						<Stack.Screen name="Profile" component={ProfileScreen}/>
						<Stack.Screen name="Product" component={ProductScreen}/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		);
	}
}

Screens = bind(Screens);

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<Screens />
			</Provider>
		);
	}
}

export default App;