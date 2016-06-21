'use strict';

import React, {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import FileManager from 'react-native-fs';
import api from "../../Network/api.js";
var RNFS = require('react-native-fs');
import Intent from 'react-native-android-intent';
var ScanFile = require('NativeModules').ScanTXTFile;
let path = Platform.OS === 'ios' ? `${FileManager.DocumentDirectoryPath}/attachment/`:'/sdcard/attachment/';
let filePath;


export default class AttachmentDownload extends React.Component{
  constructor(props){
    super(props);
    this.state={
      row: this.props.row,
      fileState: this.props.row.content?'立即下载':'',
    };
    filePath = path+this.props.processInstanceId+'/';
  }

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginLeft: 8,marginRight: 4,marginTop:5,textAlign: 'right',color: '#333',fontSize:15,}}>{this.state.row.title}:</Text>
        <TouchableOpacity onPress={this.clickFile.bind(this)}>
          <Text style={{marginLeft: 4,color: '#317ef3',marginRight:8,fontSize:15,marginTop:5,flex:1, }} multiline={true}>{this.state.fileState}</Text>
        </TouchableOpacity>
      </View>);
  }

  componentDidMount(){
    if(this.state.row.content && this.state.row.content != ''){
      FileManager.readDir(`${filePath}`).then((result) => {
        for (let i = 0; i < result.length; i++) {
          if (this.state.row.fileName === result[i].name) {
            this.setState({fileState:'立即查看',})
          }
        }
      }).catch((err) => {

      });
    }
  }

  clickFile(){
    let fileName = this.state.row.fileName;
    if(this.state.fileState === ''){
      return;
    }
    if(this.state.fileState === '立即查看'){

      if( Platform.OS === 'ios'){
        let arr = fileName.split(".");
        if (arr[arr.length-1] === 'txt') {
          let txtpath = `${filePath}${fileName}`;
          txtpath = FileManager.DocumentDirectoryPath+'/傲慢与偏见(Pride_and_Prejudice)中英文对照.txt';
          ScanFile.scanFile(txtpath);
        }else {
          this.props.navigator.push({name: 'ShowDetail',urlPath:`${filePath}${fileName}`,ErrorInof:`暂时不支持文件查看,文件路径 \n${fileName}`,});
        }

      }else{
        let openPath = `${filePath}${fileName}`;
        Intent.open(openPath, (isOpen) => {
          if(isOpen) {
            console.log("Can open");
          }else {
            Alert.alert('提示',`手机未安装可以打开${fileName}的APP,请将${filePath}${fileName}复制到其他设备查看!`,[{text: '确定',onPress: ()=>{}}]);
          }
        });
      }
    }

    if(this.state.fileState === '立即下载' || this.state.fileState === '下载失败,请重新下载...' ){
      this.setState({
        fileState: '下载中....',
      });
      let url = api.OFFICE_LIST_DOWNLOADFILE_URL+this.state.row.content;
      FileManager.mkdir(filePath).then(()=>{
        FileManager.downloadFile(url,`${filePath}${fileName}`).then((success)=>{
          this.setState({
            fileState: '立即查看',
          });
        }).catch((error)=>{
          this.setState({
            fileState: '下载失败,请重新下载...',
          });
        });
      }).catch((error)=>{
      });
      return;
    }


  }
}
