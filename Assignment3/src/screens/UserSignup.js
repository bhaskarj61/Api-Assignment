import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import { UserSignupSchema } from '../database/UserSignupSchema';
const Realm = require('realm');

const UserSignup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = () => {
    try {
      if (name == '' || email == '' || password == '')
        alert('Please fill the details')
      else {

        Realm.open({ schema: [UserSignupSchema] })
          .then(realm => {
            realm.write(() => {
              realm.create('User', {
                name: name,
                email: email,
                password: password,
              });
            });
          })
          .catch(error => {
            console.log(error);
          });
        Alert.alert('Details Stores Sucessfully');

      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screen}>Sign Up</Text>

      <TextInput placeholder='name' style={styles.textField}
        onChangeText={name => setName(name)} />

      <TextInput placeholder='email' style={styles.textField}
        onChangeText={email => setEmail(email)} />

      <TextInput placeholder='password' style={styles.textField}
        onChangeText={password => setPassword(password)} />

      <TouchableOpacity style={styles.pressBtn} onPress={createAccount}>
        <Text>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pressBtn} onPress={() =>
        navigation.navigate('UserSignin')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#564366',
  },
  textField: {
    width: '80%',
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 30,
  },
  pressBtn: {
    width: "60%",
    backgroundColor: "red",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  screen: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 50,
    marginRight: '50%',
  },
});

export default UserSignup;