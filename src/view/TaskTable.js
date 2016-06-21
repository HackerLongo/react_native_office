'use strict'
import React, {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  DeviceEventEmitter,
  Platform,
} from 'react-native';

import Colors from '../util/Colors';
import TableItemFilter from './TableComponent/TableItemFilter';
import ModalCalendar from './Component/ModalCalendar';
import NavigationBar from './Component/NavigationBar';
import DatePicker from './Component/DatePicker';

var currentData = {}; //当前选中行的数据,由于不方便直接操作state,缓存当前数据,
var tableCache = {};
var _refs;
var _this;
export default class TaskTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tableData:  {titleVo:[],data:[]},
      currentLine: {},
      editting: false,
    };
    _this=this;
  }

  setJson(name, value) {
    currentData = this.state.currentLine;
    currentData[name] = value;
    this.setState({currentLine: currentData});
  }

  deleteJson(name) {
    if (!currentData)
      return null;
    delete currentData[name];
    this.setState({currentLine: currentData});
  }

  handleUserInput(userInputKey, userInputValue) {
    if (userInputValue == '') {
      this.deleteJson(userInputKey);
      return;
    }
    this.setJson(userInputKey, userInputValue);
  }

  componentDidMount(){
    this.setState({
      tableData: this.props.router.tableData ,
    });
    DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace)
    DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace)
  }
  componentWillUnmount () {
　　// TODO: figure out if removeAllListeners is the right thing to do
　　DeviceEventEmitter.removeAllListeners('keyboardWillShow')
　　DeviceEventEmitter.removeAllListeners('keyboardWillHide')
  }
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
  onLeftBack(){
    this.props.router.callback(this.state.tableData,this.props.router.id);
    this.props.navigator.pop();
  }

  onSum(key){
    let sum = 0;
    tableCache.data.map((rowData)=>{
      if(rowData[key] != undefined && rowData[key] != ''){
        sum += parseFloat(rowData[key])
      }
    });
    sum = sum.toFixed(3);
    Alert.alert('',`${key}合计:${sum}`,[{text: '确定',}]);
  }

  _renderTableInput(){
    return(
      this.state.tableData.titleVo.map((rowData)=>{
        let value = this.state.currentLine[rowData.title];
        return (
          <TableItemFilter row={rowData} onUserInput={this.handleUserInput.bind(this)} value={value} refs={_refs}/>
        );
      })
    );
  }

  _renderTableTitle(){
    // 表格的标题单元格
    if(this.state.tableData.titleVo){
      return (
        this.state.tableData.titleVo.map((rowData)=>{
          if(rowData.type && rowData.type === 'int'){
            return (
              <View style={styles.cell}>
                <TouchableOpacity onPress={this.onSum.bind(null,rowData.title)}>
                  <Text style={{color: Colors.mainColor}}>{rowData.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }else{
            return (
              <View style={styles.cell}>
                <Text >{rowData.title}</Text>
              </View>
            );
          }
        })
      );
    }else {
      return (<View/>);
    }
  }

  _renderTableBody(){
    var lineID = -1;
    return (
      this.state.tableData.data.map((rowData)=>{
        lineID++;
        var item = this.state.tableData.titleVo.map((row)=>{
          let key = row.title;
          let value = rowData[key]?rowData[key]:'';
          return (
            <TouchableOpacity onPress={()=>{
              Alert.alert('',`${key} \n ${value}`,[{text: '确定',}])
            }}>
              <View style={styles.cell}>
                <Text >{rowData[key]}</Text>
              </View>
            </TouchableOpacity>
          );
        });
        return(
          <View style={{flexDirection: 'row'}}>
          <View style={[styles.cell,{flexDirection: 'row',justifyContent: 'space-around'}]}>
            <TouchableOpacity style={{width: 32,height: 32}} onPress={this.onDeleteLine.bind(this,lineID)}>
              <Image style={{width: 32,height: 32}} source={require('../../res/icon/sq_icon_del.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 32,height: 32}} onPress={this.onEditLine.bind(this,lineID)}>
              <Image style={{width: 32,height: 32}} source={require('../../res/icon/sq_icon_edit.png')}/>
            </TouchableOpacity>
          </View>
            {item}
          </View>
        );
      })
    );
  }
_renderModel()
{
  if (Platform.OS=='ios') {
    return(<DatePicker ref={'datepicker'}/>  )
  }
  else {
    return(<ModalCalendar ref={'modalcalendar'}/>)
  }

}
  render() {
    _refs = this.refs;
    tableCache = this.state.tableData;
    var titleName = this.state.tableData.code? this.state.tableData.code: '';
    return(
      <View style={styles.background}>
        <NavigationBar
          title={titleName} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>
        <ScrollView showsHorizontalScrollIndicator={true}
         ref='keyboardView'
         keyboardDismissMode='interactive'
        　contentInset={{bottom: this.state.keyboardSpace}}>
          <View>
            {this._renderTableInput()}{/**用户输入项 **/}
            <View style={{flexDirection: 'row',height: 48,justifyContent: 'space-between',}}>
              <TouchableOpacity style={{flex: 1,margin:8,backgroundColor: Colors.mainColor,borderRadius:2,alignItems: 'center',justifyContent: 'center'}}
                onPress={this.onAddLine.bind(this)}>
                <View style={{}}>
                  <Text>清空</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1,margin:8,backgroundColor: Colors.mainColor,borderRadius:2,alignItems: 'center',justifyContent: 'center'}}
                onPress={this.onSavaToTableData.bind(this)}>
                  <Text >存表</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <View style={{padding: 8}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.cell}>
                    <Text>操作</Text>
                  </View>
                  {this._renderTableTitle()}
                </View>
                {this._renderTableBody()}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {this._renderModel()}

      </View>
    );
  }

  savaTable(){
    if(this.state.editting){
      this.setState({editting: false})
    }else{
      tableCache.data.push(currentData);
    }
    currentData = {};
    this.setState({
      tableData: tableCache,
      currentLine: {},
    });
  }


  onSavaToTableData(){
    if(JSON.stringify(currentData) === '{}'){
      Alert.alert('提示','当前行没有任何数据,确定提交?',[{text: '确定',onPress: ()=>{this.savaTable()}},{text: '取消',onPress: ()=>{}}]);
    }
    else{
      this.savaTable();
    }
  }

  onDeleteLine(lineID){
    tableCache.data.splice(lineID,1);
    this.setState({
      tableData: tableCache,
    });
  }

  onEditLine(lineID){
    let lineData = this.state.tableData.data[lineID];
    this.setState({
      currentLine: lineData,
      editting: true,
    });
  }

  onAddLine(){
    currentData = {};
    this.setState({
      currentLine: {},
    });
  }
};

var styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  cell: {
    width: 112,
    height: 48,
    borderWidth: 1,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
