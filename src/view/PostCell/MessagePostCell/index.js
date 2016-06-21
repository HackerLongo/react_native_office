/*
Coded by: Simar (github.com/iSimar)
GitHub Project: https://github.com/iSimar/HackerNews-React-Native
*/

'use strict';

import React, {
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from "./style";
import Colors from '../../../util/Colors';

export default class MessagePostCell extends React.Component{

  _renderCountView() {
    let count = this.props.post.count;
    if(count>99){
      count='99+';
    }
    return (
      <View style={styles.circle}>
        <Text style={styles.count}>
          {count}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect} >
      <View style={styles.container}>
      <Image style={styles.postImage}source={this.props.post.icon} />

        <View style={styles.postContainer}>
          <View style={styles.postDetailsContainer}>
            <Text style={styles.postTitle}>
              {this.props.post.title}
            </Text>
            <Text style={styles.postDetailsLine}>
            {this.props.post.content}
            </Text>
          </View>
          {this.props.post.count > "0" && this._renderCountView()}
        </View>
      </View>
      </TouchableOpacity>

    );
  }
}
