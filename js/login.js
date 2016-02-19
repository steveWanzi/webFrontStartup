/**
 * Created by jyzeng on 16/2/17.
 */

var $_scope = {};

$_scope['headerData'] = {
    baseUrl: "./"
};

var localMockFun = function () {
    $.ajax({
        url: './config/config.json',
        type: 'get',
        cache: false,
        dataType: "json",
        success: function (res) {
            localStorage.removeItem("urlConfig");
            localStorage.setItem("urlConfig", JSON.stringify(res));
        },
        error: function (res) {
            console.log("res", res);
        }
    });
};

//commonConfig.json文件是部署在线上环境的 如果是线下环境则会调用上方的本地环境实现本地mock
var getCommonConfigFun = function (urlConfig) {
    $.ajax({
        url: './commonConfig.json',
        type: 'get',
        cache: false,
        dataType: "json",
        success: function (res) {
            localStorage.removeItem("urlConfig");
            localStorage.setItem("urlConfig", JSON.stringify(res));
        },
        //判断，如果没有找到commonConfig文件执行本地mock环境
        error: function () {
            localMockFun();
        }
    });
};

getCommonConfigFun();

commonJs.drawTpl("header", function () {

});

commonJs.drawTpl("footer", function () {

});


var loginFun = function () {
    var url = JSON.parse(localStorage.getItem("urlConfig"))['loginUrl'];
    var username = $("#userNameValue").val();
    var password = $("#passWordValue").val();
    if (!username) {
        alert("请输入用户名!");
        return;
    }
    if (!password) {
        alert("请输入密码!");
        return;
    }
    var passWord = hex_md5(password).toLowerCase();         //Md5为了支持普通登录
    var plainPassword = base64_encode(password);            //base64为了支持域账号登录

    var data = {
        "product": "dap",
        "grant_type": "password",
        "client_id": "dap",
        "client_secret": "dap",
        "scope": "read",
        "username": username,
        "plainPassword": plainPassword,
        "password": passWord
    };

    commonJs.ajaxGetFun(url, data,function(res){
        console.log("res=",res);
        window.location.href = "http://www.baidu.com"
    },function(res){

    });
};
