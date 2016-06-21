'use strict';

import React, {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  Alert,
  Linking,
  InteractionManager,
} from 'react-native';

import Tabs from './Component/Tabs';
import IndexTab from './IndexTab';
import MeTab from './MeTab';
import OfficeTab from './OfficeTab';
import api from "../Network/api.js";
import DeviceInfo from 'react-native-device-info';
import VersionCheck from '../util/updateManager';
import Spinner from '../lib/react-native-loading-spinner-overlay';
var HEIGHT = Dimensions.get('window').height;

var _navigator;
var _router;

export default class MainScreen extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        page:'message',
        loading: false,
      };
  }

  componentDidMount(){
    if ( Platform.OS === 'ios') {
      this.checkVersion();
    } else if ( Platform.OS === 'android'){
      if(!this.state.loading){
        VersionCheck.startCheck((result) => {
          Alert.alert('发现更新', '点击前往下载', [{text: '确定', onPress: () =>{
            VersionCheck.startUpdate((download) => {
              if(!download){
                this.setState({
                  loading: false,
                });
                Alert.alert('更新失败', '网络异常', [{text: '确定', onPress: () =>{}}]);
              }
            });
            this.setState({
              loading: true,
            });
          }}]);
        });
      }
    }
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        this.props.navigator.push({name: 'gesturePassword'});
      });
    }, 1);
  }
    checkVersion(){
        //  getVersion_URL ='http://10.9.0.182:8080/bpm/task/findLatestVersionByPlatform.do?platform=ios';
        var getVersion_URL=api.GET_NEWVERSION_URL+'1';
        fetch(getVersion_URL)
        .then((response)=>response.json())
        .then((responseData)=>{
          if (DeviceInfo.getVersion() != responseData.infos.appInfo.version)
          {
                  Alert.alert('新版本!',responseData.infos.appInfo.info,[{text: '立即更新', onPress: () =>{Linking.openURL(responseData.infos.appInfo.appDownloadUrl) ;}}])
          }
          else {
            console.log('最新版本!!!');
          }
        })
        .catch((error)=>{
          console.log('upDataVersion->error',error);
        })
        .done()
      }

  _renderPage(navigator,router){
    if(this.state.page === 'message'){
      return (
        <IndexTab  navigator = {navigator} router = {router}/>
      );
    }else if(this.state.page === 'office'){
      return (
        <OfficeTab navigator = {navigator} router = {router}/>
      );
    }else if(this.state.page === 'setting'){
      return (
        <MeTab navigator = {navigator} router = {router}/>
      );
    }
  }

  render() {
    _navigator = this.props.navigator;
    _router = this.props.router;

    return (
      <View style={styles.container}>
        <View style={styles.mainPage}>
          {this._renderPage(_navigator,_router)}
        </View>
      <Tabs selected={this.state.page} style={{backgroundColor:'#322a33'}} onSelect={el=>this.setState({page:el.props.name})}>
          <Image
            name='message' selectedStyle={{tintColor: '#ef6c00'}}
            style={{width:22,height: 34,}}
            selectedIconStyle={{borderTopWidth:2,borderTopColor:'#ef6c00'}}
            source={require('../../res/icon/icon-home-active.png')} />

          <Image
            name='office' selectedStyle={{tintColor: '#ef6c00'}}
            style={{width:22,height: 34,}}
            selectedIconStyle={{borderTopWidth:2,borderTopColor:'#ef6c00'}}
            source={require('../../res/icon/icon-office-active.png')} />
          <Image
            name='setting' selectedStyle={{tintColor: '#ef6c00'}}
            style={{width:22,height: 34,paddingTop: 2,}}
            selectedIconStyle={{borderTopWidth:2,borderTopColor:'#ef6c00'}}
            source={require('../../res/icon/icon-setting-active.png')} />
      </Tabs >
      <View>
        <Spinner visible={this.state.loading} text={'更新中,请稍后...'}/>
      </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainPage: {
    height: Platform.OS === 'ios'? HEIGHT-50 : HEIGHT-75,
  }
});
