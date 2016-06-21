'use strict'

import React, {
  Text,
  View,
  Navigator,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from '../Network/api';

export default class ChangeForFirst extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newPwd: '',
      confirmPwd: '',
      phoneNumber: '',
      email: '',
    };
  }

  render() {
    return(
      <View style={styles.background}>
        <NavigationBar title={'欢迎登陆'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor}
          onLeftButtonPress={this.onLeftBack.bind(this)}
          rightButtonTitle={'确认'} rightButtonTitleColor={'#fff'}
          onRightButtonPress={this.onRightCommit.bind(this)} />
          <ScrollView>
          <View style={{backgroundColor: Colors.mainBackground,height: 1,}}
          />
          {/*手机号码*/}
        <Text style={{marginTop:10,}}>设置您的手机号码</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          selectTextOnFocus={this.state.phoneIsEnable}
          style={[styles.item,{marginTop:10,}]}
          defaultValue={this.state.phoneNumber}
          editable={this.state.phoneIsEnable}
          onChangeText={(text) => this.setState({phoneNumber:text})}
          placeholder={'请输入您的手机号码'}
          value={this.state.text}
        />
      <View style={{backgroundColor: Colors.mainBackground,height: 1,}}/>
        {/*电子邮箱*/}
        <Text style={{marginTop:10,}}>设置您的电子邮箱</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          selectTextOnFocus={this.state.emailIsEnable}
          style={[styles.item,{marginTop:10,}]}
          defaultValue={this.state.email}
          editable={this.state.emailIsEnable}
          onChangeText={(text) => this.setState({email:text})}
          placeholder={'请输入您的邮箱'}
          value={this.state.text}
        />
        <Text style={{marginTop:10,}}>修改登陆密码</Text>
        <TextInput
          secureTextEntry={true}
          clearButtonMode='while-editing'
          style={[styles.item,{marginTop:20,}]}
          onChangeText={(text) => this.setState({newPwd: text})}
          placeholder={'新密码'}/>
        <View style={styles.line}/>
        <TextInput
          clearButtonMode='while-editing'
          secureTextEntry={true}
          style={styles.item}
          onChangeText={(text) => this.setState({confirmPwd: text})}
          placeholder={'确认密码'}/>
            <Text style={{marginTop:10, color:Colors.mainColor,fontSize:12}}>注:首次登陆,请完善个人信息并修改初始登陆密码</Text>
          </ScrollView>
      </View>
    );
  }
  onRightCommit1111111(){

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

  onLeftBack() {
    this.props.navigator.pop();
  }

  onRightCommit() {
    let CheckEmail  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let CheckPhone =/^1[34578]\d{9}$/;
    let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
    if (! CheckPhone.test(this.state.phoneNumber) || this.state.phoneNumber == '' ){
      Alert.alert('','您的手机号码不正确!',[{text: '确定'},]);
    }
    else if (!CheckEmail.test(this.state.email) || this.state.email == ''){
      Alert.alert('','您的邮箱不正确!',[{text: '确定'},]);
    }
    else if (this.state.newPwd != this.state.confirmPwd ){
      Alert.alert("",'新密码两次输入不一致!',[{text: '确定', onPress: () =>{}}]);
    }
    else if(!reg.test(this.state.newPwd)){
      Alert.alert("",'新密码必须为8-16位,且包含字母、数字和特殊字符!',[{text: '确定', onPress: () =>{}}]);
    }
    else{
      fetch(api.PASSWORD_URL,{
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
        body: JSON.stringify({
          telephone:this.state.phoneNumber,
          email:this.state.email,
          userName:this.props.router.userName,
          oldPassword: 'zq.12345',
          newPassword: this.state.newPwd,
        })
      }).then((response) =>{
         return response.json();
      }).then((responseData) => {
        console.log("responseData",responseData);
         if(responseData.msg_email =="修改邮箱成功"){
           Alert.alert('','密码修改成功,请重新登陆',[{text: '确定', onPress: () =>{this.props.navigator.popToTop();}},]);
         }else if(responseData.code == 'failure'){
           Alert.alert('','个人信息修改失败!',[{text: '确定'},]);
         }
       }).catch((error) => {
         Alert.alert('提示','无法连接网络,请检查网络连接后重试!',[{text:'确定',onPress: ()=>{}}]);
       });
    }
  }
};

var styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  item:{
    height: 48,
    backgroundColor: Colors.white,
  },
  line:{
    height: 1,
    backgroundColor: '#ccc',
  },
  textInput:{
    marginTop:20,
    flex : 1,
    fontSize: 14,
    width: 100,
    height:48,
    color: '#333333',
  },
});
