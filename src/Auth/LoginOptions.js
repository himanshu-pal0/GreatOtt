import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginOptions = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#18202c'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
          onPress={()=> props.navigation.goBack()}
            name="chevron-back"
            size={35}
            style={{
              color: '#fff',
              position: 'absolute',
              left: 10,
              top: 35,
            }}></Ionicons>
          <Image
            source={require('../Assests/logo.png')}
            style={{width: 190, height: 190, resizeMode: 'contain'}}></Image>
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: '#2f3943',
            alignSelf: 'center',
            borderRadius: 15,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#fff',
              fontSize: 25,
              marginVertical: 15,
            }}>
            Welcome to Great OTT
          </Text>
          <View style={{marginVertical: 20}}>
            <View
              style={{
                backgroundColor: '#37a7db',
                marginHorizontal: '6%',
                paddingVertical: 12,
                borderRadius: 6,
              }}>
              <Text
                onPress={() =>
                  props.navigation.navigate('LoginWithMobileNumber')
                }
                style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                Login with mobile number
              </Text>
            </View>
            <View
              style={{
                borderColor: '#fff',
                borderWidth: 2,
                marginHorizontal: '6%',
                marginTop: 20,
                paddingVertical: 10,
                borderRadius: 6,
              }}>
              <Text
                onPress={() => props.navigation.navigate('SignUp')}
                style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                Sign Up
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '6%',
              marginVertical: 20,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#5f6264'}} />
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#5f6264',
                  marginHorizontal: 8,
                }}>
                Or login with
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#5f6264'}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
              marginTop: 60,
            }}>
            <View
              style={{
                backgroundColor: '#3ca2c2',
                marginHorizontal: 10,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 5,
              }}>
              <Ionicons  onPress={() => props.navigation.navigate('Login')}F
                name="mail"
                style={{color: '#fff'}}
                size={35}></Ionicons>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginOptions;
