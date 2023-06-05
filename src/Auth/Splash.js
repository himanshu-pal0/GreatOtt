import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import external from '../Style';

const Splash = props => {
  setTimeout(() => {
    props.navigation.navigate('Homee');
  }, 3000);

  return (
    // <SafeAreaView style={{flex:1,backgroundColor:'red'}}>
    <LinearGradient
      colors={['#5f4acb', '#ea2e3d']}
      style={external.splashlogo}>
      <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={require('../Assests/logo.png')} />
    </LinearGradient>
    // </SafeAreaView>
  );
};
export default Splash;
