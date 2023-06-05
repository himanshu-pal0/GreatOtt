import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
const SubscriptionPackages = props => {
  const [ticket, setTicket] = useState();
  const [loading, setLoading] = useState('');
  useEffect(() => {
    setLoading('loading');
    data();
  }, []);
  const data = async () => {
    await setTicket({price: 1200});
    await setLoading('');
  };
  const makePayment = () => {
    // console.log('pri--',price,'--',ticketNo)
    let total = 99 * 100;
    let userName = 'danish';
    let userid = 'dan2154';

    var options = {
      description: 'Event Booking',
      image:
        'https://firebasestorage.googleapis.com/v0/b/pricing-info-13867.appspot.com/o/1024.png?alt=media&token=164fb125-4546-4925-b682-1978ab731011',
      currency: 'INR',
      key: 'rzp_test_077r51eVK4wDK7', // Your api key
      amount: total,
      name: 'Greate OTT',
      //   prefill: {
      //     email: 'void@razorpay.com',
      //     contact: '9191919191',
      //     name: 'Razorpay Software'
      //   },
      theme: {color: '#e92e3e'},
    };
    RazorpayCheckout.open(options).then(data => {
      // handle success

      console.log('response is ', data);
      // alert('Your payment is successfull ' + data.razorpay_payment_id);
      props.navigation.navigate('Home');
      // let payload={
      //     buyerName:userName,
      //     noOfTicket:ticket.ticketNo,
      //     paymentid:data.razorpay_payment_id,
      //     eventName:ticket.eventInfo.eventName,
      //     total:ticket.eventInfo.ticketPrice*ticket.ticketNo,
      //     eventLink:ticket.eventInfo.eventLink,
      //     eventPlace:ticket.eventPlace,
      //     chosenDay:ticket.chosenDay,
      //     eventTime:ticket.eventTime,
      //     uid:userid
      // }

      //   firestore().collection('transaction').add(payload).then(res=>{
      //     console.log(`Success: ${data.razorpay_payment_id}`);
      //     props.navigation.navigate('ThankYou',{paymentid:data.razorpay_payment_id,eventInfo:ticket.eventInfo,ticketNo:ticket.ticketNo,chosenDay:ticket.chosenDay,eventPlace:ticket.eventPlace,eventTime:ticket.eventTime })
      //   }).catch(err=>{

      //   })

      // }).catch((error) => {
      //   // handle failure
      //  console.log(`Error: ${error.code} | ${error.description}`);
      //   props.navigation.navigate('Failed')
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
      <LinearGradient colors={['#5f4acb', '#ea2e3d']} style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 12,
          }}>
          <Ionicons
            onPress={() => props.navigation.goBack()}
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
            Subscription Packages
          </Text>
        </View>
        <View style={{margin: 12}}>
          <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={require('../Assests/logo.png')}></Image>
        </View>
        <View style={{marginHorizontal: 5}}>
          <Text style={{color: '#fff', fontSize: 22, fontWeight: '500'}}>
            Choose Package
          </Text>
          <TouchableOpacity onPress={makePayment}>
            <View
              style={{
                backgroundColor: '#fff',
                paddingVertical: 15,
                paddingHorizontal: 10,
                marginTop: 10,
              }}>
              <Text style={{color: '#14b0e1', fontSize: 18, fontWeight: '600'}}>
                SingleMovie
              </Text>
              <Text style={{color: '#e84443', fontSize: 18}}>
                <Text style={{fontWeight: '800'}}>₹99/-</Text> for 1 year
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SubscriptionPackages;
