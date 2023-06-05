import React from 'react';
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
import styles from '../Style'

const CreateNew = (props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#18202c'}}>
      <ScrollView>
        <View
          style={styles.createmain}>
          <Ionicons
            onPress={() => props.navigation.goBack()}
            name="chevron-back"
            size={35}
            style={styles.createbeck}></Ionicons>
          <Image
            source={require('../Assests/logo.png')}
            style={styles.createlogo}></Image>
        </View>
        <View
          style={styles.createmain2}>
          <View style={{marginVertical: 20}}>
            <Text
              style={styles.createnew}>
              Create New Password
            </Text>
            <TextInput
              placeholder="New Password"
              style={styles.craetepass}
              placeholderTextColor={'#fff'}></TextInput>
            <TextInput
              placeholder="Conform New Password"
              style={styles.craetepass}
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
                onPress={() => props.navigation.navigate('')}
                style={{alignSelf: 'center', color: '#fff', fontSize: 15}}>
                Update Password
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateNew;
