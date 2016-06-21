'use strict';
import React, {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import global from './GlobalStorage';
import api from "../Network/api.js";
import FileManager from 'react-native-fs';
import {Base64Encode,Base64Decode} from './Base64';
export default class SDImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      url:this.props.url,
      placeholder:this.props.placeholder,
      Image:'',
      isCache:{false},
      height:this.props.height,
      width:this.props.width,
    };
  }
  render() {
    return(
      <Image style={{width:48,height: 48,borderRadius: 24,borderWidth: 2,borderColor: '#fff',}} source={this.state.Image?this.state.Image:this.state.placeholder}/>
    );
  }
  componentWillMount()
  {
          this._checkFile()
  }
  getAvatar(){
    let folderPath = FileManager.DocumentDirectoryPath+'/photo';
    let avatarPath = `${FileManager.DocumentDirectoryPath}/avatar/`;
    FileManager.mkdir(`${avatarPath}`);
    let  avatarNmae = (new Date()).getTime();
    let fileName  = Base64Encode(this.state.url)
    FileManager.downloadFile(this.props.url,`${avatarPath}${avatarNmae}.png`).then((success)=>
    {
      let avatar = {uri: `file://${avatarPath}${avatarNmae}.png`};
      this.setState({Image:avatar});
      global.storage.save({
        key: "fileName",
        id: '1',
        rawData: avatar,
      });
    }).catch((error)=>{
      console.log('error-->',error);
    });

  }
  _checkFileExists(filePath)
  {
      if (filePath.uri) {
      FileManager.exists(filePath.uri)
      .then((exists)=>{
        if (exists) {
            this.setState({Image:filePath});
        }
          else {
              this.getAvatar()
        }
         }).catch((err)=>{
        console.log('err',err);
      })
    }
    else {
        this.getAvatar()
    }
}

  _checkFile()
  {
    let fileName = Base64Encode(this.props.url);
    global.storage.load({
      key: "fileName",
      id:'1',
    }).then((ret)=>{
      if (ret.uri) {
        this._checkFileExists(ret)
      }
      else {
          this.getAvatar()
      }
    }).catch((err)=>{
      console.log('error==>',err);
        this.getAvatar()
    })
  }
}
