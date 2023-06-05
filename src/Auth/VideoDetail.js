import React, {useState, useRef, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import external from '../Style';
import {API_BASE_URL, Get_Media} from '../Networking/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Orientation from 'react-native-orientation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const noop = () => {};

const VideoDetail = props => {
  // video const
  const [movieUrl, setMovieUrl] = useState({movieUrl: '', poster: ''});
  const [tittle, settittle] = useState({
    description: '',
    tittlename: '',
    allage: '',
    released: '',
    duration_str: '',
    detail: '',
    rating: '',
  });
  const [descr, setdescr] = useState({descr: ''});
  const [token, setToken] = useState(' ');

  // video state

  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [landscape, setlandscape] = useState(true);
  const [videoVolume, setVideoVolume] = useState(1.0);
  const [muteSound , setMuteSound] = useState(true)


  const onSeek = seek => {
    videoPlayer?.current.seek(seek);
  };
  const fullScreen = () => {
    Orientation.getOrientation((err, orientation) => {
      if (orientation == 'LANDSCAPE') {
        Orientation.lockToPortrait();
        setlandscape(false);
      } else {
        Orientation.lockToLandscape();
        setlandscape(true);
      }
    });
  };

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
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
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const skipBackward = () => {
    videoPlayer.current.seek(currentTime - 15);
    setCurrentTime(currentTime - 10);
    // setState({...state, currentTime: state.currentTime - 15});
  };

  const skipForward = () => {
    videoPlayer.current.seek(currentTime + 15);
    setCurrentTime(currentTime + 10);
    // setState({...state, currentTime: state.currentTime + 15});
  };

  useEffect(() => {
    var mediaid = props.route.params.mediaid;
    console.log(',mmmmmmmm' + mediaid);

    gettoken();
  }, [props.route.params]);

  const gettoken = async () => {
    try {
      var check = await AsyncStorage.getItem('TOKEN');
      if (check) {
        setToken(check);
        mediaplaybeck(check);
      }
      // console.log('check,che', check);
      // console.log(Linking.openURL);
    } catch (err) {
      console.log('profile-', err);
    }
  };

  const mediaplaybeck = check => {
    console.log('video---');
    let url = API_BASE_URL + Get_Media + props.route.params.mediaid;
    console.log('fgfgdfdfdgdfgdf' + url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + check,
      },
    })
      .then(response => response.json())
      .then(res => {
        settittle({
          tittlename: res.data.title,
          description: res.data.description,
          allage: res.data.maturity_rating,
          released: res.data.released,
          duration_str: res.data.duration_str,
          detail: res.data.detail,
          rating: res.data.rating,
        });
        console.log('qwertykl' + res.data.maturity_rating);

        setMovieUrl({
          movieUrl: res.data.media_url,
          poster: res.data.poster,
        });
        console.log('mediaplaybeck,res', res.data);
        // setLang(res.data.other_media);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient style={{flex: 1}} colors={['#5f4acb', '#ea2e3d']}>
        {/* <View>
          <Ionicons
            onPress={() => props.navigation.goBack(setLANDSCAPE(false))}
            name="chevron-back"
            size={30}
            style={{
              color: '#000',
              position: 'absolute',
              padding: 12,
            }}></Ionicons>
        </View> */}

        <View style={styles.container}>
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            fullscreenAutorotate={true}
            fullscreenOrientation={'all'}
            fullscreen={fullScreen}
            ref={ref => (videoPlayer.current = ref)}
            resizeMode="cover"
            source={require('../glow.mp4')}
            // poster={{uri: movieUrl.poster}}
            repeat
            style={[styles.mediaPlayer, {height: landscape ? '100%' : 250}]}
            volume={videoVolume}
            automaticallyWaitsToMinimizeStalling={true}
            preventsDisplaySleepDuringVideoPlayback={true}
            playWhenInactive={false}

            onVideoResolutionChange={res => console.log(res)}

            videoResolution={'480p'}
            onVideoSeek={true}
            onVideoProgress={true}
            selectedVideoTrack={[
              {type: 'resolution', value: 480},
              {type: 'medium', value: 720},
              {type: 'large', value: 1080},
            ]}
          />
          <MediaControls
            isFullScreen={fullScreen}
            duration={duration}
            isLoading={isLoading}
            mainColor="#000"
            onFullScreen={fullScreen}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}>
            <MediaControls.Toolbar>
              <View style={styles.toolbar}>
                <View
                  style={{
                    width: '15%',
                    height: 'auto',
                    justifyContent: 'center',
                  }}>
                  <Ionicons
                    onPress={() => props.navigation.navigate('Homee')}
                    name="chevron-back"
                    size={25}
                    style={{
                      color: '#fff',
                    }}></Ionicons>
                </View>
                <View
                  style={{
                    width: '70%',
                    height: 'auto',
                    justifyContent: 'center',
                  }}></View>
                <View
                  style={{
                    width: '15%',
                    height: 'auto',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      width: 40,
                      height: 20,
                      resizeMode: 'contain',
                      right: 20,
                    }}
                    source={require('../Assests/logo.png')}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (muteSound === true) {
                        setMuteSound(false);
                        setVideoVolume(1.0);
                      } else {
                        setMuteSound(true);
                        setVideoVolume(0.0);
                      }
                    }}>
                    <Text style={{right: 10, color: '#fff'}}>Mute</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: 50,
                    position: 'absolute',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 30,
                    marginTop: landscape ? '22%' : '30%',
                  }}>
                  <MaterialCommunityIcons
                    onPress={() => skipBackward()}
                    name="rewind-10"
                    size={25}
                    color="#fff"
                  />
                  <MaterialCommunityIcons
                    onPress={() => skipForward()}
                    name="fast-forward-10"
                    size={25}
                    color="#fff"
                  />
                </View>
              </View>
            </MediaControls.Toolbar>
          </MediaControls>
        </View>

        <View style={{padding: 20}}>
          <View
            style={{
              borderColor: '#070a0c',
              borderWidth: 0.2,
              marginVertical: 5,
            }}></View>
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
              fontWeight: '500',
              fontStyle: 'italic',
              marginVertical: 5,
            }}>
            {tittle.tittlename}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <AntDesign name="star" size={18} color="#fff" />
            <Text style={{fontSize: 15, color: '#fff'}}>
              {tittle.rating} | {tittle.allage} |{' '}
              <Text>Chlidrens & Family</Text> | {tittle.duration_str}{' '}
            </Text>
          </View>
          <View
            style={{
              borderColor: '#070a0c',
              borderWidth: 0.2,
              marginVertical: 5,
            }}></View>

          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <AntDesign
              name="infocirlce"
              size={18}
              color="#fff"
              style={{marginTop: 5}}
            />
            <Text
              style={{color: '#730100', fontSize: 15, marginHorizontal: 10}}>
              All Media inside single movies are now available in your account
              start {tittle.released}
            </Text>
          </View>
          <View
            style={{
              borderColor: '#070a0c',
              borderWidth: 0.2,
              marginVertical: 5,
            }}></View>

          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              fontWeight: '500',
              fontStyle: 'italic',
              marginTop: 10,
            }}>
            {tittle.detail}
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  toolbar: {
    marginTop: 0,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaPlayer: {
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

export default VideoDetail;
