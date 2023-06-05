import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const SignUp = props => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [firstname, setfirstname] = useState('');
  const [mobile, setmobile] = useState('');
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [country_Code, setCountry_Code] = useState('IN');

  const signup = () => {
    let url = 'https://greatott.phando.com/api/register';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        props.navigation.navigate('Home');
        console.log('res,res', res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18202c' }}>
      <LinearGradient colors={['#5f4acb', '#ea2e3d']}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              onPress={() => props.navigation.goBack()}
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
              style={{ width: 190, height: 190, resizeMode: 'contain' }}></Image>
          </View>
          <View
            style={{
              width: '90%',
              backgroundColor: '#2f3943',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <View style={{ marginVertical: 20 }}>
              <TextInput
                placeholder="Name *"
                style={{
                  backgroundColor: '#262f39',
                  marginHorizontal: '6%',
                  borderRadius: 6,
                  marginVertical: 6,
                  paddingHorizontal: 8,
                }}
                onChangeText={text => setname(text)}
                placeholderTextColor={'#fff'}></TextInput>
              <TextInput
                placeholder="Email"
                style={{
                  backgroundColor: '#262f39',
                  marginHorizontal: '6%',
                  borderRadius: 6,
                  marginVertical: 6,
                  paddingHorizontal: 8,
                }}
                onChangeText={text => setemail(text)}
                placeholderTextColor={'#fff'}></TextInput>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginHorizontal: '6%',
                  marginVertical: 6,
                  paddingHorizontal: 8,
                }}>
                <PhoneInput
                  maxLength={10}
                  defaultValue={value}
                  defaultCode={country_Code}
                  layout="second"
                  onChangeText={text => {
                    setmobile(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  textContainerStyle={{
                    backgroundColor: '#262f39',
                    shadowColor: '#000',
                    borderRadius: 6,
                    // elevation: 10,
                    // shadowOpacity: 1,
                    // shadowRadius: 30,

                    paddingVertical: 0
                  }}
                  containerStyle={{
                    backgroundColor: '#262f39',
                    borderRadius: 6,
                    // elevation: 10,
                    // shadowOpacity: 1,
                    // shadowRadius: 30,
                    height: 50,
                  }}
                  codeTextStyle={{
                    color: '#fff'
                  }}
                  textInputStyle={{
                    color: '#ffffff'
                  }}
                  textInputProps={{ placeholderTextColor: "#ffffff" }}
                  placeholder="Your Number"
                  withDarkTheme
                  withShadow
                  autoFocus
                />
              </View>
              <TextInput
                placeholder="Password *"
                style={{
                  backgroundColor: '#262f39',
                  marginHorizontal: '6%',
                  borderRadius: 6,
                  marginVertical: 6,
                  paddingHorizontal: 8,
                }}
                onChangeText={text => setpassword(text)}
                placeholderTextColor={'#fff'}></TextInput>
              <TextInput
                placeholder="Confirm Password *"
                style={{
                  backgroundColor: '#262f39',
                  marginHorizontal: '6%',
                  borderRadius: 6,
                  marginVertical: 6,
                  paddingHorizontal: 8,
                }}
                onChangeText={text => setpassword(text)}
                placeholderTextColor={'#fff'}></TextInput>
            </View>
            <View style={{ marginVertical: 20 }}>
              <View
                style={{
                  backgroundColor: '#37a7db',
                  marginHorizontal: '6%',
                  paddingVertical: 12,
                  borderRadius: 6,
                }}>
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 15 }}>
                  Sign Up
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '6%',
              marginVertical: 50,
            }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#5f6264' }} />
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
            <View style={{ flex: 1, height: 1, backgroundColor: '#5f6264' }} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
              marginTop: 30,
            }}>
            <View
              style={{
                backgroundColor: '#3ca2c2',
                marginHorizontal: 10,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 5,
              }}>
              <Ionicons
                onPress={() => props.navigation.navigate('Login')}
                name="mail"
                style={{ color: '#fff' }}
                size={35}></Ionicons>
            </View>
            <View
              style={{
                backgroundColor: '#1081a7',
                marginHorizontal: 10,
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 5,
              }}>
              <MaterialIcons
                onPress={() => props.navigation.navigate('LoginWithMobileNumber')}
                name="phone-android"
                style={{ color: '#fff' }}
                size={35}></MaterialIcons>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUp;
