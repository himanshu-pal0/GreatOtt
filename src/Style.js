import {StyleSheet, Platform} from 'react-native';
const external = StyleSheet.create({
  // splash
  splashlogo: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // homepage
  homemain: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    position: 'relative',
    zIndex: -1,
  },
  homeview: {
    width: '25%',
    height: 80,
  },
  homelogo: {
    width: 110,
    height: 80,
    resizeMode: 'contain',
  },
  homejust: {
    fontSize: 13,
    color: '#000',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  homevideo: {
    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  homeimg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  toast: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    backgroundColor:"#000",
    color: "#fff"
  },
  toast1123: {
    flex: 2,
    position: 'absolute',
    zIndex: 100,
    backgroundColor:"#000",
    color: "#fff"
  },
  toast1: {
     zIndex: 2,
    position: 'relative',
    marginTop: 0,
    backgroundColor:"#000",
    color: "#fff"
  },
  // create new password
  createmain:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createbeck:{
    color: '#fff',
    position: 'absolute',
    left: 10,
    top: 35,
  },
  createlogo:{
    width: 190, height: 190, resizeMode: 'contain'
  },
  createmain2:{
    width: '90%',
    backgroundColor: '#2f3943',
    alignSelf: 'center',
    borderRadius: 15,
  },
  createnew:{
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    padding: 20,
  },
  craetepass:{
    backgroundColor: '#262f39',
    marginHorizontal: '6%',
    borderRadius: 6,
    marginVertical: 6,
    paddingHorizontal: 8,
  },
  ProfileCardImage: {
    width: 120,
    height: 120,
    borderRadius: 100000,
    marginBottom: '2%',
},
  
});
export default external;
