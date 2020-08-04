import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text,  TouchableOpacity} from 'react-native';
import { UserSignupSchema } from '../database/UserSignupSchema';
import Realm from 'realm';
let realm;

 const UserSignin = ({navigation})=>{
 const[useremail,setUserEmail]= useState('');
 const[userpassword,setUserPassword]= useState('');

 const signIn= () => {
  realm = new Realm({ path: UserSignupSchema.realm})

 var Admin = realm.objects('User');
  
  if(Admin.email === useremail && Admin.password === userpassword)
 {
   navigation.navigate('viewAll');
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

    <TouchableOpacity style={styles.pressBtn}onPress={signIn}>
      <Text>SignIn</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.pressBtn} 
    onPress={()=> navigation.navigate('UserSignup')}>
      <Text>Signup</Text>
    </TouchableOpacity>
    </View>
    );
  }

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

export default UserSignin;