'use strict'

import React, {
  Text,
  View,
  Navigator,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from '../Network/api';
import global from '../util/GlobalStorage';

export default class changePassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
    };
  }

  render() {
    return(
      <View style={styles.background}>
        <NavigationBar title={'修改密码'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor}
          leftButtonIcon={require('../../res/office/icon-backs.png')}
          onLeftButtonPress={this.onLeftBack.bind(this)}
          rightButtonTitle={'确认'} rightButtonTitleColor={'#fff'}
          onRightButtonPress={this.onRightCommit.bind(this)} />

        <TextInput
          secureTextEntry={true}
          clearButtonMode='while-editing'
          style={[styles.item,{marginTop:20,}]}
          onChangeText={(text) => this.setState({oldPwd: text})}
          placeholder={'旧密码'}/>

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
      </View>
    );
  }

  onLeftBack() {
    this.props.navigator.pop();
  }

  onRightCommit() {
    let reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
    if(this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmPwd === ''){
        Alert.alert("",'密码为空,请重新输入!',[{text: '确定', onPress: () =>{}},]);
    }else if (this.state.newPwd != this.state.confirmPwd ){
      Alert.alert("",'新密码两次输入不一致!',[{text: '确定', onPress: () =>{}}]);
    }else if(!reg.test(this.state.newPwd)){
      Alert.alert("",'新密码必须为8-16位,且包含字母、数字和特殊字符!',[{text: '确定', onPress: () =>{}}]);
    }else{
      fetch(api.PASSWORD_URL,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName:this.props.router.userName,
          oldPassword: this.state.oldPwd,
          newPassword: this.state.newPwd,
        })
      }).then((response) => response.json()).then((responseData) => {
        console.log('responseDat==>>',responseData);
        if(responseData.code == 'success'){
          Alert.alert("",'密码修改成功!请重新登陆',[{text: '确定', onPress: () =>{
            global.storage.save({
               key: 'userName',  //注意:请不要在key中使用_下划线符号!
               rawData: {
               },
             });
            this.props.navigator.popToTop();
          }}]);
        }　else if(responseData.code == 'failure'){
          Alert.alert('', responseData.msg,[{text: '确定', onPress: () => console.log('OK Pressed!')}]);
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
  }
});
