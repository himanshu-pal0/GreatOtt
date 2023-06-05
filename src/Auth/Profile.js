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
  Linking,
  Alert,
  BackHandler
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  API_BASE_URL,
  Billing,
  UpdateProfile,
  UPDATE_URL,
  Profilecheck,
} from '../Networking/BaseUrl';
import {TOKEN} from '../Networking/localKeys';
import external from '../Style';

const Profile = props => {
  const [mobile, setmobile] = useState(0);
  const [token, setToken] = useState('');
  const [name, setname] = useState({nameurl: '', lastnurl: ''});
  const [image, setimage] = useState({imageurl: null});

const backAction = () => {
  props.navigation.navigate('Homee')
   return true;
 };

  useEffect(() => {
    gettoken();
    getMobileNo();
  }, []);
  useEffect(() => {
    if (token) {
      profiledata();
    }
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [token]);
  const getMobileNo = async () => {
    try {
      let mob = await AsyncStorage.getItem('MobileNumber');
      if (mob) {
        setmobile(mob);
      }
    } catch (err) {
      console.log('prof -', err);
    }
  };

  const gettoken = async () => {
    try {
      var check = await AsyncStorage.getItem('TOKEN');
      if (check) {
        setToken(check);
      }
      // console.log('check,che', check);
      // console.log(Linking.openURL);
    } catch (err) {
      console.log('profile-', err);
    }
  };

  const logout = async () => {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => {
            logoutfromapi();
          },
        },
        {
          text: 'Cancel',
        },
      ],
      {cancelable: false},
    );
  };
  const logoutfromapi = async () => {
    console.log('print Log Out');

    try {
      await AsyncStorage.clear();
      props.navigation.navigate('Homee');
    } catch (error) {
      console.log('Error in Log Out' + error);
    }
  };

  const profiledata = () => {
    console.log('video---profile');
    var url = API_BASE_URL + Profilecheck;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      // console.log('profiledata' + response.json())
      .then(res => {
        if (res) {
          console.log('hhhhhhhh');
          setname({
            nameurl: res.user.name,
            lastnurl: res.user.lastname,
          });
          setimage({
            imageurl: res.user.image,
          });

          console.log('isedjffhg' + res.user.image);
          //  console.log('mediaid' + res.data.other_media[0].media_id);
          console.log('profile,res', res.user);
        } else {
          console.log('res,res', res);
        }
      })
      .catch(err => {
        console.log('err otp', err);
      });
  };

  return (
    <LinearGradient
      style={{flex: 1, backgroundColor: '#634aca'}}
      colors={['#5f4acb', '#ea2e3d']}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Ionicons
            onPress={() => props.navigation.navigate('Homee')}
            name="arrow-back"
            size={30}
            style={{color: '#fff'}}></Ionicons>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: '400',
              marginLeft: 10,
            }}>
            Profile
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View>
            {image.imageurl === null && (
              <AntDesign
                name="user"
                size={130}
                style={{color: '#fff'}}></AntDesign>
            )}

            {image.imageurl !== null && (
              <Image
                style={external.ProfileCardImage}
                resizeMode="cover"
                source={{uri: image.imageurl}}
              />
            )}
          </View>
         
          <Text
            style={{
              fontWeight: '400',
              color: '#fff',
              fontSize: 18,
              marginTop: 15,
            }}>
            +91 {mobile}
          </Text>
          <View style={{flexDirection:'row'}}>
            <FontAwesome5 name="chess-queen" size={25} color="yellow" style={{marginTop: '2%', left: -5}} />
            <Text
            style={{
              fontWeight: '400',
              color: '#fff',
              fontSize: 18,
              marginTop: 15,
            }}>
            {name.nameurl}
            <Text> {name.lastnurl}</Text>
          </Text>
          </View>
         
          <Text
            onPress={() => Linking.openURL(UPDATE_URL + UpdateProfile + token)}
            style={{
              fontWeight: '600',
              color: '#398ccf',
              fontSize: 18,
              marginVertical: 15,
            }}>
            UPDATE PROFILE
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                UPDATE_URL + Billing + token,
                //  console.log('zxcvbnmxcvbn' + Linking.openURL)
              )
            }>
            <View
              style={{
                backgroundColor: '#535353',
                padding: 12,
                marginVertical: 5,
              }}>
              <Text style={{color: '#fff'}}>Billing</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logout()}>
            <View
              style={{
                backgroundColor: '#535353',
                padding: 12,
                marginVertical: 5,
              }}>
              <Text style={{color: '#fff'}}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;
