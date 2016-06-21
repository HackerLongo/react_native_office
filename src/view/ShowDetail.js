'use strict';

var React = require('react-native');
var {
  WebView,
  ScrollView,
  Text,
  View,
} = React;
import Colors from '../util/Colors';
import api from '../Network/api';
import NavigationBar from './Component/NavigationBar';
var _this;
export default class ShowDetail extends React.Component {
  constructor(props) {
    super(props);
    _this=this
  }
  render() {
    // console.log('==>>>showdetail,'+this.props.router.urlPath);
    return (
        <View style={{flex:1}}>
        <NavigationBar
          title={'详情'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>
        <WebView
        scalesPageToFit={true}
        source={{uri:this.props.router.urlPath}}
        renderError = {this.showError}
        onLoadStart={this.showState}
        />
        </View>
    );

  }
  showState()
  {
    return(
    <View><Text style={{alignSelf:'center',}}>加载中...</Text></View>
    )
  }
  showError()
  {
    return(
    <View>
      <Text style={{alignSelf:'center',}}>
        {_this.props.router.ErrorInof}
      </Text>
    </View>
    )
  }
  onLeftBack() {
    this.props.navigator.pop();
  }

};
