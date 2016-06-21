'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../util/Colors';
import Storage from 'react-native-storage';

var storage = new Storage({
  size: 100,
  enableCache: true,
  sync : {
  }
})

export default class FormItemsTextEmail extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
        text: '',
      };
  }

  parserDate(date) {
      let t = Date.parse(date);
      if (!isNaN(t)) {
          return new Date(Date.parse(date.replace(/-/g, "/")));
      } else {
          return new Date();
      }
  }
  componentDidMount() {
    if(this.props.detailType === 'sys_datetime'){
      let d=new Date();
      let dformat = [d.getFullYear(),
              d.getMonth()+1,
               d.getDate()].join('-')+' '+
              [d.getHours(),
               d.getMinutes(),
               d.getSeconds()].join(':');
      this.props.onUserInput(this.state.row.name, dformat);
      this.setState({text: dformat});
    }else{
      storage.load({
        key: 'userName'
      }).then(ret =>{
        let temp = '';
        if(this.state.row.content && this.state.row.content != ''){
          temp = this.state.row.content;
        }else if(this.props.detailType === 'sys_userid'){
          temp =  ret.userid;
        }else if(this.props.detailType === 'sys_realname'){
          temp =  ret.nickName;
        }else if(this.props.detailType === 'sys_dept'){
          temp =  ret.dept;
        }else if(this.props.detailType === 'sys_post'){
          temp = ret.post;
        }else if(this.props.detailType === 'sys_companyname'){
          temp = ret.companyName;
        }
        this.props.onUserInput(this.state.row.name, temp);
        this.setState({text: temp});
      }).catch(err=>{
        console.log(err);
      });
    }
  }

  render() {
    return(
      <View style={formComponentStyles.container}>
        <View style={formComponentStyles.titleContainer}>
          <Text style={formComponentStyles.title}>
            {this.state.row.title}
          </Text>
        </View>
        <View style={formComponentStyles.contentContainer}>
          <Text style={{textAlign:'right',color:'gray',}}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

import formComponentStyles from './styles';
var styles = StyleSheet.create({
});
