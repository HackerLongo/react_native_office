'use strict'
import React,{
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  View,
} from 'react-native';

import NavigationBar from './Component/NavigationBar';
import Colors from '../util/Colors';
  var data = {
    application:{
      date: '2015-02-01',
      name: '呵呵',
      type: '调休',
      detail: '生病请假调休',
    },
    replyList :[{
    name: '俞威6',
    avatar: '',
    time: '2016-02-04',
    state: 0,
    opinion: '“我GET不到你的笑点。” “你用Post试试…”',
    backgroundColor: '#fff',
  },{
    name: '俞威5',
    avatar: '',
    time: '2016-02-05',
    state: 1,
    opinion: '想了一下，接受微信有支付功能，比接受支付宝有社交功能容易得多。毕竟电话可以用来购物，但是如果钱包可以用来打电话，我觉得我会怀疑人生…',
    backgroundColor: '#999',
  },{
    name: '俞威4',
    avatar: '',
    time: '2016-02-05',
    state: 1,
    opinion: '支付宝的活动，“已集齐人数”这个数据完全由支付宝说了算。 如果我是pm，这几天这个数字都控制在2万以下，让大家产生一种人均万元的错觉，到除夕晚上一口气拉上1亿，每人发两块钱完事儿。',
    backgroundColor: '#666',
  },{
    name: '俞威3',
    avatar: '',
    time: '2016-02-05',
    state: 1,
    opinion: '昨晚睡前在知乎看到一个讨论“中国是否有言论自由”的问题，下面排名前面的答案全在喷楼主，“没言论自由你这个问题能发出来？”……今早再看，问题已经被删了#知乎是高级黑#',
    backgroundColor: '#123456',
  },{
    name: '俞威2',
    avatar: '',
    time: '2016-02-05',
    state: 1,
    opinion: 'QQ上生日随便填了个2月1号，今天收到了各种奇怪的…蛋糕和祝福，我都开心的将错就错应付过去了。但刚刚收到了来自我妈的蛋糕…妈！你生我的时候是夏天啊！七月二号啊！真的是亲生的吗！',
    backgroundColor: '#999',
  },{
    name: '俞威1',
    avatar: '',
    time: '2016-02-05',
    state: 1,
    opinion: '根据我这些年帮助朋友和长辈的经验;绝大部分中国Windows用户日常所能遇到的问题有50%可以通过安装360解决;另外50%要通过卸载360解决',
    backgroundColor: '#999',
  },{
    name: '俞威0',
    avatar: '',
    time: '2016-02-05',
    state: 1,
    opinion: '有一个软件。导致全世界70%的网络攻击，诈骗，假货贩卖，还有色情文章图片视频的传播和播放都在这个软件的帮助下进行。如果没有这款软件，我有很大把握互联网犯罪数量会大大减少。这个公司明知道绝大多数科技犯罪发生在他们的软件之上，但不予以管理…我说的这个软件是Windows',
    backgroundColor: '#999',
  }]};

export default class CreatedDetail extends React.Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !==r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.replyList),
    };
  }

  render() {
    return(
      <View style={styles.background}>
        <NavigationBar
          title={'详细流程'} titleColor={Colors.white}
          backgroundColor={Colors.mainColor} onLeftButtonPress={this.onLeftBack.bind(this)}
          leftButtonIcon={require('../../res/office/icon-backs.png')}/>
        <ListView

          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
          renderFooter={this.footer.bind(this)}
          renderHeader={this.header.bind(this)}
        />
      </View>
    );
  }

  onLeftBack() {
    this.props.navigator.pop();
  }

  renderItem(rowData){
    return (
      <View style={{flexDirection: 'row', }}>
        <View style={{position: 'absolute',flex: 1,width: 1,height:1000,marginLeft:27,backgroundColor:'#ccc',}}/>

        <View style={{width: 56,alignItems: 'center'}}>
          <Image style={{marginTop: 8,width: 48,height: 48,borderRadius: 24,borderWidth: 2,borderColor: '#fff',}} source={require('../../res/icon/avatar.jpg')}/>
        </View>

        <View style={{marginTop: 14,elevation: 3}}>
          <Image source={require('../../res/icon/icon-arrow.png')} style={{width: 5,height: 10,}}/>
        </View>

        <View style={{flex: 1,marginTop:8,marginBottom:8,marginRight: 8,padding: 8,backgroundColor:'#fff', borderRadius:2, elevation: 3}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <View style={{flexDirection: 'row',alignItems: 'center',}}>
              {this.stateIcon(rowData.state)}
              <Text style={{color: '#333',fontSize: 12,}}>{rowData.name}</Text>
            </View>
            <Text style={{fontSize: 10,marginTop: 2,}}>{rowData.time}</Text>
          </View>
          <View style={{marginTop:4,}}>
            <Text style={{fontSize: 10,}}>{rowData.opinion}</Text>
          </View>
        </View>

      </View>
    );
  }

  stateIcon(state){
    if(state === 0){
      return (
        <Image style={{width:12,height: 12,}} source={require('../../res/icon/icon-process.png')}/>
      );
    }else if(state === 1){
      return (
        <Image style={{width:12,height: 12,}} source={require('../../res/icon/icon-agree.png')}/>
      );
    }else if(state === 2){
      return (
        <Image style={{width:12,height: 12,}} source={require('../../res/icon/icon-reback.png')}/>
      );
    }
  }

  header(){
    return (
      <View style={styles.background,{backgroundColor: '#fff',padding: 8,marginBottom: 8, elevation: 5,}}>
        <View style={{flexDirection: 'row',alignItems:'center',}}>
          <Image source={require('../../res/temp/avatar1.jpg')} style={{width: 64,height: 64,borderRadius: 32,borderWidth: 2,borderColor: '#fff',}}/>
          <View style={{flex: 1,justifyContent: 'space-between', flexDirection: 'row',marginRight: 8,marginLeft: 8,}}>
            <Text>{data.application.name}</Text>
            <Text>{data.application.date}</Text>
          </View>
        </View >
        <Text style={{fontSize: 12,color:'#333'}}>{data.application.type}</Text>
        <Text style={{fontSize: 12,color:'#333'}}>理由：{data.application.detail}</Text>
      </View>
    );
  }

  footer(){
    return (
      <View style={{flexDirection: 'row', alignItems: 'center',marginBottom: 8,}}>
      <View style={{width: 10,height: 10,borderRadius: 5,borderWidth: 2,borderColor: Colors.mainBackground,backgroundColor:'#ccc',marginLeft: 22,}}/>
      <Text style={{marginLeft: 8}}>开始申请</Text>
      </View>
    );
  }


};

var styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },

});
