'use strict';

import React, {Dimensions, ListView, Text, View, StyleSheet,Image,TouchableHighlight,TouchableOpacity,Platform} from 'react-native';

import Colors from '../util/Colors';
import api from "../Network/api.js";
import PostCell from "./PostCell/MessagePostCell";
import ToastAndroid from 'ToastAndroid';
import ViewPager from 'react-native-viewpager';
import LineItem from  './Component/LineItem';
let top = Platform.OS === 'ios'? 20: 0;


var dataBlob = [ {
    imageUrl: "ion|android-notifications",
    imageColor: "#ff3366",
    title: "通知公告",
    content: "通知消息提示",
    count: "0",
    icon:require('../../res/icon/icon-TZ.png'),
  }, {
    imageUrl: "ion|ios-bookmarks",
    imageColor: "#ffcc33",
    title: "待办",
    content: "待办信息",
    count: "0",
    icon:require('../../res/icon/icon-DB.png'),
  }, {
    imageUrl: "ion|android-notifications",
    imageColor: "#ff3366",
    title: "通讯录",
    content: "搜索查询通讯信息",
    count: "0",
    icon:require('../../res/icon/icon-addresslist.png'),
  }];

var IMGS = [];
var IMGSNUM =[];
{/*  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
  */}
var deviceWidth = Dimensions.get('window').width;
var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
var VPds = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1 !== p2,
});
export default class IndexTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(dataBlob),
      VPDateSource: VPds.cloneWithPages(IMGS),
      loaded : {false},
    };
  }
  componentWillUnmount()
{
  IMGS=[];
  IMGSNUM=[];
}
  componentWillReceiveProps(){
    this.fetchData();
  }
  componentDidMount() {
    this.fetchData();
     this.getNewsImage();
  }
  getNewsImage(){
      var url = api.NEW_GET;
      console.log(url);
      fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
      responseData.map(row => {
        // var imageSTR='http://10.14.2.185:8080/bpm/task/newsImage.do?path='+row.path
        // var imageSTR=api.NEW_GETIMAGE+row.path;
        // // console.log(imageSTR,row.id);
        // IMGS.push(imageSTR);
        // IMGSNUM.push(row.id);
      });
      // console.log('begin',responseData);
      for (var i = 0; i < responseData.length; i++) {
      responseData[i].path =api.NEW_GETIMAGE+responseData[i].path;
      }
      IMGS=responseData;
      this.setState({
          loaded:{true},
        VPDateSource: VPds.cloneWithPages(IMGS),
      })
        })
        .catch((error) => {

     }).done();
    }

  fetchData() {
    var url = api.TASKCOUNT_URL + 'userId=' + this.props.router.userId;
    fetch(url).then((response) => response.json()).then((responseData) => {
      dataBlob[1].count = responseData.count;
      this.setState({dataSource: ds.cloneWithRows(dataBlob)})
    }).catch((error) => {
      console.log("error = " + error);
    }).done();
  }

  _renderPage( data: Object, pageID: number | string,) {
    return (
      <TouchableOpacity onPress={this.newsClick.bind(this,data.id)} style={styles.newsClick}>
      <Image
        source={{uri: data.path}}
        style={styles.page} >
      </Image>
      </TouchableOpacity>
    );
  }
newsClick(newID)
{

  console.log(newID+'id'+newID);
    this.props.navigator.push({name: 'ShowDetail',userId:'',urlPath:api.TZDETIAL_URL+newID,ErrorInof:'页面打开失败',});
}
  render() {
    return (
      <View style={{flex : 1,}}>
        <View style={{height: 200,width: deviceWidth,marginTop: top}}>
          <ViewPager
            style={{backgroundColor: '#333'}}
            dataSource={this.state.VPDateSource}
            renderPage={this._renderPage.bind(this)}
            isLoop={true}
            autoPlay={true}/>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPostCell.bind(this)}
          style={styles.postsListView}/>
      </View>
    );
  }

  onAddressList(){
    this.props.navigator.push({
      name: 'searchaddress',
      userId: this.props.router.userId,
    });
  }

  renderPostCell(post) {
    if (post.title == '待办') {
      return (<PostCell onSelect= {() => { this.onTodoPress(); }} post={post}/>);
    } else if(post.title == '通知公告'){
       return (<PostCell onSelect= {() => { this.noticePress(); }} post={post}/>);
    }else if(post.title == '通讯录'){
       return (<PostCell onSelect= {() => { this.onAddressList(); }} post={post}/>);
    }else {
      return (<PostCell post={post}/>);
    }
  }
  noticePress() {
    this.props.navigator.push({name: "NoticeTar", data: this.state.responseData, userId: this.props.router.userId});
  }
  onTodoPress() {
    this.props.navigator.push({name: 'taskList', data: this.state.responseData, userId: this.props.router.userId, userName:this.props.router.userName,});
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBackground
  },
  loadingText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    color: Colors.darkblue
  },
  postsListView: {
    backgroundColor: Colors.veryLightGrey
  },
  page: {
    flex:1,
   width: deviceWidth,
 },
 newsClick:{
   flex:1,
 },
});
