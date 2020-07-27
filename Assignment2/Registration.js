import React, { Component } from 'react';
import { StyleSheet, Text,  View,  TextInput, TouchableHighlight,  TouchableOpacity, AsyncStorage} from 'react-native';

class Registration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email   : '',
      password: '',
    }
  }

   saveData(){

     let obj={
      username: 'pradeep',
      email: 'pradeep@gmail.com',
      password: 'admin',
    }
      AsyncStorage.setItem('user',JSON.stringify(obj));
      alert('sucessfully loged in')
  }

  render() {
    return (
      <View style={styles.container}>

      <View Style={styles.header}>
        </View>
      <View style={styles.inputContainer}>
               
          <TextInput style={styles.inputs}
              placeholder="username"
              onChangeText={(username) => this.setState({username})}
             value= {this.state.username}/>
        </View>
        
        <View style={styles.inputContainer}>
               
          <TextInput style={styles.inputs}
              placeholder="email"
              onChangeText={(email) => this.setState({email})}
             value= {this.state.email}/>
        </View>
        
        <View style={styles.inputContainer}>
         
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
            value= {this.state.password}/>
        </View>

        
        <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.onClickListener('register')}>
            <TouchableOpacity onPress={this.register}>
              <Text>Register</Text>
            </TouchableOpacity>
          </TouchableHighlight>
      </View>
    );
  }
  
  register = () => {
     this.props.navigation.navigate('Login')
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  inputContainer: {
      borderBottomColor: 'white',
      backgroundColor: 'white',
      borderRadius:30,
      borderBottomWidth: 2,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:35,
      marginLeft:5,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  header: {
    flex:0.5,
    justifyContent:'flex-end',
  },
  loginButton: {
    backgroundColor: 'green',
  },
  
});

export default Registration;