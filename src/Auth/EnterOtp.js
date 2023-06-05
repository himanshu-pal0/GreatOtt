import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {API_BASE_URL, VERIFYOTP} from '../Networking/BaseUrl';
import CountDown from 'react-native-countdown-component';
import Toast from 'react-native-toast-message';
import external from '../Style';

const EnterOtp = props => {
  const [otpText, setotpText] = useState(false);
  const [otpTextTime, setotpTextTime] = useState('60');
  const [hideresend, sethideresend] = useState(true);
  const [mobile, setmobile] = useState('');
  const [code, setcode] = useState('');
  useEffect(() => {
    storeparam();
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [props.route.params]);

  const backAction = () => {
    props.navigation.replace('LoginWithMobileNumber')
     return true;
   };

  const showResentOtpText = () => {
    sethideresend(false);
    setotpText(true);
  };

  const hideText = () => {
    getOtp();
    setotpText(false);
    sethideresend(true);
    setotpTextTime('60');
  };

  const storeparam = async () => {
    if (props.route.params.mobile) {
      let mob = props.route.params.mobile;
      await AsyncStorage.setItem('MobileNumber', props.route.params.mobile);

      setmobile(mob);
      console.log('mob', mob);
    }
  };
  console.log('props.route.params', props.route.params);
  const getOtp = async () => {
    var url = API_BASE_URL + VERIFYOTP;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        mobile: mobile,
        otp: code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(async res => {
        if (res.status === 'success') {
          console.log('dghdgghdfdfggdg');
          await AsyncStorage.setItem('TOKEN', res.access_token);
          props.navigation.navigate('Homee');
        } else {
          Toast.show({
            type: 'error',
            text1: res.message,
          });
        }
        // AsyncStorage.setItem(USER_ID, String(responsejson.userId));

        console.log('res,res', res);
      })
      .catch(err => {
        console.log('err otp', err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#18202c'}}>
      <LinearGradient style={{flex: 1}} colors={['#5f4acb', '#ea2e3d']}>
        <Toast style={external.toast} ref={ref => Toast.setRef(ref)} />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons
              onPress={() => props.navigation.navigate('LoginWithMobileNumber')}
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
            <View style={{marginVertical: 20}}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#FFF',
                  paddingHorizontal: 20,
                  fontWeight: '500',
                }}>
                Enter OTP send to{' '}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: '#FFF',
                  paddingHorizontal: 20,
                  fontWeight: '700',
                  marginVertical: 10,
                }}>
                +91{mobile}
              </Text>
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <OTPInputView
                  style={{width: '80%', height: 70, alignSelf: 'center'}}
                  pinCount={6}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={text => {
                    setcode(text);
                  }}
                />
              </View>

              <View style={{marginVertical: 15}}>
                <TouchableOpacity
                  onPress={() => getOtp()}
                  style={{
                    backgroundColor: '#01a7db',
                    marginHorizontal: '6%',
                    paddingVertical: 12,
                    borderRadius: 6,
                  }}>
                  <Text
                    style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                    Login
                  </Text>
                </TouchableOpacity>

                <View style={styles.dontview}>
                  <Text style={styles.otptext}>Don't recieve an OTP? </Text>
                  {hideresend && (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.otptext}>Resend in</Text>
                      <CountDown
                        size={13}
                        until={otpTextTime}
                        onFinish={() => showResentOtpText()}
                        style={{marginTop: '-8%'}}
                        digitStyle={{
                          backgroundColor: 'transparent',
                          borderWidth: 0,
                        }}
                        digitTxtStyle={{color: '#01a7db'}}
                        timeToShow={['S']}
                        timeLabels={{s: null}}
                        showSeparator
                      />
                    </View>
                  )}
                  {otpText && (
                    <TouchableOpacity
                      style={styles.resendview}
                      onPress={() => hideText()}>
                      <View>
                        <Text style={[styles.textin, {color: '#01a7db'}]}>
                          Resend
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    color: '#fff',
  },

  borderStyleHighLighted: {
    borderColor: '#fff',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#fff',
  },

  underlineStyleHighLighted: {
    borderColor: '#fff',
  },
  resendview: {
    justifyContent: 'center',
    marginTop: -3,
  },
  textin: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir ' : 'Roboto',
    fontSize: Platform.OS === 'ios' ? 17 : 18,
  },
  dontview: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
  },
  otptext: {
    color: '#9199a4',
    fontSize: 14,
  },
  resendtext: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'grey',
  },
});

export default EnterOtp;
