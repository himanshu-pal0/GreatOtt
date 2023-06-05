import React,{useState} from 'react';
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

const ForgetPassword = props => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  

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
            <Text
              style={{
                fontSize: 17,
                color: '#FFF',
                paddingHorizontal: 20,
                fontWeight: '500',
              }}>
              Reset Your Password
            </Text>

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
                defaultCode="IN"
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
                  borderRadius: 6,
                  // elevation: 10,
                  // shadowOpacity: 1,
                  // shadowRadius: 30,
                 
                  paddingVertical:0 
                }}
                containerStyle={{                  
                  backgroundColor: '#262f39',
                  borderRadius: 6,
                  // elevation: 10,
                  // shadowOpacity: 1,
                  // shadowRadius: 30,
                  height: 50,
                }}
                codeTextStyle ={{
                  color:'#fff'
                }}
                textInputStyle={{
                  color:'#ffffff'
                }}      
               textInputProps={{placeholderTextColor:"#ffffff"}}
                placeholder="Your Number"
                withDarkTheme
                withShadow
                autoFocus
              />
            </View>
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
                onPress={() => props.navigation.navigate('CreateNew')}
                style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                Reset Password
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

export default ForgetPassword;
