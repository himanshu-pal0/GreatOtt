import * as React from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//  bottom tabs
// import Orders from '../Bottom-Tabs/Home';
// import Profile from '../Bottom-Tabs/Appointment';
// import Dignobot from '../Bottom-Tabs/Dignobot';
// import Proiles from '../Bottom-Tabs/Profile';
//  loginin or splash
import Splash from '../Auth/Splash';
import Home from '../Auth/Home';
import Login from '../Auth/Login';
import LoginOptions from '../Auth/LoginOptions';
import LoginWithMobileNumber from '../Auth/LoginWithMobileNumber ';
import SignUp from '../Auth/Signup';
import EnterOtp from '../Auth/EnterOtp';
import ForgetPassword from '../Auth/ForgetPassword';
import Profile from '../Auth/Profile';
import SubscriptionPackages from '../Auth/Subscription';
import CreateNew from '../Auth/CreateNewPwd';
import VideoDetail from '../Auth/VideoDetail';

const AuthStack = createNativeStackNavigator();

export const AuthNavigation = (props) => {
  return (
    <AuthStack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: true}}>
      <AuthStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginWithMobileNumber"
        component={LoginWithMobileNumber}
        options={{headerShown: false}}
      />
        <AuthStack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{headerShown: false, orientation: 'landscape'}}
      />
        <AuthStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
     
      {/* <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      /> */}
      <AuthStack.Screen
        name="EnterOtp"
        component={EnterOtp}
        options={{headerShown: false}}
        ForgetPassword
      />

      {/* <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{headerShown: false}}
      /> */}

      {/* <AuthStack.Screen
        name="CreateNew"
        component={CreateNew}
        options={{headerShown: false}}
      /> */}
       {/* <AuthStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      /> */}
      {/* <AuthStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      /> */}
     
{/* 
      <AuthStack.Screen
        name="SubscriptionPackages"
        component={SubscriptionPackages}
        options={{headerShown: false}}
      /> */}

    
    </AuthStack.Navigator>
  );
};



const HomeStack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <HomeStack.Navigator  initialRouteName="Home" screenOptions={{headerShown: false}}>


        <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      
    </HomeStack.Navigator>
  );
};

const CombineStack = createNativeStackNavigator();

export const CombineNavigation = () => {
  return (
    <CombineStack.Navigator initialRouteName="auth" screenOptions={{headerShown: false}}>
      <CombineStack.Screen name="auth" component={AuthNavigation} />
      <CombineStack.Screen name="Homee" component={HomeNavigation} />
    </CombineStack.Navigator>
  );
};
