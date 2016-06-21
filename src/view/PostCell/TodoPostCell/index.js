'use strict';

import React, {Text, Image, View, TouchableOpacity} from 'react-native';


import styles from "./style";
import Colors from '../../../util/Colors';
import iconNext from '../../../../res/icon/icon-next.png';
var _navigator;
export default class TodoPostCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let titleColor = '#333';
    if(this.props.post.timeOut){
      titleColor='#f00';
    }
    return (
      <TouchableOpacity onPress={post => this.props.onSelect(this.props.post)}>
      <View style={styles.BigView}>

        <View style={styles.leftView}>
          <View style={styles.topText}>
            <Text style={{fontSize:14,color:titleColor}} numberOfLines={1}>{this.props.post.processNo}--{this.props.post.processTitle}</Text>
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.userName }>申请人:{this.props.post.applicantName}</Text>
            <Text style={styles.currentName}>{this.props.post.name}</Text>
            <Text style={styles.timeTitle }>{this.props.post.startTime}</Text>
          </View>
        </View>
        <View style={styles.rightView}>
        <Image style={styles.postButton} source={iconNext}/>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}
