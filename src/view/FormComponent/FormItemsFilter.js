'use strict';

import React, {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Colors from '../../util/Colors';
import FormItemsTextView from './FormItemsTextView';
import FormItemsTextInputView from './FormItemsTextInputView';
import FormItemsSpinnerView from './FormItemsSpinnerView';
import FormItemsRadioView from './FormItemsRadioView';
import FormItemsCheckBoxView from './FormItemsCheckBoxView';
import FormItemsDatePickerView from './FormItemsDatePickerView';
import FormItemsFileUploadView from './FormItemsFileUploadView';
import FormItemsTextIdcard from './FormItemsTextIdcard';
import FormItemsTextEmail from './FormItemsTextEmail';
import FormItemsTextInt from './FormItemsTextInt';
import FormItemsTextFloat from './FormItemsTextFloat';
import FormItemsMacros from './FormItemsMacros';
import FormItemsDateTimeView from './FormItemsDateTimeView';
import FormItemsHideView from './FormItemsHideView';
import FormItemsLinkView from './FormItemsLinkView';
import FormItemsTextareaView from './FormItemsTextareaView';

export default class FormItemsFilter extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        row: this.props.row,
      };
  }

  renderFormItem() {
    var _props = this.props;
    {/*隐藏控件*/}
    if (this.state.row.hide) {
      return(<FormItemsHideView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }
    if(this.state.row.type === 'macros' && this.state.row.detailType === 'sys_datetime'){ //宏日期
      return(<FormItemsMacros row={this.state.row}  detailType={'sys_datetime'} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'macros' && this.state.row.detailType === 'sys_userid'){ //当前用户ID
      return(<FormItemsMacros row={this.state.row}  detailType={'sys_userid'} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'macros' && this.state.row.detailType === 'sys_realname'){ //用户名
      return(<FormItemsMacros row={this.state.row}  detailType={'sys_realname'} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'macros' && this.state.row.detailType === 'sys_dept'){ //用户部门
      return(<FormItemsMacros row={this.state.row}  detailType={'sys_dept'} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'macros' && this.state.row.detailType === 'sys_post'){ //用户岗位
      return(<FormItemsMacros row={this.state.row}  detailType={'sys_post'} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'macros' && this.state.row.detailType === 'sys_companyname'){ //用户岗位
      return(<FormItemsMacros row={this.state.row}  detailType={'sys_companyname'} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }

    if(this.state.row.type === 'text' && this.state.row.detailType === 'linked_process_no'){ //附件
      return(<FormItemsLinkView row={this.state.row} navigator={this.props.navigator} />);
    }

    if (this.state.row.readOnly == true)
      return(<FormItemsTextView userName ={this.state.userName} row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    if(this.state.row.type == 'textarea'){
      return(<FormItemsTextareaView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type == 'select'){

      return(<FormItemsSpinnerView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} refs={_props.refs}/>);
    }else if(this.state.row.type == 'radios'){
      return(<FormItemsRadioView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type == 'checkboxs'){
      return(<FormItemsCheckBoxView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'text'){ //普通文本
      return(<FormItemsTextInputView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'email'){ //邮箱地址
      return(<FormItemsTextEmail row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'int'){ //整数
      return(<FormItemsTextInt row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'float'){ //小数
      return(<FormItemsTextFloat row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'idcard'){ //身份证号码
      return(<FormItemsTextIdcard row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)}/>);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'standardDate'){ //日期(yyyy-MM-dd)
      return(<FormItemsDatePickerView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} refs={_props.refs} />);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'fullDate'){ //日期(yyyy-MM-dd HH:mm:ss)
      return(<FormItemsDateTimeView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} refs={_props.refs} />);
    }else if(this.state.row.type === 'text' && this.state.row.detailType === 'file'){ //附件
      return(<FormItemsFileUploadView row={this.state.row} onUserInput={(key, value) => this.props.onUserInput(key, value)} navigator={this.props.navigator} onChooseFile={(key, value) => this.props.onChooseFile(key, value)} refs={_props.refs}/>);
    }else{
      return(<View/>)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        {this.renderFormItem()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
