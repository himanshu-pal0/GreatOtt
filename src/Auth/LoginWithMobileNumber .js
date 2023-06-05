import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import external from '../Style';
import {API_BASE_URL, sendOTP} from '../Networking/BaseUrl';

const LoginWithMobileNumber = props => {
  // const toast = useToast();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [country_Code, setCountry_Code] = useState('IN');

  const Getotpval = () => {
    if (value === '' || value === undefined || value === null) {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Mobile Number',
      });
    } else {
      getOtp();
    }
  };

  const getOtp = () => {
    console.log('value', value);
    var url = API_BASE_URL + sendOTP;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({mobile: value}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.status === 'success') {
          console.log('res,res', res, value);
          console.log('afgsdfgsdfghsdfg');
          props.navigation.navigate('EnterOtp', {mobile: value});
        } else {
          console.log('ddhjgdfhgdfhgdhghghgh');
          Toast.show({
            type: 'error',
            text1: err.MASSAGE,
          });
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient style={{flex: 1}} colors={['#5f4acb', '#ea2e3d']}>
        <Toast style={{zIndex: -1}} ref1={ref1 => Toast.setRef(ref1)} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name="chevron-back"
            size={35}
            onPress={() => props.navigation.navigate('Homee')}
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
              fontSize: 20,
              marginVertical: 15,
            }}>
            Login with mobile number
          </Text>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <PhoneInput
              defaultValue={value}
              defaultCode={country_Code}
              layout="second"
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              textContainerStyle={{
                backgroundColor: '#262f39',
                shadowColor: '#000',
                elevation: 10,
                shadowOpacity: 1,
                shadowRadius: 30,
                borderColor: '#262f39',
                borderWidth: 1,
                paddingVertical: 0,
              }}
              containerStyle={{
                width: '100%',
                backgroundColor: '#262f39',
                elevation: 10,
                shadowOpacity: 1,
                shadowRadius: 30,
                height: 50,
              }}
              codeTextStyle={{
                color: '#fff',
              }}
              textInputStyle={{
                color: '#fff',
              }}
              placeholder="Enter mobile number"
              textInputProps={{placeholderTextColor: '#fff'}}
              flagButtonStyle={{width: '25%'}}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>

          <TouchableOpacity onPress={() => Getotpval()}>
            <View
              style={{
                backgroundColor: '#01a7db',
                margin: '6%',
                paddingVertical: 12,
                borderRadius: 6,
              }}>
              <Text style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                Next
              </Text>
            </View>
          </TouchableOpacity>     
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginWithMobileNumber;
