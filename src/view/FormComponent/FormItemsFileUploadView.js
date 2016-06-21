'use strict';
import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

var Colors = require('../../util/Colors');

export default class FormItemsFileUploadView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      fileName:'',
    };
  }

  selectFile(result,fileName){
    this.props.onUserInput(this.state.row.name, result);
    this.props.onUserInput(`${this.state.row.name}OriginalFileName`, fileName);
    this.setState({
      fileName: fileName,
    });
  }

  render() {
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>

        <View style={[styles.contentContainer]}>
          <Text numberOfLines={1} allowFontScaling={true} style={styles.content}>
          {this.state.fileName}
          </Text>
        </View>

        <TouchableOpacity onPress={()=>{this.props.navigator.push({name: 'fileSelect',selectFile:this.selectFile.bind(this)}); }}>
          <Image source={require('../../../res/icon/sq_icon_upload.png')} style={styles.pic} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          if(this.state.fileName && this.state.fileName != ''){
            Alert.alert('','确定删除该附件?',[{text: '确定',onPress: ()=>{
              this.selectFile('','');
            }},{text: '取消',onPress: ()=>{}}]);
          }
        }}>
          <Image source={require('../../../res/icon/sq_icon_del.png')} style={styles.pic} />
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount(){
    if(this.state.row.content && this.state.row.fileName){
      this.selectFile(this.state.row.content,this.state.row.fileName);
    }
  }

}

var formComponentStyles = require('./styles');
var styles = StyleSheet.create({
  contentContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    marginRight:10,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,

  },
  content: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    alignItems: 'center',
    width: 180,
  },
  pic:{
    marginRight:16,
    alignItems: 'center',
    height:32,
    width:32,
  },

});
