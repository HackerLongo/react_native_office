'use strict'
import React,{
  StyleSheet,
  Dimensions,
  Text,
  Image,
  View,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';

export default class AboutUs extends React.Component {
  render() {

    return(
      <View style={styles.background}>
        <NavigationBar
          title={'关于'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>

        <View style={styles.icon}>
          <Image style={styles.iconImage} source={require('../../res/icon/logo.png')}/>
          <Text style={styles.iconText}>中晴办公</Text>
        </View>
        <View style={styles.phone}>
          <Text style={styles.phoneText}>如有任何疑问，请拨打服务电话</Text>
          <Text style={styles.phoneNumber}>18521059559</Text>
          <Text style={styles.phoneText}>或者发送邮件至</Text>
          <Text style={styles.phoneNumber}>zq-help@outlook.com</Text>
        </View>
        <Text style={styles.endText}>@中晴企业集团</Text>
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
  icon:{
    flex: 3,
    alignItems: 'center',
  },
  iconImage: {
    marginTop: 95,
    width: 95,
    height: 95,
  },
  iconText: {
    marginTop: 5,
    fontSize: 20,
    color: '#333',
  },
  phone:{
    flex: 2,
    alignItems: 'center'
  },
  phoneText:{
    marginTop: 5,
    color: '#999',
    fontSize: 14,
  },
  phoneNumber:{
    color: '#e55500',
    fontSize: 16,
    marginTop: 10,
  },
  endText: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'center',
    marginBottom: 40,
  }

});
