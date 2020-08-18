import React, { Component, useState } from 'react';
import { KeyboardAvoidingView, Image, StyleSheet, View, TextInput, TouchableOpacity, Text, Navigitor} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';


export default function SignUp({navigation}){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    // const [errorMessage, setErrorMessage] = useState()

    const createUser = ({navigation}) => {
        if(password == confirmPassword) {
            saveInfo()
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    checkUser()
                    navigation.navigate('Login')
                })
            
            
        }
        else {
            console.log("Passwords don't match!")
        }
    }



    const checkUser = () => {
        var user = firebase.auth().currentUser
        user.updateProfile({
            displayName: name
        }).then(function() {
            user.sendEmailVerification()
        }).catch(function(error) {
            // An error happened.
        });
    }
    
    const saveInfo = () => {
        firebase.database().ref('users/' + name).set({
            username: name,
            userEmail: email,
            userAddress: address,
            userPhoneNum: phonenumber,
            userPassword: password
        });
    }

    return (
        <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        extraHeight = {20}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        >
            <View style = {styles.logoContainer}>
                <Image
                 style = {styles.logo}
                 source = {require('./Images/UIHere.png')}/>
                 <Text style = {styles.title}> Meal Movers</Text>
            </View>
            <View style = {styles.formContainer}>
              <View style={styles.signUpContainer}>
                    
                        
                    <TextInput
                        placeholder = "Name of Organization"
                        returnKeyType = "next"
                        onSubmitEditing = {()=> {secondTextInput.focus();}}
                        keyboardType = "email-address"
                        onChangeText = {text => setName(text)}
                        style = {styles.input}
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        />
                   
                    
                    <TextInput
                        placeholder = "E-mail"
                        returnKeyType = "next"
                        ref={(input) => {secondTextInput = input;}}
                        onSubmitEditing = {()=> thirdTextInput.focus()}
                        onChangeText = {text => setEmail(text)}
                        keyboardType = "email-address"
                        style = {styles.input}
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        />
               
                    
                    <TextInput
                        placeholder = "Phone number"
                        returnKeyType = "next"
                        ref={(input) => {thirdTextInput = input;}}
                        onSubmitEditing = {()=> fourthTextInput.focus()}
                        onChangeText = {text => setPhonenumber(text)}
                        keyboardType = "email-address"
                        style = {styles.input}
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        />
 
                    <TextInput
                        placeholder = "Address"
                        returnKeyType = "next"
                        ref={(input) => {fourthTextInput = input;}}
                        onSubmitEditing = {()=> fifthTextInput.focus()}
                        onChangeText = {text => setAddress(text)}
                        style = {styles.input}
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        />
                  
                    <TextInput
                        placeholder = "Password"
                        returnKeyType = "next"
                        ref={(input) => {fifthTextInput = input;}}
                        secureTextEntry
                        onSubmitEditing = {()=> sixthTextInput.focus()}
                        onChangeText = {text => setPassword(text)}
                        style = {styles.input}
                        
                    /> 

                    <TextInput
                        placeholder = "Confirm Password"
                        returnKeyType = "go"
                        ref={(input) => {sixthTextInput = input;}}
                        secureTextEntry
                        style = {styles.input}
                        onChangeText = {text => setConfirmPassword(text)}
                    />   
                    
                    <TouchableOpacity style = {styles.buttonContainer} onPress={() => createUser({navigation})}>
                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
    
                    <View style = {styles.signUpBox}>
                    <Text style = {styles.signUps}> Already have an account? </Text>
                    <TouchableOpacity onPress={()=> {navigation.navigate('Login')}}><Text> Log In</Text>
                    </TouchableOpacity>
                    </View>
                            
                </View>
            </View>
            
        </KeyboardAwareScrollView>
    );   
}
const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : '#C5C5C5' 
        
    },
    logoContainer:{
        alignItems : 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width : 100,
        height : 100
    },
    formContainer:{
        flexGrow: 0.5
    },
    title:{
        color: '#000',
        marginTop: 10,
        width: 190,
        textAlign : "center",
        opacity : 0.6
    },
    signUpContainer: {
        padding: 40
    },
    signUpBox: {
        alignItems:"flex-end",
        justifyContent:"center",
        flexDirection: 'row'
    },
    input:{
        height: 40,
        backgroundColor: '#CEFC9F',
        marginBottom : 20,
        padding: 10
    },
    buttonContainer:{
        backgroundColor: '#75BB09',
        paddingVertical: 15
    },
    buttonText:{
        textAlign: 'center',
        fontWeight: '900'  
    },
    signUps:{
        color: 'rgba(0,0,0, 0.7)',
        fontSize: 16
    },
    signUpsBtn:{
      color: '#000000',
      fontSize: 16,
      fontWeight: "500"
    },
    
    inputNameText:{
        textAlign: 'center',    
    },
})