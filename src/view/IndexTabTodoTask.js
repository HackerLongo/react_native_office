'use strict';

import React, {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
  Dimensions,
  BackAndroid,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
  Platform,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from "../Network/api.js";
import ToastAndroid from 'ToastAndroid';
import FormItemsFilter from './FormComponent/FormItemsFilter';
import TimerMixin from 'react-timer-mixin';
import SelectItem from "./Component/SelectItem";
import ModalCalendar from "./Component/ModalCalendar";
import DatePicker from "./Component/DatePicker";
import FilePicker from "./Component/FilePicker";
import JPush from 'react-native-jpush';

var navigation;
var jsonData = "{}";
var _this;
var tableData=[];
let isClick=false;
export default class IndexTabTodoTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
      keyboardSpace:0,
    };
      navigation = this.props.navigator;
    _this = this;
  }
  componentWillMount(){
      this.fetchData();
  }

  componentDidMount() {
    if (Platform.OS !=='ios') {
      JPush.setBadgerNumber(0);
    }
    //验证输入信息是否完整
    // mustToInputItems = {};
    // inputItems= [];
    //添加代理事件
    this.setState({keyboardSpace:0});
    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace)
    DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)
  }
  //页面移除代理
  componentWillUnmount () {
　　// TODO: figure out if removeAllListeners is the right thing to do
　　DeviceEventEmitter.removeAllListeners('keyboardWillShow')
　　DeviceEventEmitter.removeAllListeners('keyboardWillHide')
  }
  //更新键盘位置
    updateKeyboardSpace (frames) {
  　　const keyboardSpace =  frames.endCoordinates.height//获取键盘高度
  　　_this.setState({
  　　　　keyboardSpace: keyboardSpace,
  　　})
    }

    resetKeyboardSpace () {
  　　_this.setState({
  　　　　keyboardSpace: 0,
  　　})
    }

  fetchData() {
    var url = api.VIEWTASKFROM_URL + 'humanTaskId=' + this.props.router.taskId;
    // var url = 'http://101.231.57.244:10123/bpm/task/viewProcessTaskDeatil.do?processInstanceId=893008';
    console.log('url-->',url);
    fetch(url).then((response) => response.json()).then((responseData) => {
      tableData=responseData.listctrlVoList;
      this.setState({dataSource: responseData,});
    }).catch((error) => {
      // this.setState({isError:true});
      console.log('error=>>',error);
    }).done();
  }

  checkData(){
    let json = eval('('+jsonData+')');
    console.log('IndexTabTodoTask this.state.dataSource = ', this.state.dataSource);
    console.log('IndexTabTodoTask this.state.dataSource.content = ', this.state.dataSource.content);
    let ary = this.state.dataSource.content ? this.state.dataSource.content : [];
    console.log('IndexTabTodoTask ary = ', ary);
    let result = {msg: '', errorType: 0};
    for(let item of ary){
      if(item.required){ //判断必填想
        if( !json[item.name] || json[item.name] == ''){
          result.msg = `${item.title} 未填写,请填写后再提交!`;
          result.errorType = 1;  //未填写
        }
      }
      //类型检测,正则表达式来自后端,本人概不负责(包括身份证校验)
      if(json[item.name] && json[item.name] != ''){
        let checkType;
        if( !item.readOnly && item.detailType === 'email'){
          // checkType = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          checkType = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
          if(!checkType.test(json[item.name])){
            result.msg = `${item.title} 格式错误(为邮箱),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }

        if( !item.readOnly && item.detailType === 'int'){
          checkType = /^-?\d+$/;
          if(!checkType.test(json[item.name])){
            result.msg = `${item.title} 格式错误(为整数),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }
        if( !item.readOnly && item.detailType === 'float'){
          // checkType = /^(-?\d+)(\.\d+)?$/;
          checkType = /^\d+\.\d+$/;
          if(!checkType.test(json[item.name])){
            result.msg = `${item.title} 格式错误(为小数),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }

        if( !item.readOnly && item.detailType === 'idcard'){
          // checkType = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if(!this.checkIdcard(json[item.name])){
            result.msg = `${item.title} 格式错误(为身份证),请重新检查填写再提交!`;
            result.errorType = 2;  //格式错误
          }
        }
      }
    }
    return result;
  }

  checkIdcard(idcard) {
    let Errors=new Array(
      "验证通过!",
      "身份证号码位数不对!",
      "身份证号码出生日期超出范围或含有非法字符!",
      "身份证号码校验错误!",
      "身份证地区非法!"
    );
    let area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
    42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",
    81:"香港",82:"澳门",91:"国外"};
    let ereg;
    let Y;
    let JYM;
    let S;
    let M;
    let idcard_array = new Array();
    idcard_array = idcard.split("");
    /*地区检验*/
    if(area[parseInt(idcard.substr(0,2))]==null) {
      return false;
    }
    /*身份号码位数及格式检验*/
    switch(idcard.length){
      case 15:
          if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
            ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
          } else {
            ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
          }
          if(ereg.test(idcard)){
            return true;
          } else {
            return false;
          }
          break;

      case 18:
        //18位身份号码检测
        //出生日期的合法性检查
        if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
          ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
        } else {
          ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
        }
        if(ereg.test(idcard)){//测试出生日期的合法性
          //计算校验位
          S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
          + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
          + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
          + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
          + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
          + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
          + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
          + parseInt(idcard_array[7]) * 1
          + parseInt(idcard_array[8]) * 6
          + parseInt(idcard_array[9]) * 3 ;
          Y = S % 11;
          M = "F";
          JYM = '10X98765432';
          M = JYM.substr(Y,1);/*判断校验位*/
          if(M == idcard_array[17]){
            return true; /*检测ID的校验位*/
          } else {
            return false;
          }
        }
        else {
          return false;
        }
        break;
      default:
        return false;
    }
  }

  onCommit() {
    if(!jsonData || jsonData === '' || jsonData === '{}' || !this.state.dataSource){
      Alert.alert('提示','没有任何数据,无法提交!',[{text: '确定',onPress: ()=>{}}]);
      return;
    }
    if (isClick) {
      return;
    }
    isClick=true;
    let check = this.checkData();
    if(check.errorType == 1){
      isClick = false;
      Alert.alert('',`${check.msg}`,[{text: '确定',onPress : ()=>{}}]);
    }else if(check.errorType == 2){
      isClick = false;
      Alert.alert('',`${check.msg}`,[{text: '确定',onPress : ()=>{}}]);
    }else if( check.errorType == 0){
      let url= api.APPROVAL_TASK+'userId='+this.props.router.userId+'&humanTaskId='+this.props.router.taskId;
      fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         formData: jsonData,
         tableData: tableData,
       })
     }).then((response) =>{
       return response.json();
     }).then((responseData) => {
       isClick=false;
       if (responseData.code == 'success') {
         jsonData='';
         Alert.alert('','审批成功!',[{text: '确定',onPress: () =>{ navigation.pop();navigation.pop();}},])
       }else if (responseData.code =="failure") {
         Alert.alert('','审批失败!',[{text: '好', onPress: () =>{}},])
       }else {
         Alert.alert('','未知错误',[{text: '好', onPress: () =>{}},])
       }
      }).catch((error) => {
        isClick=false;
        console.log("error = " + error);
      }).done();
    }
  }

  setJson(name, value) {
    if (!jsonData)
    jsonData = "{}";
    var jsonObj = JSON.parse(jsonData);
    jsonObj[name] = value;
    jsonData = JSON.stringify(jsonObj)
    return jsonData;
  }

  handleUserInput(userInputKey, userInputValue) {
    this.setJson(userInputKey, userInputValue);
  }

  onClickTable(data,id){
    this.props.navigator.push({name: 'taskTable',tableData: data,callback: this.saveTableData,id: id});
  }

  saveTableData(data,id){
    tableData[id] = data;
  }

  render() {
    var formView;
    var titleName;
    var _refs = this.refs;
    var _state = this.state;
    var _this = this;
    var tableView;
    if (this.state.dataSource) {
      formView = this.state.dataSource.content.map(function(row) {
        return <FormItemsFilter row={row} refs={_refs} onUserInput={_this.handleUserInput.bind(_this)} navigator={_this.props.navigator}/>
      });
      let i = -1;
      tableView = this.state.dataSource.listctrlVoList.map((rowData)=>{
        i++;
        if (!rowData.readOnly) {
          return (
            <View style={{backgroundColor:'white',height:50,}}>
            <TouchableOpacity onPress={_this.onClickTable.bind(_this,rowData,i)} >
              <Text style={{alignSelf:'center',marginTop:20,marginBottom:20,color:'#36a9e1',fontSize:16,}}>{rowData.code}>></Text>
            </TouchableOpacity>
            </View>
          );
        }
        else {
          {
            return  this.state.dataSource.listctrlVoList.map((rowData) => {
              return (
            <View style={{backgroundColor:'white',height:50,}}>
                <TouchableOpacity onPress={() => {
                  this.props.navigator.push({name: 'readTable',tableData: rowData });
                }}>
                  <Text style={{alignSelf:'center',marginTop:20,marginBottom:20,color:'#36a9e1',fontSize:16,}}>{rowData.code}>></Text>
                </TouchableOpacity>
                </View>
              );
            });
          }
        }
      });

      titleName = this.state.dataSource.name;
    } else {
      formView = <View/>;
      titleName = '暂无内容'
    }

    return (
      <View style={styles.container}>
      <NavigationBar
        title='审批' titleColor={Colors.white}
        backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
        leftButtonIcon={require('../../res/office/icon-backs.png')}
        rightButtonTitle={'提交'} rightButtonTitleColor={'#fff'}
        onRightButtonPress={this.onCommit.bind(this)}/>
        <ScrollView style={styles.formViewContainer}
          automaticallyAdjustContentInsets={false}
          ref='keyboardView'
          keyboardDismissMode='interactive'
          contentInset={{bottom: this.state.keyboardSpace}}>
          <View>
            {formView}
            {tableView}
          </View>
        </ScrollView>
        <ModalCalendar ref={'modalcalendar'}/>
        <DatePicker ref={'datapicker'}/>
        <SelectItem ref={'selectItem'}/>
        <FilePicker ref={'filePicker'}/>
        {/**<ProgressHUD isVisible={this.state.is_hud_visible} isDismissible={false} overlayColor="rgba(0, 0, 0, 0.33)"/>**/}
      </View>
    );
  }

  onLeftBack() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 100,
    backgroundColor: Colors.mainBackground
  },
  formViewContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  calendarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  button: {
    height: 34,
    flexDirection: 'row',
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    borderRadius: 8,
    margin: 5,
    marginLeft: 30,
    marginRight: 30
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: Colors.white
  }
});
