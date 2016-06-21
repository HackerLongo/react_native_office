'use strict'
import React, {
  Dimensions,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';

import api from "../Network/api.js";
import LineItem from  './Component/LineItem';
import Colors from '../util/Colors';
import global from '../util/GlobalStorage';
import JPush from 'react-native-jpush';
let top = Platform.OS === 'ios'? 20: 0;
export default class MeTab extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        avatarSource: '',
      };
    }

  componentDidMount(){
    global.storage.load({
      key: 'avatar',
      id:'1'
    }).then((ret)=>{
      this.setState({
        avatarSource: ret,
      });
    }).catch((err)=>{
      console.log('error==>',err);
    })
  }

  render() {
    return(
      <View style={styles.background}>
        <TouchableHighlight style={{marginTop: top,}} onPress={this.onUserInfo.bind(this)}>
          <View style={styles.bgAvatar}>
            <Image style={styles.avatar} source={this.state.avatarSource?this.state.avatarSource:require('../../res/icon/icon-avatar.png')}/>
              <Text style={styles.userInfo}>{this.props.router.nickName}</Text>
            <Image style={styles.nextIcon} source={require('../../res/icon/icon-next.png')}/>
          </View>
        </TouchableHighlight>
        <LineItem
          type='nextIcon' top='20' text='修改密码' onClick={this.onChangePassword.bind(this)}
          icon={require('../../res/icon/icon-locks.png')} />
        <LineItem
          type='nextIcon' text='帮助与反馈' onClick={this.onHelp.bind(this)}
          icon={require('../../res/icon/icon-help.png')} />
        <LineItem
          type='nextIcon' text='版本信息' onClick={this.onVersion.bind(this)}
          icon={require('../../res/icon/icon-version.png')} />
        <LineItem type='nextIcon' text='关于' onClick={this.onAbout.bind(this)}
          icon={require('../../res/icon/icon-about.png')} />
        <LineItem top='40' type='text' text='注销' fontColor='#ED4D4D'
          fontSize='16' onClick={this.onLogout.bind(this)} />
      </View>
    );
  }

  setAvatar(uri){
    this.setState({
      avatarSource: uri,
    });
  }

  onUserInfo(){
    this.props.navigator.push({
      name: 'userInfo',
      userId: this.props.router.userId,
      nickName: this.props.router.nickName,
      userName:this.props.router.userName,
      setAvatar: this.setAvatar.bind(this),
    });
  }

  onChangePassword(){
    this.props.navigator.push({
      name: 'changePassword',
      userName:this.props.router.userName,
      userId: this.props.router.userId,
    });
  }

  onAbout () {
    this.props.navigator.push({
      name: 'about',
      userId: this.props.router.userId,
    });
  }
  onLogout(){
    JPush.setAlias('');
    JPush.clearAllNotifications();
    global.storage.save({
       key: 'userName',  //注意:请不要在key中使用_下划线符号!
       rawData: {
       },
     });
    this.props.navigator.pop();

  }
  onVersion(){
    this.props.navigator.push({
      name: 'ShowDetail',
      urlPath:api.ME_VERSION,ErrorInof:'页面打开失败',
    });
  }
  onHelp(){
    this.props.navigator.push({
      name: 'ShowDetail',
      urlPath:api.ME_HELP,ErrorInof:'页面打开失败',
    });
  }
};

var styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  bgAvatar:{
    flexDirection: 'row',
    height: 96,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  bgAdmin: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  avatar: {
    width:80,
    height: 80,
    borderRadius: 40,
    marginLeft: 8,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
    marginLeft: 8,
  },
  nextIcon: {
    width: 8,
    height: 14,
    marginRight: 8,
  },

});
