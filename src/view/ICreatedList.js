'use strict'
import React,{
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  View,
} from 'react-native';
import iconNext from '../../res/icon/icon-next.png';
import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from "../Network/api.js";
import Storage from 'react-native-storage';
var data = [];
var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !==r2});
var storage = new Storage({
  size: 1000,
  enableCache: true,
  sync : {
  }
})
export default class ICreatedList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(data),
      nickName:'',
    };
  }

  componentDidMount() {
    storage.load({
        key: 'userName',
        autoSync: true,
        syncInBackground: true
      })
      .then( ret => {
        this.setState({userName:ret.nickName}
        );
      })
      .catch( err => {
        console.warn(err);
      });
    this.fetchData();
  }

  fetchData() {
    var url = api.OFFICE_CREATED + 'userId=' + this.props.router.userId;
    console.log("url = " + url);
    fetch(url).then((response) => response.json()).then((responseData) => {
      this.setState({dataSource: ds.cloneWithRows(responseData), loaded: true});
    }).catch((error) => {
      console.log("error = " + error);
    }).done();
  }

  render() {
    if(this.state.loaded){
    return(
      <View style={styles.background}>
        <NavigationBar title={'我的申请'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
        />
      </View>
    );
  }
  else {
    return(
      <View style={styles.background}>
        <NavigationBar title={'我的申请'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>

      <Text style={{alignSelf:'center',}}>数据加载中..</Text>
      </View>
    );
  }
  }

  onLeftBack() {
    this.props.navigator.pop();
  }

  renderItem(rowData){
    return (
      <TouchableOpacity  onPress={() => this.onDetail(rowData)} >
      <View style={styles.BigView}>
      <View style={styles.leftView}>
        <View style={styles.topText}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {rowData.processNo}--{rowData.processTitle}
          </Text>
        </View>
        <View style={styles.bottomText}>
         <Text style={styles.currentTitle} numberOfLines={1}>{rowData.status}</Text>
         <Text style={styles.timeTitle } numberOfLines={1}>{rowData.startTime}</Text>
        </View>
      </View>
      <View style={styles.rightView}>
        <Image style={styles.postButton} source={iconNext}/>
      </View>
      </View>
    </TouchableOpacity>
    );
  }
  onDetail(rowData) {
    this.props.navigator.push({
      name: 'taskDetail',
      type: 'detail',
      taskId: rowData.id,
      userId: this.props.router.userId,
      userName:this.props.router.userName,
      nickName: this.props.router.nickName,
      processInstanceId: rowData.processInstanceId,
    });
  }

};

var styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
 BigView:{
   borderBottomWidth:1,
   borderBottomColor:Colors.lightgrey,
   flexDirection: 'row',
   height:60,
 },
 leftView:{
   flex:9.5,
   marginTop:10,
   marginBottom:10,
   marginLeft:10,
   flexDirection:'column',
 },
 rightView:{
   flex:0.5,
   marginTop:10,
   marginBottom:10,
   marginRight:10,
 },
 topText:
 {
   flex:1,
 },
 bottomText:
 {
   flex:1,
   justifyContent: 'space-between',
   flexDirection:'row',
 },
 textTitle:{
   fontSize:14,
   color:Colors.black,
 },
 userName:{
   marginTop:5,
   fontSize:11,
   color:Colors.grey,
 },
 currentTitle:{
   marginTop:5,
   fontSize:11,
   color:Colors.secondaryColor,
 },
 timeTitle:{
   marginTop:5,
   fontSize:11,
   color:Colors.grey,
 },
 postButton:{
   width: 8,
   height: 13,
   alignSelf: 'flex-end',
   justifyContent: 'center',
   marginTop:10,
 }
});
