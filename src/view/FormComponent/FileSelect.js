'use strict';
import React, {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';

import NavigationBar from '../Component/NavigationBar';
import FileManager from 'react-native-fs';
import Colors from '../../util/Colors';
import api from "../../Network/api";
import {Base64Encode,Base64Decode} from '../../util/Base64';

let deviceHeight = Dimensions.get('window').height-10;
let deviceWidth = Dimensions.get('window').width;
let root =  Platform.OS === 'ios'? `${FileManager.DocumentDirectoryPath}` : `/sdcard`;
let tipContent =  Platform.OS === 'ios'? '未发现附件,请把文件放置于该APP的Documents文件夹下!' : '未发现文件!';
let currentPath;
let currentFileNmae = '';


{
  var fileIcons = new Map();
  fileIcons.set('apk', require('../../../res/file/apk.png'));
  fileIcons.set('doc', require('../../../res/file/doc.png'));
  fileIcons.set('docx', require('../../../res/file/docx.png'));
  fileIcons.set('jpg', require('../../../res/file/jpg.png'));
  fileIcons.set('png', require('../../../res/file/png.png'));
  fileIcons.set('m4a', require('../../../res/file/m4a.png'));
  fileIcons.set('mp4', require('../../../res/file/mp4.png'));
  fileIcons.set('mp3', require('../../../res/file/mp3.png'));
  fileIcons.set('pdf', require('../../../res/file/pdf.png'));
  fileIcons.set('ppt', require('../../../res/file/ppt.png'));
  fileIcons.set('pptx', require('../../../res/file/pptx.png'));
  fileIcons.set('rar', require('../../../res/file/rar.png'));
  fileIcons.set('txt', require('../../../res/file/txt.png'));
  fileIcons.set('xls', require('../../../res/file/xls.png'));
  fileIcons.set('xlsx', require('../../../res/file/xlsx.png'));
  fileIcons.set('zip', require('../../../res/file/zip.png'));
  fileIcons.set('file', require('../../../res/file/unknow.png'));
  fileIcons.set('directory', require('../../../res/file/directory.png'));
}

export default class FileSelect extends React.Component{
  constructor(props){
    super(props);
    this.state={
      row: this.props.row,
      fileList: [],
      loadHeight: 0.1,
    };
    currentPath = `${root}`;
  }

  _renderFileItem(){
    if (this.state.fileList.length) {
        return this.state.fileList.map((rowData)=>{
          let icon;
          if(rowData.isDirectory()){
            icon = fileIcons.get('directory');
          }else{
            let ary = rowData.name.split('.');
            let end = ary[ary.length - 1].toLowerCase();
            if(end==='apk' || end==='doc' || end==='docx' || end==='jpg' ||
                end==='m4a' || end==='mp4' || end==='pdf' || end==='ppt' ||
                end==='pptx' || end==='rar' || end==='txt' || end==='xls' ||
                end==='xlsx' || end==='zip' || end==='png' || end==='mp3'){
              icon = fileIcons.get(end);
            }
            else{
              icon = fileIcons.get('file');
            }
          }
          return (
            <TouchableOpacity onPress={this.clickFile.bind(this,rowData)}>
              <View style={{height: 56,flexDirection: 'row',alignItems: 'center'}}>
                <Image source={icon} style={{width: 40,height: 40,marginLeft: 16,marginRight:16,marginTop:8,marginBottom: 8}}/>
                <Text>{rowData.name}</Text>
              </View>
            </TouchableOpacity>
          );
        });
      }else {
        return(
            <View style={[{flex: 1},{justifyContent: 'center'}]}>
                <Text numberOfLines = {0} style={styles.textStyle} >{tipContent}</Text>
            </View>
        );
      }
  }

  clickFile(rowData){
    if(rowData.isDirectory()){
      currentPath = rowData.path;
      this.refreshFileList();
    }else{
      Alert.alert('',`确认上传${rowData.name}?`,[{text:'上传',onPress: ()=>{
        this.setState({
          loadHeight: deviceHeight,
        });
        currentFileNmae = rowData.name;
        this.upload(rowData);
      }},{text:'取消',onPress: ()=>{}}])
    }
  }

  upload(data){
    let form = new FormData();
    let fileName = Base64Encode(data.name);
    form.append('model', 'form');
    form.append('fileName', data.name);
    form.append('files', {uri: `file://${data.path}`,type:'application/octet-stream',name: fileName});
   fetch(api.OFFICE_LIST_UPLOADFILE_URL,{
     body: form,
     method: "post",
     headers: {"Content-Type": "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d"}
   }).then((response) => {
     return response.json();
   }).then((responseData) => {
     if(currentFileNmae === responseData.fileName){
       this.setState({
         loadHeight:0.1,
       });
       if(responseData.code === 'success'){
         this.props.router.selectFile(responseData.path,data.name);
         this.props.navigator.pop();
       }else{
         Alert.alert('提示',responseData.msg,[{text: '确定',onPress: ()=>{}}]);
       }
     }
   }).catch((error) => {
     this.setState({
       loadHeight:0.1,
     });
     Alert.alert('提示','文件上传失败,请重新上传!',[{text: '确定',onPress: ()=>{}}]);
     console.log('error-->>',error);
   }).done();

  }


  refreshFileList(){ //刷新文件列表
    FileManager.readDir(currentPath).then((result)=>{
      let tempArr=[];
      for (var i = 0; i < result.length; i++) {
        if (result[i].name != '.DS_Store') {
          tempArr.push(result[i])
        }
      }
      this.setState({
        fileList: tempArr,
      });
    }).catch((error)=>{
      console.log(error);
    });
  }

  componentDidMount(){
    this.refreshFileList();
  }

  onLeftBack(){
    if (this.state.loadHeight === 0.1) {
        if(currentPath != root){
          let pathAry=currentPath.split('/');
          let newPath='';
          let i= 0;
          for(;i<pathAry.length-1;i++){
            if(pathAry[i] != ''){
              newPath=newPath+'/'+pathAry[i];
            }
          }
          currentPath = newPath;
          this.refreshFileList();
        }else{
          this.props.navigator.pop();
        }
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
      <NavigationBar title={'文件选择'} titleColor={Colors.white}
        backgroundColor={Colors.mainColor}
        leftButtonIcon={require('../../../res/office/icon-backs.png')}
        onLeftButtonPress={this.onLeftBack.bind(this)} />
        <ScrollView style={{position: 'absolute',flex:1,height: deviceHeight-60,width: deviceWidth}}>
          {this._renderFileItem()}
        </ScrollView>

        <View style={{position: 'absolute',height: this.state.loadHeight,width: deviceWidth,backgroundColor: 'rgba(0,0,0,0.6)',overflow: 'hidden'}}>
          <Image style={{width: deviceWidth,height:4}} source={require('../../../res/icon/loading.gif')}/>
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
            <Text style={{color: Colors.mainColor,fontSize: 18,fontWeight: '300'}}>正在上传,请稍候.....</Text>
            <TouchableOpacity style={{marginTop: 80,width: 200,height: 48,borderWidth: 1,backgroundColor:Colors.mainColor,borderColor: Colors.mainColor,borderRadius: 2,justifyContent: 'center'}}
              onPress={()=>{this.props.navigator.pop();}}>
              <Text style={{color: '#ffffff',textAlign: 'center',fontSize: 18,fontWeight: '300'}} >取消上传</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
  componentWillUnmount(){
    currentFileNmae = '';
  }
}

var styles = StyleSheet.create({
  textStyle:{
    marginLeft:10,
    marginRight:10,
    fontSize:16,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00',
  }
});
