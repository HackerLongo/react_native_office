'use strict'

import React, {
  Image,
  StyleSheet,
  Dimensions
}
from 'react-native';

var ITEM_HEIGHT = Dimensions.get('window').width/3-11;
var ITEM_ICON = ITEM_HEIGHT*0.6;

//静态效果
{
  var imageStoreMap = new Map();
  imageStoreMap.set(1, require('../../../res/office/office_off.png'));
  imageStoreMap.set(2, require('../../../res/office/office_leave.png'));
  imageStoreMap.set(3, require('../../../res/office/office_attendance.png'));
  imageStoreMap.set(4, require('../../../res/office/office_cost.png'));
  imageStoreMap.set(5, require('../../../res/office/office_expense.png'));
  imageStoreMap.set(6, require('../../../res/office/office_marriage.png'));
  imageStoreMap.set(7, require('../../../res/office/office_onbusiness.png'));
  imageStoreMap.set(8, require('../../../res/office/office_overtime.png'));
  imageStoreMap.set(9, require('../../../res/office/office_sickleave.png'));
  imageStoreMap.set('icon-add', require('../../../res/office/icon-add.png'));
}

export default class GridItemImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Image style={styles.itemIcon} source={imageStoreMap.get(this.props.icon)}/>);
  }
}


var styles = StyleSheet.create({
  itemIcon: {
    width: ITEM_ICON,
    height: ITEM_ICON,
  },
});
