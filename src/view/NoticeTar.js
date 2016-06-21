'use strict'
import React,
{
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
View,
} from 'react-native';

import api from "../Network/api.js";
import Colors from '../util/Colors';
import NavigationBar from './Component/NavigationBar';
import iconNext from '../../res/icon/icon-next.png';
import iconTZ from '../../res/icon/icon-TZ.png';
var deviceHeight = Dimensions.get('window').height;
var itemHeight = 60;

export default class NoticeTar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
    };
        this.renderNews = this.renderNews.bind(this);
  }
  onLeftBack() {
    this.props.navigator.pop();
  }
  goToNext(cmsId) {
    this.props.navigator.push({name: 'ShowDetail',userId:cmsId,urlPath:api.TZDETIAL_URL+cmsId,ErrorInof:'页面打开失败',});
  }
  fetchDataNoticeList() {
    console.log(api.TZ_URL);
    fetch(api.TZ_URL)
    .then((response)=>response.json())
    .then((responseData)=>{
      if (responseData.contentList) {
            this.setState({dataSource:this.state.dataSource.cloneWithRows(responseData.contentList),loaded:true,});
      }

    }).catch((error)=>{
      console.log('fetchDataNoticeList',error);
    }).done();
  }
  componentDidMount() {
    this.fetchDataNoticeList();
  }
  renderNoticeListView()
  {
    return(
      <ListView dataSource={this.state.dataSource}
      renderRow={this.renderNews}
      style={styles.listView}/>
    )
  }
  renderLoadText(){
    return (
      <View>
      <Text  style={{alignSelf:'center',alignItems:'center',}}>数据加载中...</Text>
      </View>
    );
  }
  render(){
       return(
         <View style={styles.container}>
         <NavigationBar
           title={'通知公告'} titleColor={Colors.white}
           backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
           leftButtonIcon={require('../../res/office/icon-backs.png')}/>
           {this.state.loaded?this.renderNoticeListView():this.renderLoadText()}
         </View>
       );
  }
  renderNews(news) {
    return(
      <View style={{backgroundColor:'white',}} >
      <TouchableHighlight onPress={() => this.goToNext(news.cmsId)} underlayColor='transparent'>
      <View style={styles.cellBG} >
      <Image source={iconTZ}
      style={styles.pic}
      />
      <View style={styles.cellStyle}>
            <View style={styles.ImageStyleCell}>
              <Text style={styles.titleStyle} numberOfLines={1}>{news.TITLE}</Text>
              <Text style={styles.detailStyle}>发布时间:{news.createTime}</Text>
            </View>
            <Image source={iconNext} style={styles.iamgeStyle}/>
      </View>
      </View>
        </TouchableHighlight>
        </View>
    );
  }
};
var styles=StyleSheet.create({
  iamgeStyle:
  {
    width: 8,
    height:13,
		margin: 15,
		alignSelf: 'center',
		justifyContent: 'center'
  },
  ImageStyleCell:
  {
      flex:1,
  },
  postButton:
  {
    margin:10,
  },
  detailStyle:
  {
    flex:1,
    fontSize:12,
    color:'gray',
  },
  titleStyle:
  {
    marginTop:10,
    fontSize:14,
    flex:1,
    color:'#333',
  },
  cellBG:{
      flexDirection: 'row',
      flex:1,
  },
  cellStyle:{
    height:itemHeight,
    borderBottomWidth:1,
    borderBottomColor:'#e5e5e5',
    flexDirection: 'row',
    flex:1,
},
  container: {
    flex: 1,
    backgroundColor:"#f5f5f5",
  },
  listView:{
    flex:1,
  },
  pic:
  {
    margin:10,
    height:30,
    width:30,
    flex:0,
  },
});
