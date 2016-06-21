'use strict'
import React,{
  StyleSheet,
  Dimensions,
  Text,
  Image,
  WebView,
  View,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
import api from '../Network/api';
var BGWASH = 'rgba(255,255,255,0.8)';

export default class Version extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: api.VIEWTASKFROM_URL,
      scalesPageToFit: true,
    };
  }
  render() {
    console.log('Version start');
    console.log('URL',this.state.url);

    return(
      <View style={styles.background}>
        <NavigationBar title={'版本信息'} titleColor={Colors.white}
          leftButtonIcon={require('../../res/office/icon-backs.png')}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)} />
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          url={this.state.url}
          onLoadStart ={this.onStart.bind(this)}
          onError ={this.onError.bind(this)}
          onLoadEnd ={this.onEnd.bind(this)}
        />
      </View>
    );
  }

  onStart() {
    console.log('webView load start.......');
  }
  onError() {
    console.log('ERROR>>>>>>');
  }
  onLeftBack() {
    this.props.navigator.pop();
  }
  onEnd(){
    console.log('end','加载完毕');
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
