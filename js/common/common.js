/**
 * Created by jyzeng on 16/2/17.
 */
;var commonJs = commonJs || {
    //绘制模板
    drawTpl : function(DomId, successCallBack){
        var Dom = $("#" + DomId);
        if (!Dom) {
            console.log("Dom:" + DomId + "不存在,模板渲染失败");
        } else {
            $.ajax({
                url: Dom.attr("include"),
                success: function (res) {

                    if (!Dom.attr("data")) {
                        var text = _.template(res);
                    }
                    else {
                        var text = _.template(res)($_scope[$(Dom).attr("data")]);
                    }
                    Dom.html(text);
                    if (successCallBack) {
                        successCallBack();
                    }
                },
                error: function (res) {
                    console.log(DomId + "模板绘制失败");
                }
            })
        }
    },
    ajaxPostFun : function (url, data, successFun, errorFun) {
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: data || {},
            success: function (res) {
                if ("0000000" != res.rtnCode) {
                    //alert(res.msg);
                    //如果返回不是0000000，就不能继续往下走了
                    if (errorFun) {
                        errorFun(res)
                    }
                }
                else {
                    successFun(res)
                }
            },
            error: function (res) {
                if (errorFun) {
                    errorFun(res)
                }
                else {
                    //alert("接口查询返回失败");
                }
            }
        })
    },
    ajaxGetFun : function (url, data, successFun, errorFun) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            data: data || {},
            success: function (res) {
                if ("0000000" != res.rtnCode) {
                    //如果返回不是0000000，就不能继续往下走了
                    if (errorFun) {
                        errorFun(res)
                    }else{
                        alert(res.msg);
                    }
                }
                else {
                    if(successFun){
                        successFun(res.bizData)
                    }
                }
            },
            error: function (res) {
                if (errorFun) {
                    errorFun(res)
                }
                else {
                    alert("接口返回失败");
                }
            }
        })
    }
};
