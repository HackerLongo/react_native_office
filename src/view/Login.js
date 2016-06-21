'use strict';

import React, {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  Alert,
  Platform,
  InteractionManager,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Colors from '../util/Colors';
import api from "../Network/api.js";
import FileManager from 'react-native-fs';
import global from '../util/GlobalStorage';
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
import JPush from 'react-native-jpush';
let isLogining = false;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      PhotoPath: '',
      loadHeight:0.1,
      ShowModel:false,
    };
  }
  //状态改变的时候直接把model隐藏
  componentWillReceiveProps() {
    this.setState({ShowModel:false,})
  }
  getAvatar(responseData){
    let url=api.PHOTO_DOWN+responseData.userId+"&width="+'160';
    let folderPath = FileManager.DocumentDirectoryPath+'/photo';
    // let avatarPath = Platform.OS === 'ios'?`${FileManager.DocumentDirectoryPath}/avatar/`:'/storage/emulated/0/bpm/avatar/';
    let avatarPath = `${FileManager.DocumentDirectoryPath}/avatar/`;
    FileManager.mkdir(`${avatarPath}`);
    let avatarNmae = (new Date()).getTime();
    FileManager.downloadFile(url,`${avatarPath}${avatarNmae}.png`).then((success)=>{
      let avatar = {uri: `file://${avatarPath}${avatarNmae}.png`, isStatic: true};
      global.storage.save({
        key: 'avatar',
        id: '1',
        rawData: avatar,
      });
      global.storage.save({
         key: 'userName',  //注意:请不要在key中使用_下划线符号!
         rawData: {
           userid: responseData.userId,
           nickName:responseData.nickName,
           userName: this.state.username,
           password: this.state.password,
           post:responseData.post, //岗位
           dept: responseData.dept, //部门
           companyName: responseData.companyName, //公司
           email:responseData.email,
           telephone:responseData.telephone
         },
       });
      JPush.setAlias(this.state.username);
      isLogining =false;
      // this.state = {
      //   ShowModel:false,
      // };
      // console.log('this.state.username-->>'+this.state.username);
      this.props.navigator.push({name:"main", userId:responseData.userId,nickName:responseData.nickName,userName:this.state.username,});
    }).catch((error)=>{
      isLogining =false;
      console.log('error-->',error);
    });
  }
  onLogin(){
    if(isLogining){
      return;
    }
    isLogining = true;
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {

      });
    }, 1000);
    //更改遮罩状态为显示
    this.setState({
      loadHeight:24,
      ShowModel:true,
    });
      var url = api.LOGIN_URL;
      console.log('url=>LOGIN_URL',url);
      fetch(url,{ method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },body: JSON.stringify({
          userName: this.state.username,
          password: this.state.password,
        })
       })
      .then((response) => {
        return response.json();
      }).then((responseData) => {
        console.log(responseData);
        if(responseData.code === 'success'){
          if (responseData.firstLogin) {
            this.props.navigator.push({name:"ChangeForFirst",userName:this.state.username,});
          }
          else {
           this.getAvatar(responseData);
          }
          //用户名密码存储
        }else if(responseData.code === 'failure'){
          isLogining =false;
          //更改遮罩状态为隐藏
          this.setState({
            loadHeight:0.1,
            ShowModel:false,
          })
          Alert.alert('','用户名/密码错误!',[{text: '确定'},])
        }
      }).catch((error) => {
        isLogining =false;
        this.setState({
            loadHeight:0.1,
            ShowModel:false,
        });
        console.log('error-->>',error);
        Alert.alert('','网络异常!',[{text: '确定', onPress: () =>{}}])
      }).done();
  }
  render() {
    return (
      <View style={styles.container}>
        < View style={{alignItems:'center',marginTop:32}}>
          <Image style={{width: 90,height: 90,margin: 8,borderRadius:0,}} source={require('../../res/icon/logo.png')}/>
        </View>
        <View style={{margin:16,backgroundColor:'#fff',elevation: 4}}>
          <View style={{flexDirection: 'row',height: 48,alignItems: 'center'}}>
            <Image style={{width: 32,height: 32,margin: 8}} source={require('../../res/icon/icon-user.png')}/>
            <TextInput  style={{height: 48,flex: 1}}
              placeholder={'请输入用户名'}
              value={this.state.username}
              underlineColorAndroid={'transparent'}
              onChangeText={(text)=>this.setState({username: text})}
              autoCapitalize={'none'}
              autoCorrect={false}/>
          </View>
          <View style={{marginLeft:8,height:1,backgroundColor:'#ccc',marginRight: 8}}/>
          <View style={{flexDirection: 'row',height: 48,backgroundColor: 'white',alignItems: 'center'}}>
            <Image style={{width: 32,height: 32,margin: 8}} source={require('../../res/icon/icon-lock.png')}/>
            <TextInput style={{height: 48,flex: 1}}
              placeholder={'请输入密码'}
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text)=>this.setState({password: text})}/>
          </View>
        </View >
        <View style={{marginTop: 32,marginLeft: 16,marginRight:16,elevation: 4,backgroundColor:this.ShowModel?Colors.mainColor:"#f57c00"}}>
          <TouchableHighlight
            onPress={this.onLogin.bind(this)}
            underlayColor={'#f57c00'}
            style={{height: 48,alignItems: 'center',justifyContent:'center'}}>
            <View style={{flexDirection:'row',alignItems: 'center',}}>
                <Text style={{fontSize: 16,color: 'white',fontWeight: '300',}}>登        录</Text>
                <Image style={{height: this.state.loadHeight,width: this.state.loadHeight, marginLeft:8,}} source={require('../../res/icon/loginLoading.gif')}/>
            </View>
          </TouchableHighlight>
        </View>

        <Modal
          animated={false}
          transparent={true}
          visible={this.state.ShowModel}>
          <View style={{height:deviceHeight,width:deviceWidth}}>
          </View>
        </Modal>
        <Text style={{marginTop:200,textAlign:'center', color:'#111',fontSize:12,}}>如有任何疑问，发送邮件至</Text>
          <Text style={{marginTop:10, textAlign:'center',color:'#111',fontSize:12,}}>zq-help@outlook.com</Text>
      </View>
    );
  }

  setAotoLogin() {
    global.storage.load({
      key: 'userName',
    }).then((ret)=>{
      if (ret.userName && ret.password){
        this.setState({
          username: ret.userName,
          password: ret.password,
        });
        this.onLogin();
      }
    }).catch((err)=>{
      console.log('ret--error==>',err);
    })
  }

  componentDidMount() {
    this.setAotoLogin();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
});
