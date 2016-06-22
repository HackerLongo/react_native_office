## HOW TO USE
>* 1.cd react_native_office && npm install
>* 2.修改react_native_office/node_modules/react-native-calendar-android/src/Calendar.js文件
>*  由于react-native升级到0.26之后的写法改变，而react-native-calendar-android没有更新到0.26，所以我们手动改下啦～～
>*  将第5行 var { requireNativeComponent, PropTypes, View} = ReactNative;
>*  改为 var { requireNativeComponent, View } = ReactNative;
>*      var {PropTypes} = React;
>* 3.好了 接下来执行 react-native run-android
>* 4.特别注意!!
>*   如果编译成功后运行报错,注意下 react 和 react-native 的版本匹配
>*  可以手动执行 npm install react@15.0.2 --save
>*  因为google下来的结果 15.1.0很大程度会报错
## ABOUT react_native_office
公司的内部办公软件，很多界面和数据因为公司机密没法用接口来实现，所以我在constants文件夹中添加了一个VirtualData常量类
来虚拟http请求的过程，http的封装在utils/RequestUtils，注释掉的部分是我实际代码中使用的fetch请求。这个项目是我试着学react-narive写的第一个项目，
可能还有很多瑕疵和写法不好的地方，新手可以借鉴下布局和基本组件的写法，欢迎大家在github上提出指正，让我们一起提高！
另外还要感谢大大的reading项目，redux的部分是参考的reading。

## 界面图片
![首页](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_index.png)
![办公](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_office.png)
![设置](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_setting.png)
![审批](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_approve.png)
![详情](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_detail.png)
![表单](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_form.png)
![手势密码](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_gesture.png)
![通知](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_notice.png)
![待办](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_todo.png)
![用户](https://github.com/talentjiang/react_native_office/blob/master/screenshot/Screenshot_userinfo.png)
