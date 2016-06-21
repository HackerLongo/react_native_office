'use strict';

import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Navigator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import AttachmentDownload from './Component/AttachmentDownload';
import Colors from '../util/Colors';
import PostCell from "./PostCell/TodoPostCell";
import api from "../Network/api.js";

export default class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableList: [],
      content: [],
      historicTasks: [],
      name: '',
      Path:'',
    };
  }


  _renderTableView(){
    return  this.state.tableList.map((rowData) => {
      return (
        <TouchableOpacity onPress={() => {
          this.props.navigator.push({name: 'readTable',tableData: rowData });
        }}>
          <Text style={{alignSelf:'center',marginTop:8,marginBottom:8,color:'#36a9e1',fontSize:16,}}>{rowData.code}>></Text>
        </TouchableOpacity>
      );
    });
  }

  _renderTaskView(){
    return this.state.content.map((rowData)=>{
      if (rowData.hide){
        return(<View></View>)
      }
      if(rowData.type === 'text' && rowData.detailType === 'file'){
        return ( <AttachmentDownload row={rowData} processInstanceId={this.props.router.processInstanceId} navigator={this.props.navigator}/> );
      } else if (rowData.type === 'text' && rowData.detailType === 'linked_process_no') {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 8,marginRight: 4,marginTop:5,textAlign: 'right',color: '#333',fontSize:15,}}>{rowData.title}:</Text>
            <TouchableOpacity onPress={()=>{console.log('linked_process_no-->>',rowData);
                this.props.navigator.push({
                  name: 'taskDetail',
                  type: 'link',
                  userId: this.props.router.userId,
                  userName:this.props.router.userName,
                  nickName: this.props.router.nickName,
                  linkedProcessNo: rowData.content,
                });}}>
              <Text style={{marginLeft: 4,color: '#317ef3',marginRight:8,fontSize:15,marginTop:5,flex:1,}} multiline={true}>{rowData.content}</Text>
            </TouchableOpacity>
          </View>
          );
      }else {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginLeft: 8,marginRight: 4,marginTop:5,textAlign: 'right',color: '#333',fontSize:15,}}>{rowData.title}:</Text>
            <Text style={{marginLeft: 4,color: '#999',marginRight:8,fontSize:15,marginTop:5,flex:1,}} multiline={true}>{rowData.content}</Text>
          </View>
          );
        }
    });
  }
  _renderHistoricView(){
    return this.state.historicTasks.map((rowData)=>{
      if(rowData.deleteReason === '跳过')
        return;
      return (
        <View style={{flexDirection: 'row', }}>
          <View style={{position: 'absolute',flex: 1,width: 1,height:1000,marginLeft:27,backgroundColor:'#ccc',}}/>
          <View style={{width: 56,alignItems: 'center',elevation: 2}}>
            <Image style={{marginTop: 8,width: 48,height: 48,borderRadius: 24,borderWidth: 2,borderColor: '#fff',}} source={require('../../res/icon/icon-avatar.png')}/>
          </View>
          <View style={{marginTop: 14,elevation: 2}}>
            <Image source={require('../../res/icon/icon-arrow.png')} style={{width: 5,height: 10,}}/>
          </View>
          <View style={{flex: 1,marginTop:8,marginBottom:8,marginRight: 8,padding: 8,backgroundColor:'#fff', borderRadius:2, elevation: 2}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
              <View style={{flexDirection: 'row',alignItems: 'center',}}>
                <Text style={{color: '#333',fontSize: 15,}}>{rowData.assignee}</Text>
              </View>
              <Text style={{fontSize: 15,marginTop:2,color: '#999',}}>{rowData.endTime}</Text>
            </View>
            <View style={{marginTop:4,}}>
              <Text style={{fontSize: 12,marginRight: 8}}>{rowData.approvalRemark}</Text>
              <Text style={{fontSize: 13,color: '#444',alignSelf: 'flex-end'}}>{rowData.approvalComments}</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  _renderFAB(){
    if(this.props.router.type === 'approval'){
      return (
        <TouchableOpacity style={{width: 56,height: 56,borderRadius: 28,backgroundColor: Colors.mainColor,position: 'absolute',bottom: 10,right: 10,elevation: 4,justifyContent: 'center',alignItems: 'center'}} onPress={this.onDetail.bind(this)}
          onLongPress={()=>console.log('长按隐藏图标,未处理')}>
          <Image style={{width: 32,height: 32}} source={require('../../res/icon/icon-fb-edit.png')}/>
        </TouchableOpacity>
      );
    }else{
      return (<View/>);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'任务详情'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>

        <ScrollView style={{backgroundColor: '#EFEFEF',}}>
          <View style={{backgroundColor: 'white',margin: 8,borderRadius: 2,elevation: 3,padding: 8}}>
            <Text style={{color: '#111',margin: 8,marginTop:16,fontSize:20,textAlign:'center',}}>{this.state.name}</Text>
            <View>
              {this._renderTaskView()}
            </View>
            {this._renderTableView()}
          </View>
          <View style={{}}>
            {this._renderHistoricView()}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center',marginBottom: 8,}}>
            <View style={{width: 10,height: 10,borderRadius: 5,borderWidth: 2,borderColor: Colors.mainBackground,backgroundColor:'#ccc',marginLeft: 22,}}/>
            <Text style={{marginLeft: 8,color: '#333',fontSize:15,}}>发起申请</Text>
          </View>
        </ScrollView>
        {this._renderFAB()}
      </View>
    );
  }

  componentDidMount(){
      var url;
      if (this.props.router.type === 'link') {
        url =api.LINK_TASK+'linkedProcessNo='+this.props.router.linkedProcessNo;
      } else {
        url =api.TASKDETAIL_URL+'processInstanceId='+this.props.router.processInstanceId;
      }
      console.log('TaskDetail==>>',url);
      fetch(url).then((response) => response.json()).then((responseData) => {
          if (responseData.formData) {
              this.setState({
                  content: responseData.formData.content?responseData.formData.content: [],
                  historicTasks: responseData.historicTasks?responseData.historicTasks:[] ,
                  name: responseData.formData.name?responseData.formData.name: '' ,
                  tableList: responseData.formData.listctrlVoList?responseData.formData.listctrlVoList:[] ,
              });
          }
      }).catch((error)=>{

      }).done();
  }

    onDetail(){
        this.props.navigator.push({
            name: "viewtodotask",
            taskId: this.props.router.taskId,
            userId: this.props.router.userId,
            userName:this.props.router.userName,
            nickName: this.props.router.nickName,
        });
    }

  onLeftBack() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  postsListView: {
    backgroundColor: Colors.mainBackground,
  },
  tableCell: {
    height: 48,
    width: 96,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
