var API_KEY = 'u86xPDUfORcuSqUoaJJvxrIB9xJp0Atg'
var API_URL = 'https://www.kimonolabs.com/api/d3rpj7om'
var PARAMS = '?apikey=' + API_KEY;
var WEATHER_URL = 'http://api.map.baidu.com/telematics/v3/weather?location=%E4%B8%8A%E6%B5%B7&output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8';
exports.REQUEST_URL = API_URL + PARAMS;
exports.HN_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/item/';
exports.WEATHER_URL = WEATHER_URL;

//var IP = 'http://10.14.2.166:8080'
var TASK_LIST_URL = IP + '/bpm/task/personalTasks.do?'
var VIEW_TASK_URL = IP + '/bpm/task/viewTaskForm.do?'
var COMPLETE_TASK_URL = IP + '/bpm/task/completeTask.do?'
exports.REQUEST_TASK_LIST_URL = TASK_LIST_URL;
exports.REQUEST_VIEW_TASK_URL = VIEW_TASK_URL;
exports.REQUEST_COMPLETE_TASK_URL = COMPLETE_TASK_URL;

{/** 内网IP**/}
// var IP = 'http://192.168.160.95:8080';
// var IP = 'http://192.168.160.84:8080';
{/** 外网IP**/}
 // var IP = 'http://101.231.57.244:10123';
 var IP = 'http://192.168.160.84:8080';
//   var IP = 'http://10.9.0.182:8080';
// var IP = 'http://10.9.0.117:8080';
{/** 登录**/}
var LOGIN_URL = IP+'/bpm/task/login.do?';
// var LOGIN_URL = 'http://10.14.2.185:8080'+'/bpm/task/login.do?';

exports.LOGIN_URL = LOGIN_URL;

{/*  公告通知  */}
var TZ_URL = IP+'/bpm/task/findAllCmsArticle.do';
exports.TZ_URL = TZ_URL;
{/*  公告通知详情  */}
var TZDETIAL_URL=IP+'/bpm/task/cms-article-view.do?id=';
exports.TZDETIAL_URL = TZDETIAL_URL;
{/*我发起的接口*/}
var OFFICE_MYCREATED_URL = IP+'/bpm/task/listProcessInstances.do?';
exports.OFFICE_CREATED = OFFICE_MYCREATED_URL;
{/** 查询通讯录**/}
var SEARCH_ADDRESSLIST_URL = IP+'/bpm/task/findAddressByUserName.do?';
exports.SEARCH_ADDRESSLIST_URL = SEARCH_ADDRESSLIST_URL;
{/** 我的审批列表**/}
var OFFICE_IAPPROVALLIST_URL = IP+'/bpm/task/historyTasks.do?';
exports.OFFICE_IAPPROVALLIST = OFFICE_IAPPROVALLIST_URL;
{/** 待办任务数**/}
var  TASKCOUNT_URL = IP+'/bpm/task/personalTasksCount.do?';
exports.TASKCOUNT_URL = TASKCOUNT_URL;
{/** 待办任务列表**/}
var  TASKLIST_URL = IP+'/bpm/task/personalTasks.do?';
exports.TASKLIST_URL = TASKLIST_URL;
{/** 待办任务详情**/}
var  TASKDETAIL_URL = IP+'/bpm/task/viewProcessTaskDeatil.do?';
exports.TASKDETAIL_URL = TASKDETAIL_URL;
{/** 获取审批任务详情**/}
var  VIEWTASKFROM_URL = IP+'/bpm/task/viewTaskForm.do?';
exports.VIEWTASKFROM_URL = VIEWTASKFROM_URL;
{/** 审批提交**/}
var APPROVAL_TASK = IP+'/bpm/task/completeTask.do?';
exports.APPROVAL_TASK = APPROVAL_TASK;

{/* 修改密码接口*/}
var PASSWORD_URL=IP+"/bpm/task/edtiUser.do?";
exports.PASSWORD_URL = PASSWORD_URL;
{/*版本信息*/}
var VERSION_URL = 'http://10.184.2.101:8288/ZQIM_H5/versions.html';
exports.VERSION_URL =VERSION_URL;
{/*帮助信息*/}
var HELP_URL = 'http://10.14.2.101:8288/ZQIM_H5';
exports.HELP_URL =HELP_URL;
{/*office  模块列表*/}
var OFFICE_MOUDEL_URL=IP+"/bpm/task/bpmType.do";
exports.OFFICE_MOUDEL_URL = OFFICE_MOUDEL_URL;
{/*office 办公列表*/}
var OFFICE_LIST_URL=IP+"/bpm/task/bpmProcess.do?id=";
exports.OFFICE_LIST_URL = OFFICE_LIST_URL;
{/*office 办公列表详情*/}
var OFFICE_LIST_DETAIL_URL=IP+"/bpm/task/viewStartForm.do?bpmProcessId=";
exports.OFFICE_LIST_DETAIL_URL = OFFICE_LIST_DETAIL_URL;
{/*office 办公列表详情提交*/}
var OFFICE_LIST_DETAILCOMMIT_URL=IP+"/bpm/task/startProcessInstance.do?userId=";
exports.OFFICE_LIST_DETAILCOMMIT_URL = OFFICE_LIST_DETAILCOMMIT_URL;
{/*office 办公附件上传接口*/}
var OFFICE_LIST_UPLOADFILE_URL=IP+"/bpm/task/fileUpload.do";
exports.OFFICE_LIST_UPLOADFILE_URL = OFFICE_LIST_UPLOADFILE_URL;
{/*office 办公附件下载*/}
var OFFICE_LIST_DOWNLOADFILE_URL=IP+"/bpm/task/downFile.do?model=form&width=0&path=";
exports.OFFICE_LIST_DOWNLOADFILE_URL = OFFICE_LIST_DOWNLOADFILE_URL;
{/*office 头像下载*/}
var PHOTO_DOWN=IP+"/bpm/task/downFile.do?model=avatar&userId=";
exports.PHOTO_DOWN = PHOTO_DOWN;
{/*office 邮箱电话信息下载*/}
var PHONENUMBER_EMAIL_GET=IP+'/bpm/task/findPersonInfo.do?userName=';
exports.PHONENUMBER_EMAIL_GET = PHONENUMBER_EMAIL_GET;
{/* 新闻轮播图片列表*/}
var NEW_GET=IP+'/bpm/task/newsData.do';
exports.NEW_GET = NEW_GET;
{/* 新闻轮播图片地址*/}
var NEW_GETIMAGE=IP+'/bpm/task/newsImage.do?path=';
exports.NEW_GETIMAGE = NEW_GETIMAGE;
{/* 关联单*/}
var LINK_TASK=IP+'/bpm/task/viewProcessTaskDeatilByLinkedProcessNo.do?';
exports.LINK_TASK = LINK_TASK;
{/* 获取版本号*/}
var GET_NEWVERSION_URL=IP+'/bpm/task/findLatestVersionByPlatform.do?platform=';
exports.GET_NEWVERSION_URL = GET_NEWVERSION_URL;
{/* 帮助与反馈*/}
var ME_HELP=IP+'/BPM-H5/app.html';
exports.ME_HELP = ME_HELP;
{/* 版本信息*/}
var ME_VERSION=IP+'/BPM-H5/versions.html';
exports.ME_VERSION = ME_VERSION;
