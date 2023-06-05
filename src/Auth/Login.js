import React, {useState} from 'react';
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
import external from '../Style';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '../Networking/BaseUrl';

const Login = props => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // useEffect(() => {

  //   let mob = props.route.params.mobile;
  //   setmobile(mob);
  //   console.log('mob', mob);
  // }, [props.route.params]);

  const loginval = () => {
    console.log('signup');
    if (email === '' || email === null) {
      // Alert.alert('', 'Please enter EmployeeName');
      // console.warn('Please enter EmployeeName1');
      Toast.show({
        type: 'error',
        text1: "email can't be empty",
      });
    } else if (password === '' || password === null) {
      Toast.show({
        type: 'error',
        text1: "password can't be empty",
      });
      login();
    }
  };

  const login = () => {
    var url = API_BASE_URL + Login;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responsejson => {
        console.log('Login', 'Api REsult-->' + JSON.stringify(responsejson));
        if (responsejson.Result === 'Success') {
          Toast.show({
            type: 'success',
            text1: 'Successfully SignUp',
          });
          setTimeout(() => {
            props.navigation.navigate('Home');
          }, 3000);
        } else {
          Toast.show({
            type: 'error',
            text1: responsejson.Msg,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#18202c'}}>
      <Toast style={external.toast} ref={ref => Toast.setRef(ref)} />
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
            <TextInput
              placeholder="Your email"
              style={{
                backgroundColor: '#262f39',
                marginHorizontal: '6%',
                borderRadius: 6,
                marginVertical: 6,
                paddingHorizontal: 8,
              }}
              onChangeText={text => setemail(text)}
              placeholderTextColor={'#fff'}></TextInput>
            <TextInput
              placeholder="Password"
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

          <View style={{marginVertical: 15}}>
            <View
              style={{
                backgroundColor: '#37a7db',
                marginHorizontal: '6%',
                paddingVertical: 12,
                borderRadius: 6,
              }}>
              <Text
                onPress={() => loginval()}
                style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                Login
              </Text>
            </View>
            {/* <View>
              <Text
                onPress={() => props.navigation.navigate('ForgetPassword')}
                style={{
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 15,
                  marginTop: 15,
                }}>
                Forgot Password?
              </Text>
            </View> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '6%',
            marginVertical: 50,
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
            width: '90%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            marginBottom: 30,
            marginTop: 30,
            backgroundColor: '#2f3943',
            paddingVertical: 30,
            borderRadius: 15,
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
              style={{color: '#fff'}}
              size={35}></Ionicons>
          </View>
        </View>
        <View>
          <Text
            onPress={() => props.navigation.navigate('SignUp')}
            style={{
              alignSelf: 'center',
              color: '#fff',
              fontSize: 18,
              marginBottom: 40,
            }}>
            SIGN UP
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
