'use strict';

import React, {
	Navigator,
	BackAndroid,
	Alert,
	AppState,
} from 'react-native';


import LoginScreen from './Login';
import MainScreen from './MainScreen';
import TaskList from './TaskList';
import IndexTabTodoTask from './IndexTabTodoTask';
import MeTabUserInfo from './MeTabUserInfo';
import MeTabPassword from './MeTabPassword';
import MeTabAbout from './MeTabAbout';
import MeTabHelp from './MeTabHelp';
import MeTabVersion from './MeTabVersion';
import CreatedList from './ICreatedList';
import CreatedDetail from './CreatedDetail';
import ApprovalList from './IApprovalList';
import TaskDetail from './TaskDetail'; //任务详情
import NoticeTar from './NoticeTar';
import ShowDetail from './ShowDetail';
import SearchAddress from './SearchAddress';
import Office_Options from './OfficeOptionsList';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import ReadTable from './ReadTable';
import FileSelect from './FormComponent/FileSelect';
import GesturePassword from './GesturePassword'; //手势密码
import global from '../util/GlobalStorage';
import ChangeForFirst from './ChangeForFirst';

import JPush , {JpushEventReceiveCustomMessage,JpushEventReceiveMessage, JpushEventOpenMessage} from 'react-native-jpush';

var myNavigator;
var myRouter;

export default class LoginNav extends React.Component{
	constructor(props) {
			super(props);
	}

	configureScene(route){
		return Navigator.SceneConfigs.FadeAndroid;
	}

	renderScene(router, navigator){
		var Component = null;

		myNavigator = navigator;
		myRouter = router;

		switch(router.name){
			case "login":
				Component = LoginScreen;
				break;
			case "main":
				Component = MainScreen;
				break;
			case "taskList":
				Component = TaskList;
				break;
			case "viewtodotask":
				Component = IndexTabTodoTask;
				break;
			case 'userInfo':
				Component = MeTabUserInfo;
				break;
			case 'changePassword':
				Component = MeTabPassword;
				break;
			case 'about':
				Component = MeTabAbout;
				break;
			case 'help':
				Component = MeTabHelp;
				break;
			case 'version':
				Component = MeTabVersion;
				break;
			case 'created':
				Component = CreatedList;
				break;
			case 'detail':
				Component = CreatedDetail;
				break;
			case 'approvalList':
				Component = ApprovalList;
				break;
			case 'searchaddress':
				Component = SearchAddress;
				break;
			case 'taskDetail':
				Component = TaskDetail;
				break;
			case 'replied':
				Component = Replied;
				break;
			case 'officeOptionsList':
				Component = Office_Options;
				break;
			case 'NoticeTar':
				Component = NoticeTar;
				break;
			case 'ShowDetail':
				Component = ShowDetail;
				break;
			case 'taskForm':
				Component = TaskForm;
				break;
			case 'taskTable':
				Component = TaskTable;
				break;
			case 'readTable':
				Component = ReadTable;
				break;
			case 'fileSelect':
				Component = FileSelect;
				break;
			case 'gesturePassword':
				Component = GesturePassword;
				break;
				case 'ChangeForFirst':
					Component = ChangeForFirst;
					break;

		}

		return <Component navigator={navigator} router={router}/>
	}

		componentDidMount() {
			JPush.setAlias('');
			BackAndroid.addEventListener('hardwareBackPress', function() {
				if(myRouter && myRouter.name === 'gesturePassword'){
						return true;
				}
				if (myNavigator && myNavigator.getCurrentRoutes().length > 2) {
					myNavigator.pop();
					return true;
				}

				if(myNavigator && myNavigator.getCurrentRoutes().length <= 2){
					//只退出,不注销
					Alert.alert('提示','确定要退出吗?',[{text:'确定',onPress: ()=>{
						JPush.setAlias('');
						JPush.clearAllNotifications();
						BackAndroid.exitApp();
					}},{text:'取消',onPress: ()=>{}}]);
					return true;
				}
				return false;
			});

			AppState.addEventListener('change', this._handleAppStateChange);

			JPush.requestPermissions()
	    this.pushlisteners = [
	        JPush.addEventListener(JpushEventReceiveMessage, this.onReceiveMessage.bind(this)),
	        JPush.addEventListener(JpushEventOpenMessage, this.onOpenMessage.bind(this)),
	    ];
			JPush.setLatestNotificationNumber(1);
		}

		_handleAppStateChange() {
			if(AppState.currentState === 'background'){
				if(myRouter.name != 'gesturePassword' && myRouter.name != 'userInfo' && myRouter.name != 'login' ){
					myNavigator.push({name: 'gesturePassword'});
				}
			}
		}

		componentWillUnmount() {
			BackAndroid.removeEventListener('hardwareBackPress');
			this.pushlisteners.forEach(listener=> {
	        JPush.removeEventListener(listener);
	    });
			AppState.removeEventListener('change', this._handleAppStateChange);
		}

		onReceiveMessage(message) {
			console.log('onReceiveMessage==>>',message);
		}

		onOpenMessage(message) {
			global.storage.load({
	      key: 'userName',
	    }).then((ret)=>{
				if(ret.userid && ret.userid != '' && ret.userName && ret.userName!= ''){
					if(myRouter.name === 'taskList'){
						myNavigator.replaceAtIndex({name: 'taskList', userId: ret.userid, userName:ret.userName,nickName: ret.nickName},0);
					}else{
						myNavigator.push({name: 'taskList', userId: ret.userid, userName:ret.userName,nickName: ret.nickName});
					}
				}
	    }).catch((err)=>{
	      console.log('error==>',err);
	    })
		}

		render() {
			return (
				<Navigator
					initialRoute={{name: 'login'}}
					configureScene={this.configureScene}
					renderScene={this.renderScene} />);
			}
}
