import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Dimensions, Platform, Button, Linking  } from 'react-native'
import React, { Component, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView,{PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps'
import * as Permissions from 'expo-permissions';


export default function Map({navigation}) { 
    const [thisLatitude, setLatitude] = useState(0)
    const [thisLongitude, setLongitude] = useState(0)
    //const [status, setStatus] = useState(null)
    //const [errorMsg, setErrorMessage] = useState(null)

    // requestLocationPermission = async () => {
    //     if (Platform.OS === 'ios'){
    //         var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    //         console.log('Iphone' + response)
    //     }
    //     if (response === 'granted'){
    //         locateCurrentPos();
    //     } 
    // }

    const componentWillMount = () => {
        requestLocationPermission()
    }
    async function requestLocationPermission() {  
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION)
    
        if (status === 'granted'){
            return locateCurrentPos()
        }
        else{
            throw new Error('Location permission not granted')
        }    

    }

    const locateCurrentPos = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log("Check this statement")
                //console.log(JSON.stringify(position))
                
                const newLatitude = position.coords.latitude
                const newLongitude = position.coords.longitude
                console.log(thisLatitude)
                setLatitude(newLatitude)
                setLongitude(newLongitude)
             
            }   
        )
    }




    return(
    
        <View style={styles.container}>
            <Text>You clicked {thisLatitude} times.</Text>
            <View>{componentWillMount()}</View>
            
				
            <MapView 
            provider = {PROVIDER_GOOGLE} 
            //ref = {map=> _map = map}
            showsUserLocation = {true}
            style = {styles.mapStyle}
            region = {{
                latitude: thisLatitude,
                longitude: thisLongitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035
            }}>
                <Marker
                coordinate  = {{latitude: 49.278094, longitude: -122.919883}}
                title = {'Meal Movers Home Base'}>

                <Callout>
                    <Image 
                    style = {styles.logo}
                    source = {require('./Images/UIHere.png')}
                    />
                    <Text>Meal Movers Home Base</Text>
                </Callout>

                </Marker>
            </MapView>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width : 100,
        height : 100
    },
    mapStyle: {
        width: '100%',
        height: '80 %'
      },

  });
