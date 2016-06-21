'use strict'

import React, {
  Text,
  View,
  Navigator,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from '../Network/api';
import {UIImagePickerManager} from 'NativeModules';
var ITEM_HEIGHT=Dimensions.get('window').height/14;
var  navigation;
import global from '../util/GlobalStorage';
import FileManager from 'react-native-fs';
import {Base64Encode,Base64Decode} from '../util/Base64';

export default class userInfo extends React.Component {
  constructor(props){
      super(props);
          navigation = this.props.navigator;
      this.state = {
        phoneNumber: '未获取到',
        email: '未获取到',
        avatarSource: '',
      };
  }

  componentDidMount(){
    this._featch();
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

  _featch(){
    let url =  api.PHONENUMBER_EMAIL_GET+this.props.router.userName
    fetch(url).then((response) => response.json()).then((responseData) => {
      this.setState({email:responseData.email,phoneNumber:responseData.telephone})
    }).catch((error) => {
      Alert.alert('','网络异常,请稍后重试!',[{text: '确定', onPress: () =>{}},])
    }).done();
   }

  render() {
    return(
      <View style={styles.background}>
        <NavigationBar
          title={'个人信息'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}
          rightButtonIcon={{}}
          rightButtonTitle={'提交'}
          rightButtonTitleColor={'#fff'}
          onRightButtonPress={this.onRightCommit.bind(this)}
          />

          {/*头像*/}
          <TouchableHighlight style={{marginTop: 20,}} onPress={this.onAvatarPress.bind(this)}>
            <View style={[styles.item,{justifyContent:'space-between',}]}>
              <Text style={styles.leftText}>头像</Text>
              <Image style={styles.avatar} source={this.state.avatarSource?this.state.avatarSource:require('../../res/icon/icon-avatar.png')}/>
            </View>
          </TouchableHighlight>
          <View style={{backgroundColor: Colors.mainBackground,height: 1,}}/>
          {/*姓名*/}
          <View style={[styles.item,{justifyContent:'space-between',}]}>
            <Text style={styles.leftText}>姓名</Text>
            <Text style={styles.rightText}>{this.props.router.nickName}</Text>
          </View>
          <View style={{backgroundColor: Colors.mainBackground,height: 1,}}/>
          {/*手机号码*/}
          <View style={[styles.item,{marginTop: 20,}]}>
            <Text style={styles.leftText}>手机号码</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              selectTextOnFocus={this.state.phoneIsEnable}
              style={styles.textInput}
              defaultValue={this.state.phoneNumber}
              editable={this.state.phoneIsEnable}
              onChangeText={(text) => this.setState({phoneNumber:text})}
              placeholder={'请输入您的手机号码'}
              value={this.state.text}
            />

          </View>
          <View style={{backgroundColor: Colors.mainBackground,height: 1,}}/>
          {/*电子邮箱*/}
          <View style={styles.item}>
            <Text style={styles.leftText}>电子邮箱</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              selectTextOnFocus={this.state.emailIsEnable}
              style={styles.textInput}
              defaultValue={this.state.email}
              editable={this.state.emailIsEnable}
              onChangeText={(text) => this.setState({email:text})}
              placeholder={'请输入您的邮箱'}
              value={this.state.text}
            />

          </View>
      </View>
    );
  }

  onAvatarPress() {
    var options = {
      title: '选择头像',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从相册选取',
      maxWidth: 200,
      maxHeight: 200,
      quality: 0.2, //很重要，不设置会导致app很卡
    };
    UIImagePickerManager.showImagePicker(options, (response) => {
     if (response.didCancel) {

     }else if (response.error) {

     }else if (response.customButton) {

     }else {
       const source = {uri: response.uri, isStatic: true};
       this.uploadAvatar(source);
     }

    });
  }

  uploadAvatar(avatar){
    let url = api.OFFICE_LIST_UPLOADFILE_URL+'?model=avatar'+'&userId='+this.props.router.userId;
    let form = new FormData();
    let fileName = Base64Encode(this.props.router.userName+'.png');
    form.append('model', 'avatar');
    form.append('userId', this.props.router.userId);
    form.append('fileName', this.props.router.userName+'.png');
    form.append('files', {uri: avatar.uri,type:'application/octet-stream',name: fileName});
    fetch(url,{
     body: form,
     method: "post",
     headers: {"Content-Type": "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d"}
   }).then((response) => {
     return response.json();
   }).then((responseData) => {
     global.storage.save({
       key: 'avatar',
       id: '1',
       rawData: avatar,
     });
     this.setState({
       avatarSource: avatar
     });
     this.props.router.setAvatar(avatar);
      Alert.alert('','头像上传成功!',[{text: '确定', onPress: () =>{}},]);
   }).catch((error) => {
     Alert.alert('','头像上传失败!',[{text: '确定'},]);
      console.log("ERROR " + error);
   }).done();
  }

  onLeftBack() {
    this.props.navigator.pop();
  }

  onRightCommit(){
    let CheckEmail  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let CheckPhone =/^1[34578]\d{9}$/;
    if (! CheckPhone.test(this.state.phoneNumber) && this.state.phoneNumber != '' )
      Alert.alert('','您的手机号码不正确!',[{text: '确定'},]);
    else if (!CheckEmail.test(this.state.email) && this.state.email != ''){
      Alert.alert('','您的邮箱不正确!',[{text: '确定'},]);
    }else {
      fetch(api.PASSWORD_URL,{
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
        body: JSON.stringify({
          telephone:this.state.phoneNumber,
          email: this.state.email,
          userName:this.props.router.userName,})
      }).then((response) =>{
         return response.json();
      }).then((responseData) => {
         if(responseData.msg_email =="修改邮箱成功"){
           Alert.alert('','个人信息修改成功!',[{text: '确定', onPress: () =>{navigation.pop();}},]);
         }else if(responseData.code == 'failure'){
           Alert.alert('','个人信息修改失败!',[{text: '确定'},]);
         }
       }).catch((error) => {
         Alert.alert('提示','无法连接网络,请检查网络连接后重试!',[{text:'确定',onPress: ()=>{}}]);
       });
    }
   }
  onEditPhone() {
    this.setState({phoneIsEnable:!this.state.phoneIsEnable})
  }
  onEditEmail() {
    this.setState({emailIsEnable:!this.state.emailIsEnable})
  }
};

var styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  item:{
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  avatar: {
    width:ITEM_HEIGHT*0.8,
    height: ITEM_HEIGHT*0.8,
    borderRadius: ITEM_HEIGHT*0.4,
    marginLeft: 10,
    marginRight: 10,
  },
  leftText:{
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    color: '#333333',
  },
  rightText:{
    marginRight: 10,
    fontSize: 14,
    color: '#333333',
  },
  textInput:{
    flex : 1,
    fontSize: 14,
    width: 100,
    color: '#333333',
  },
  edit: {
    width: ITEM_HEIGHT*0.7,
    height: ITEM_HEIGHT*0.7,
  }

});
