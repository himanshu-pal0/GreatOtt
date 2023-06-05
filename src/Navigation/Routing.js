import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, StatusBar, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import { AuthNavigation, CombineNavigation, TabNavigation } from './Navigation';
// Appointment tabs 


//Splash Screen
class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../Assests/logo.png')}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'contain',
            justifyContent: 'center',
          }}
        />
        <Toast />
      </View>
    );
  }
  _loadData = async () => {
    try {
      // const isloggedin = await AsyncStorage.getItem(LoggedIn);
      // console.log("IsLoggeed", "is-->" + isloggedin);

      setTimeout(() => {
        this.props.navigation.navigate('Splash');
      }, 3000);
    } catch (error) {
      console.log('Error in Splash Screen' + error);
    }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  },
});

//this is Container for Swith Screen By Respective Screen

// export const popToTop = StackActions.popToTop();

export default routing = () => {


  return <NavigationContainer>
    <CombineNavigation />
  </NavigationContainer>

}

