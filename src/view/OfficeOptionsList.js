'use strict'
import React,{
  StyleSheet,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  View,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from "../Network/api.js";
var data = [];
var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !==r2});
var itemHeight = 60

export default class OfficeOptionsList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(data),
      loaded:false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var url = api.OFFICE_LIST_URL+this.props.router.rowData.id;
    fetch(url).then((response) => response.json()).then((responseData) => {
      this.setState({dataSource: ds.cloneWithRows(responseData), loaded: true});
    }).catch((error) => {
      console.log("error = " + error);
    }).done();
  }

  render() {
    if (this.state.loaded && this.state.dataSource.length!= '[]') {
       return(
         <View style={styles.background}>
           <NavigationBar title={this.props.router.rowData.name} titleColor={Colors.white}
             backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
             leftButtonIcon={require('../../res/office/icon-backs.png')}/>
           <ListView
             dataSource={this.state.dataSource}
             renderRow={this.renderItem.bind(this)} />
         </View>
       );
    }
    else {
      return(
        <View style={styles.background}>
          <NavigationBar title={this.props.router.rowData.name} titleColor={Colors.white}
            backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
            leftButtonIcon={require('../../res/office/icon-backs.png')}/>
          <Text>数据加载中..</Text>
        </View>
      );
    }

  }

  onLeftBack() {
    this.props.navigator.pop();
  }

  renderItem(rowData,sectionID,rowID){
    return (
      <TouchableHighlight onPress={this.onSelect.bind(this,rowData,rowID)}>
        <View style={styles.BigView}>
          <View style={styles.leftView}>
            <Text style={styles.textStyle} numberOfLines={1}>{rowData.name}</Text>
          </View>
          <View style={styles.rightView}>
            <Image style={styles.postButton} source={require('../../res/icon/icon-next.png')}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  onSelect(data,rowID){
    this.props.navigator.push({
      name: 'taskForm',
      rowData:data,
      userId:this.props.router.userId,
    });
  }
};

var styles = StyleSheet.create({
  BigView:{
    backgroundColor:'white',
    borderBottomWidth:1,
    borderBottomColor:Colors.lightgrey,
    flexDirection: 'row',
    height:44,
  },
  leftView:{
    flex:9.5,
    marginTop:10,
    marginBottom:10,
    marginLeft:10,
    flexDirection:'row',
  },
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
 postButton: {
    width: 8,
    height: 13,
		margin: 15,
		alignSelf: 'center',
		justifyContent: 'center'
	},
  textStyle:{
    fontSize:14,
    color:Colors.black,
  },
});
