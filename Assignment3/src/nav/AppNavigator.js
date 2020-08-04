import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../screens/Splash';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import UserSignup from '../screens/UserSignup';
import UserSignin from '../screens/UserSignin';
import DashBoard from '../pages/DashBoard';
import RegisterMovies from '../pages/RegisterMovies';
import UpdateMovies from '../pages/UpdateMovies';
import ViewAllMovies from '../pages/ViewAllMovies';
import DeleteMovies from '../pages/DeleteMovies';
import Asignin from '../screens/Asignin';
import Dropdown from '../pages/components/Dropdown';

const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    Signin: {
        screen: Signin,
    },
    UserSignin: {
        screen: UserSignin,
    },
    Signup: {
        screen: Signup,
    },
    UserSignup: {
       screen: UserSignup,
    },
    UserSignin: {
        screen: UserSignin,
    },
    Asignin: {
      screen: Asignin,
    },
    DashBoard: {
        screen: DashBoard,
        navigationOptions: {
          title: 'DashBoard',
          headerStyle: { backgroundColor: 'green' },
          headerTintColor: 'white',
        },
      },
      ViewAll: {
        screen: ViewAllMovies,
        navigationOptions: {
          headerRight: () => <Dropdown/>,
          title: 'View All Movies',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#ffffff',
        },
      },
      Update: {
        screen: UpdateMovies,
        navigationOptions: {
          title: 'Update Movies',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#ffffff',
        },
      },
      Register: {
        screen: RegisterMovies,
        navigationOptions: {
          title: 'Register Movies',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#ffffff',
        },
      },
      Delete: {
        screen: DeleteMovies,
        navigationOptions: {
          title: 'Delete Movies',
          headerStyle: { backgroundColor: 'blue' },
          headerTintColor: '#ffffff',
        },
      },
});

export default createAppContainer(AppNavigator);