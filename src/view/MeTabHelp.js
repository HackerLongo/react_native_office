'use strict'
import React,{
  StyleSheet,
  Dimensions,
  Text,
  Image,
  WebView,
  View,
} from 'react-native';
import api from '../Network/api';
import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
// var VERSION_URL = 'http://101.231.57.242:8081/ZQIM_H5/versions.html';
var VERSION_URL = 'http://10.14.2.101:8288/ZQIM_H5';
// var VERSION_URL = 'http://www.baidu.com';
var BGWASH = 'rgba(255,255,255,0.8)';

export default class Help extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: api.HELP_URL,
    };
  }

  render() {
    return(
      <View style={styles.background}>
        <NavigationBar title={'帮助与反馈'} titleColor={Colors.white}
          leftButtonIcon={require('../../res/office/icon-backs.png')}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)} />
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={this.state.url}
        />
      </View>
    );
  }

  onLeftBack() {
    this.props.navigator.pop();
  }

};

var styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  webView: {
    backgroundColor: BGWASH,
  },
});
