'use strict';

import React, {
  ListView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Colors from '../util/Colors';
import api from "../Network/api.js";

import NavigationBar from './Component/NavigationBar';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


export default class SearchAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      dataSource:  ds.cloneWithRows([]),
    };
  }

  _renderDetail(rowData) {
    return (
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <Image style={styles.avatar} source={require('../../res/icon/icon-avatar.png')}/>
          <Text style={styles.detailText}>{rowData.displayName}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailText}>电话：{rowData.mobile}</Text>
          <Text style={styles.detailText}>邮箱：{rowData.email}</Text>
          <Text style={styles.detailText}>所属公司：{rowData.compayName}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'通讯录'} titleColor={Colors.white}
          leftButtonIcon={require('../../res/office/icon-backs.png')}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)} />
          <View style={{flexDirection: 'row',height: 56}}>
            <TextInput
              style={{flex: 1,height:32,margin: 8, elevation: 3,borderRadius: 2,backgroundColor: 'white',fontSize: 10}}
              placeholder='请输入姓名查找'
              onChangeText={(text) => this.setState({searchText: text})}
              returnKeyType={'search'}
              onSubmitEditing={this.onSearch.bind(this)} />
            <TouchableOpacity onPress={this.onSearch.bind(this)}
              style={{ height:32,width:64,margin: 8,elevation: 3,borderRadius: 2,alignItems: 'center',justifyContent: 'center',backgroundColor: Colors.mainColor}}>
              <Text>搜索</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.main}>
          <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderDetail.bind(this)}/>
        </View>
      </View>
    );
  }

  onSearch(){
    var url = api.SEARCH_ADDRESSLIST_URL +'nickName='+this.state.searchText;
    console.log(url);
    fetch(url).then((response) =>{
      if(response._bodyText === '[]'){
        Alert.alert('',
          '没有查到相关数据!',
          [
            {text: '确定', onPress: () => console.log('OK Pressed!')},
          ]
        );
      }
      return response.json();
    }).then((responseData)=>{
      this.setState({
        dataSource: ds.cloneWithRows(responseData),
      });
    }).catch((error) => {
      Alert.alert('提示','无法连接网络,请检查网络连接后重试!',[{text:'确定',onPress: ()=>{}}]);
    }).done();
  }

  onLeftBack(){
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground
  },

  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    flexDirection: 'row',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#ccc',
    margin: 8,
    elevation: 1,
    padding: 8,
  },
  userInfo: {
    alignItems: 'center'
  },
  avatar: {
    width: 48,
    height: 48,
    alignSelf: 'center',
  },
  detail: {
    marginLeft: 16,
  },
  detailText: {
    marginTop:5,
    fontSize: 12,
    color: '#666',
  }
});
