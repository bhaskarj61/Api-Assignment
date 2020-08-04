import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text,  TouchableOpacity} from 'react-native';
import AdminSignupSchema from '../database/AdminSignupSchema';
import Realm from 'realm';
let realm;

const Signin = ({navigation})=>
{
  const[useremail,setUserEmail]= useState('');
  const[userpassword,setUserPassword]= useState('');

 const signIn= () => {
  realm = new Realm({ path: 'UserDatabase.realm' })

  var Admin = realm.objects('User_Info');
  var A = JSON.stringify(Admin);
  if(A.email === useremail && A.password === userpassword)
 {
    navigation.navigate('Dashboard');
 }
 else{
    alert('email or password is incorrect');
}  
  
  console.log('Get Admin Done');
  }

  return(
    <View style={styles.container}>
      <Text style={styles.screen}>Sign In</Text>

    <TextInput placeholder='Email' style={styles.textField}
    onChangeText={useremail => setUserEmail(useremail)}/>

    <TextInput placeholder='Password' style={styles.textField}
    onChangeText={userpassword=> setUserPassword(userpassword) }/>

    <TouchableOpacity style={styles.pressBtn} onPress={signIn}>
      <Text>SignIn</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.pressBtn} 
    onPress={()=> navigation.navigate('UserSignup')}>
      <Text>Signup</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.pressBtn} 
    onPress={()=> navigation.navigate('Signup')}>
      <Text>Signup Admin</Text>
    </TouchableOpacity>
    </View>
    );
};

 const styles = StyleSheet.create({

  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'black',
  },
  textField:{
    width:'90%',
    backgroundColor:"white",
    padding:10,
    marginBottom:20,
    borderRadius:30,
  },
  pressBtn:{
    backgroundColor:"red",
    width:'70%',
    fontWeight:'bold',
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    height:55,

  },
  screen:{
    color:'white',
    fontSize:38,
    fontWeight:'bold',
    marginBottom:50,
    marginRight:'50%',

  },
});

export default Signin;