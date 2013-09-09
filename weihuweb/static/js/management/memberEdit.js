/**
 * Created with JetBrains WebStorm.
 * User: xiao
 * Date: 13-9-4
 * Time: 下午10:22
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var obj = {};
    $.ajax({
        type:"GET",
        url:"/api2/account/getbyid?",
        data:{
            uid:Request("id")
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取用户信息成功"){
                obj = serverData["account"];
                judgeProperty(unescape(obj.accountname),"accountname");
                judgeProperty(obj.nickName,"nickName");
                judgeProperty(obj.phone,"phone");
                judgeProperty(obj.weibo,"weibo");
            }
        }
    });
    $(".settingSaveBtn").click(function(){
         obj.nickName = domByName("nickName").value.trim();
         obj.phone = domByName("phone").value.trim();
         obj.weibo = domByName("weibo").value.trim();
        if(domByName("phone").value.trim() != ""){
            var phoneRegexp = /^[1][358]\d{9}$/;
            if(!phoneRegexp.test(domByName("phone").value.trim())){
                alert("手机号码格式不正确");
                return;
            }
        }
        $.ajax({
            type: "POST",
            url: "/api2/account/modifyaccount?",
            data:{
                uid: obj.uid,
                account: JSON.stringify(obj)
            },
            success: function(serverData){
                if(serverData["提示信息"] == "修改用户信息成功"){
                    location.href = "memberList.html";
                }
            }
        });
    });
});
//根据对象的属性和指定的name，给指定的name对应的Dom节点对象赋值
function judgeProperty(proName,eleName){
    if(proName != undefined){
        domByName(eleName).value = proName;
    }
}
//获取指定name的Dom节点对象
function domByName(eleName){
    return document.getElementsByName(eleName)[0];
}
//获取html页面传递过来的参数值
function Request(strName)
{
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for(var i = 0; i < arrTmp.length; i++){
        var arrTemp = arrTmp[i].split("=");
        if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}