import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Modal,
  FlatList,
  BackHandler,
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import external from '../Style';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {API_BASE_URL, Dashboard, Get_Media} from '../Networking/BaseUrl';

const Home = props => {
  const isFocused = useIsFocused();
  const [isloged, setisloged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [movieUrl, setMovieUrl] = useState({movieUrl: '', poster: ''});
  const [feedUrl, setFeedUrl] = useState({feedUrl: '', poster: ''});
  const [Mediaid, setMediaid] = useState('');
  const [lang, setLang] = useState([]);
  const [issubs, setissubs] = useState(0);

  // video state

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  const [var1, setvar1] = useState(false);
  const [var2, setvar2] = useState(true);


  const onPaused = playerState => {
    setvar1(!var1);
    setvar2(!var2);
  
    if(var1 === true) {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPlayerState1(PLAYER_STATES.PAUSED);
    }
    else{
      setPlayerState(PLAYER_STATES.PAUSED);
      setPlayerState1(PLAYER_STATES.PLAYING);
     
    }
   
  };
  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current.seek(0);
  };
  const onProgress = data => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };
  const onLoad = data => {
    // setvar1(true);
    setDuration(data.duration);
    setIsLoading(false);
  };
  const onLoadStart = () => setIsLoading(true);
  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };
  const onSeeking = currentTime => setCurrentTime(currentTime);
  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };

  // video state1

  const videoPlayer1 = useRef(null);
  const [currentTime1, setCurrentTime1] = useState(0);
  const [duration1, setDuration1] = useState(0);
  const [isLoading1, setIsLoading1] = useState(true);
  const [paused1, setPaused1] = useState(false);
  const [playerState1, setPlayerState1] = useState(PLAYER_STATES.PAUSED);

  const onPaused1 = playerState1 => {
    setvar2(!var2);
    setvar1(!var1)
    if(var2 === true) {
      setPlayerState1(PLAYER_STATES.PLAYING);
      setPlayerState(PLAYER_STATES.PAUSED);
    }
    else{
      setPlayerState1(PLAYER_STATES.PAUSED);
      setPlayerState(PLAYER_STATES.PLAYING);
     
    }
  };
  const onReplay1 = () => {
    setPlayerState1(PLAYER_STATES.PLAYING);
    videoPlayer1?.current.seek(0);
  };
  const onProgress1 = data => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading1) {
      setCurrentTime1(data.currentTime);
    }
  };
  const onLoad1 = data => {
    // setvar2(true);
     setDuration1(data.duration);
     setIsLoading1(false);
  };
  const onLoadStart1 = () => setIsLoading1(true);
  const onEnd1 = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };
  const onSeeking1 = currentTime1 => setCurrentTime1(currentTime1);
  const onSeek1 = seek => {
    videoPlayer1?.current.seek(seek);
  };

  useEffect(() => {
    console.log('check==');
    checklogin();
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, [isFocused]);

  const backAction = () => {
   props.navigation.replace('Home')
    return true;
  };

  const checklogin = async () => {
    console.log('check==');
    try {
      let check = await AsyncStorage.getItem('TOKEN');
      console.log('check,che', check);
      if (check) {
        setisloged(check);
      } else {
        setisloged(false);
      }
      videourl(check);
    } catch (err) {
      console.log('err', err);
    }
  };

  const checksubscribe = async () => {
    console.log('check==1212');
    try {
      let check = await AsyncStorage.getItem('TOKEN');
      console.log('check,che1212', check);
      if (check === null) {
        props.navigation.navigate('LoginWithMobileNumber')
        // Toast.show({
        //   type: 'error',
        //   text1: 'This is paid media,Please login.',
        // });
      } else {
        Toast.show({
          type: 'error',
          text1: 'please subscribe on our website',
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const videourl = async (check) => {
    console.log('video---');
    var url = API_BASE_URL + Dashboard;
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + check,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(async res => {
        if (res.status === 'success') {
          await AsyncStorage.setItem('mediaid', res.data.other_media[0].media_id.toString())
          console.log('dghdgghdfdfggdg'+ res.data.other_media[0].media_id.toString())
          getmedia();
          setMovieUrl({
            movieUrl: res.data.movie.media_url,
            poster: res.data.movie.thumbnail,
          });
          setFeedUrl({
            feedUrl: res.data.feed.media_url,
            poster: res.data.feed.thumbnail,
            
          });
          // setMediaid({
          //   await AsyncStorage.setItem('media_id', res.data.other_media[0].media_id)
          //   Mediaid: res.data.other_media[0].media_id,
          // });
          setissubs(res.data.is_subscribed);

          console.log('isedjffhg' + res.data.is_subscribed);
          // console.log('mediaid' + res.data.other_media[0].media_id);
          console.log('home,res', res.data);
          setLang(res.data.other_media);
         
        } else {
          Toast.show({
            type: 'error',
            text1: res.message,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  const getmedia = async() => {
    setMediaid(await AsyncStorage.getItem('mediaid'));
    console.log(Mediaid);
  }

  return (
    <LinearGradient colors={['#5f4acb', '#ea2e3d']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <Toast
            style={external.toast1}
            topOffset="10"
           
          />
          <View style={styles.container11}>
            <View style={external.homeview}>
              <Image
                source={require('../Assests/logo.png')}
                style={external.homelogo}
              />
            </View>
            <View
              style={{
                width: '65%',
                height: 80,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text style={external.homejust}>
                Free Subscription | just Pay 'n' Play
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <Button
                  onPress={() =>
                    Linking.openURL(
                      'https://greatott.phando.com/page?type=aboutus',
                    )
                  }
                  color="#fff"
                  title="About"
                  titleStyle={{fontSize: 11, color: '#fff', fontWeight:'700'}}
                  buttonStyle={{backgroundColor: '#000'}}
                  containerStyle={{
                    width: 100,
                    height: 35,
                    justifyContent: 'center',
                  }}></Button>

                {isloged && (
                  <Button
                    onPress={() => props.navigation.navigate('Profile')}
                    color="#fff"
                    title="Profile"
                    titleStyle={{fontSize: 11, color: '#fff', fontWeight:'700'}}
                    
                    buttonStyle={{backgroundColor: '#000'}}
                    containerStyle={{
                      width: 100,
                      height: 35,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}></Button>
                )}

                {!isloged && (
                  <Button
                    onPress={() =>
                      props.navigation.navigate('LoginWithMobileNumber')
                    }
                    color="#fff"
                    title="Login"
                    titleStyle={{fontSize: 11, color: '#fff', fontWeight:'700'}}
                    buttonStyle={{backgroundColor: '#000'}}
                    containerStyle={{
                      width: 80,
                      height: 35,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}></Button>
                )}
              </View>
            </View>
          </View>

          <View style={[styles.container,{marginTop: '5%'}]}>
            <Video
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              onProgress={onProgress}
              paused={var1}
              ref={ref => (videoPlayer.current = ref)}
              resizeMode="cover"
              source={require('../glow.mp4')}
              poster="https://phando023.s.llnwi.net/images/movies/thumbnails/thumb_1646938499.png"
              repeat={false}
              style={styles.mediaPlayer}
              volume={1.0}
            />
            <MediaControls
              duration={duration}
              isLoading={isLoading}
              mainColor="#000"
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}>
            </MediaControls>
          </View>

          <View style={{width:'100%', height: 'auto',marginTop:'-20%'}}>
            <Image source={require('../Assests/newyork.png')} style={{width: 250, height: 250, resizeMode: 'contain', alignSelf:"center"}} />
          </View>

          {/* <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
              marginVertical: '5%',
              fontStyle: 'italic',
            }}>
           NEW YORK JOURNAL {'\n'}{' '}
            <Text
              style={{fontSize: 14, fontWeight: 'bold', fontStyle: 'italic'}}>
              "A Stellar Performance by the Kids !"
            </Text>
          </Text> */}
          {/* <View style={{width:'100%'}}> */}
       

          <View style={[styles.container, {marginTop: '-20%'}]}>
            <Video
              onEnd={onEnd1}
              onLoad={onLoad1}
              onLoadStart={onLoadStart1}
              onProgress={onProgress1}
              paused={var2}
              ref={ref => (videoPlayer1.current = ref)}
              resizeMode="cover"
              source={require('../glow.mp4')}
              poster="https://phando023.s.llnwi.net/images/movies/thumbnails/thumb_1646913307.jpg"
              repeat={false}
              style={styles.mediaPlayer}
              volume={1.0}
            />
            <MediaControls
              duration={duration1}
              isLoading={isLoading1}
              mainColor="#000"
              onPaused={onPaused1}
              onReplay={onReplay1}
              onSeek={onSeek1}
              onSeeking={onSeeking1}
              playerState={playerState1}
              progress={currentTime1}>
            </MediaControls>
          </View> 
         

          {(!isloged || issubs === 0) && (
            <TouchableOpacity onPress={() => checksubscribe()}>
              <View
                style={{
                  width: '80%',
                  height: 'auto',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: '#000000',
                    marginVertical: '5%',
                  }}>
                  <View
                    style={{
                      height: 'auto',
                      paddingLeft: '5%',
                      width: '25%',
                    }}>
                    <Image
                      source={require('../Assests/play-icon.png')}
                      style={{height: 50, width: 50}}
                    />
                  </View>
                  <View
                    style={{
                      width: '75%',
                      height: 'auto',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#fff',
                        marginHorizontal: 5,
                        fontWeight:'600'
                      }}>
                      Watch Movie@ Rs.99
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          { issubs === 0 && (
            <TouchableOpacity onPress={() => props.navigation.navigate('VideoDetail',{mediaid: Mediaid}, setPlayerState(playerState.PAUSED), setPlayerState1(playerState1.PAUSED))}>
               {/* props.navigation.navigate('VideoDetail', {mediaid})}> */}
              <View
                style={{
                  width: '80%',
                  height: 'auto',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: '#000000',
                    marginVertical: '5%',
                  }}>
                  <View
                    style={{
                      height: 'auto',
                      paddingLeft: '5%',
                      width: '25%',
                    }}>
                    <Image
                      source={require('../Assests/play-icon.png')}
                      style={{height: 50, width: 50}}
                    />
                  </View>
                  <View
                    style={{
                      width: '75%',
                      height: 'auto',
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={{fontSize: 20, color: '#fff', marginLeft: 30,fontWeight: '600'}}>
                      Watch Now
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                height: 'auto',
                width: '100%',
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                borderTopLeftRadius: 42,
                borderTopRightRadius: 42,
                elevation: 20,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 20,
                  marginVertical: 15,
                  color: '#000',
                  textAlign: 'center',
                }}>
                Select Language
              </Text>
              <FlatList
                data={lang}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate(
                          'VideoDetail',
                          {mediaID: item.media_id},
                          setModalVisible(false),
                        )
                      }>
                      <Text
                        style={{
                          padding: 10,
                          fontSize: 17,
                          fontWeight: '700',
                          paddingHorizontal: 20,
                          borderWidth: 0.5,
                          borderColor: 'gray',
                        }}>
                        {item.language}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Modal> */}
          <View
            style={{
              height: 70,
              width: '60%',
              marginHorizontal: 80,
              marginVertical: 10,
            }}>
            <Image
              source={require('../Assests/amust.png')}
              style={{height: 40, width: '100%'}}
            />
          </View>
          <Image style={{ width: '70%', resizeMode: "contain", height: 200, position: 'absolute', bottom: '0%', right: '-20%', zIndex: -1, opacity: 0.3 }} source={require('../Assests/giffff.png')} />
        <Image style={{ width: '70%', resizeMode: "contain", height: 100, position: 'absolute', bottom: '25%', right: '-35%', zIndex: -1, opacity: 0.3 }} source={require('../Assests/giffff.png')} />
          {/* </ImageBackground> */}

          {/* </View> */}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    zIndex: 1,
    
  },

  container11: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: -2
  },
  toolbar: {
    marginTop: 0,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
});
