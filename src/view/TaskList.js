'use strict';

import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Navigator,
  BackAndroid,
  ListView,
  TouchableOpacity,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import PostCell from "./PostCell/TodoPostCell";
import api from "../Network/api";

var initData = [];
var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(initData),
      loaded:false,
    };
  }

  onPress(post) {
    this.props.navigator.push({
      name: 'taskDetail',
      type: 'approval',
      taskId: post.taskId,
      processInstanceId: post.processInstanceId,
      userId: this.props.router.userId,
      userName:this.props.router.userName,
      nickName: this.props.router.nickName,
    });
  }
  componentWillReceiveProps(){
    this.featch();
  }

  componentDidMount(){
      console.log('componentDidMount');
      this.featch();
  }

  featch(){
    var url =api.TASKLIST_URL+ 'userId='+this.props.router.userId;
    console.log('TASKLIST_URL',url);
    fetch(url).then((response) => response.json()).then((responseData) => {
      if (responseData) {
        this.setState({dataSource: ds.cloneWithRows(responseData),loaded:true,});
      }
    }).catch((error)=>{

    }).done();
  }
  render() {
    if (this.state.loaded) {
      return (
        <View style={styles.container}>
          <NavigationBar
            title={'待办'} titleColor={Colors.white}
            backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
            leftButtonIcon={require('../../res/office/icon-backs.png')}/>
          <ListView dataSource={this.state.dataSource} renderRow={this.renderPostCell.bind(this)} style={styles.postsListView}/>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <NavigationBar
            title={'待办'} titleColor={Colors.white}
            backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
            leftButtonIcon={require('../../res/office/icon-backs.png')}/>
          <Text style={{alignSelf:'center',}}>数据加载中..</Text>
          </View>
      );
    }

  }

  renderPostCell(post) {
    return (<PostCell post={post} onSelect={post => this.onPress(post)}/>);
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
  }
});
