import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Splash from './Splash';
import Login from './Login';
import Dashboard from './Dashboard';
import Registration from './Registration';

const App = createStackNavigator(
  {
    Splash: Splash,
    Login: Login,
    Registration:Registration,
    Dashboard: Dashboard,
  }
);
export default createAppContainer(App);
//*const AuthStack = createStackNavigator({ Login: Login });

