/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-12
 * Time: 上午11:24
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $(".titleMemberId").html("会员ID："+Request("id"));
    var obj = {};
    //根据指定的id获取该用户的详细信息
    $.ajax({
        type:"GET",
        url:"/api2/user/getbyid?",
        data:{
            "userid":Request("id")
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取用户信息成功"){
                obj = serverData["user"];
                judgeProperty(serverData["user"].nickName,"nickName");
                judgeProperty(serverData["user"].city,"city");
                judgeProperty(serverData["user"].realName,"realName");
                judgeProperty(serverData["user"].phone,"phone");
                judgeProperty(serverData["user"].email,"email");
                judgeProperty(serverData["user"].weixinNum,"weixinNum");
                judgeProperty(serverData["user"].company,"company");
                judgeProperty(serverData["user"].serviceName,"serviceName");
            }
        }
    });
    //给保存按钮绑定点击事件
    $(".weixinMemberEditBtn").click(function(){
        obj.nickName = domByName("nickName").value.trim();
        obj.city = domByName("city").value.trim();
        obj.realName = domByName("realName").value.trim();
        obj.phone = domByName("phone").value.trim();
        obj.email = domByName("email").value.trim();
        obj.weixinNum = domByName("weixinNum").value.trim();
        obj.company = domByName("company").value.trim();
        obj.serviceName = domByName("serviceName").value.trim();

        obj.id = Request("id");
        $.ajax({
            type:"POST",
            url:"/api2/user/modify?",
            data:{
                "userid":Request("id"),
                "user":JSON.stringify(obj)
            },
            success:function(serverData){
                if(serverData["提示信息"] == "修改关注用户信息成功"){
                    location.href = "weixinMember.html";
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
    for(var i = 0; i < arrTmp.length; i++)
    {
        var arrTemp = arrTmp[i].split("=");
        if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}