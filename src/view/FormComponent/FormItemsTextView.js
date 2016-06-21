'use strict';

import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Colors from '../../util/Colors';
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class FormItemsTextView extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }
componentDidMount(){
  this.props.onUserInput(this.state.row.name ,this.state.row.content);
}
  render() {
    var content='';
    if (this.state.row.content !='null') {
      content = this.state.row.content;
    }
    if(this.state.row.detailType === 'file'){
      content = this.state.row.fileName;
    }

    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={formComponentStyles.contentContainer}>
          <Text style={{textAlign:'right',color:'gray'}}>
            {content}
          </Text>
        </View>
      </View>
    );
  }
}

import formComponentStyles from './styles';
