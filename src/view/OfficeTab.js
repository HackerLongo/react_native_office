'use strict'
import React, {
  Dimensions,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';

import Colors from '../util/Colors';
import GridItem from './Component/GridItem';
import api from "../Network/api.js";
var WIDTH = Dimensions.get('window').width;
var ITEM_HEIGHT = Dimensions.get('window').width/3-11;
var ITEM_ICON = ITEM_HEIGHT*0.6;
let top = Platform.OS === 'ios'? 20: 0;


export default class OfficeTab extends React.Component {
  onItemClick(row) {
    this.props.navigator.push({
      name: 'officeOptionsList',
      rowData: row,
      userId:this.props.router.userId,
    });
  }
  constructor(props){
      super(props);
      this.state = {
        data: [],
      };
    }

  componentWillMount() {
     this.fetchData();
   }

   fetchData() {

      fetch(api.OFFICE_MOUDEL_URL).then((response) => response.json()).then((responseData) => {
         this.setState({data: responseData});
      }).catch((error) => {
        console.log("error = " + error);
      }).done();
    }

  render() {
    var _this =this;
    var gridItems = this.state.data.map((row)=>{
      return <GridItem row={row} onClick={_this.onItemClick.bind(_this,row)}/>
    });

    return(
      <View style={styles.background}>
        <View style={[styles.mainBack,{marginTop: top}]}>
          <Image style={styles.mainBack,{  height: 200,} }
          source={require('../../res/office/office_bg.jpg')}  >
            <View style ={styles.topBg}>

              <TouchableOpacity  onPress={this.onCreated.bind(this)}  >
                <View style={styles.topItem} >
                  <Image style={styles.itemIcon} source={require('../../res/office/office_sq.png')}/>
                  <Text style={[styles.itemText,{color: '#FFFFFF'},{backgroundColor:'transparent'},]}>我的申请</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onApproval.bind(this)}  >
                <View style={styles.topItem} >
                  <Image style={styles.itemIcon} source={require('../../res/office/office_sp.png')}/>
                  <Text style={[styles.itemText,{color: '#FFFFFF'},{backgroundColor:'transparent'},]}>已办任务</Text>
                </View>
              </TouchableOpacity >

            </View>
          </Image>
        </View>
        <ScrollView>
          <View style={styles.scrollBg}>
            {gridItems}
          </View>
        </ScrollView>
      </View>
    );
  }

  onCreated() {
    this.props.navigator.push({
      name: 'created',
      userId: this.props.router.userId,
      userName:this.props.router.userName,
      nickName:this.props.router.nickName,
    });
  }

  onApproval() {
    this.props.navigator.push({
      name: 'approvalList',
      userId: this.props.router.userId,
      userName:this.props.router.userName,
      nickName:this.props.router.nickName,
    });
  }
};

var styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  mainBack: {
    height: 200,
    elevation: 5,
  },
  topBg: {
    flex: 1,
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topItem: {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemIcon: {
    width: ITEM_ICON,
    height: ITEM_ICON,
  },
  itemText: {
  },
  scrollBg: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }

});
