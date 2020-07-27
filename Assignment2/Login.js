import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity, Button, AsyncStorage } from 'react-native';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  login = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      if(parsed.email ===this.state.email && parsed.password ===this.state.password)
      this.props.navigation.navigate('Dashboard');
      else
        alert('email or password is incorrect');
    }
    catch (eror) {
      alert(error)
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <View Style={styles.header}>
        </View>
        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email} />
        </View>

        <View style={styles.inputContainer}>

          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password} />
        </View>


        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}>
          <TouchableOpacity onPress={this.login}>
            <Text>Login</Text>
          </TouchableOpacity>
        </TouchableHighlight>
        <Button color='black'
          title="Create Account"
          onPress={() => this.props.navigation.navigate('Registration')}
        />

      </View>
    );
  }
  login = () => {
    this.props.navigation.navigate('Dashboard')
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: 'white',
    borderRadius: 30,
    borderBottomWidth: 2,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 35,
    marginLeft: 5,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },

  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  header: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  loginButton: {
    backgroundColor: 'green',
  },

});

export default Login;