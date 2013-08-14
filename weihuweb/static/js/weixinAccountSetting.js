/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-12
 * Time: 下午4:39
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var obj = {};
   $($(".weixinMemberTitle span")[1]).html(":"+Request("id"));
    $.ajax({
        type:"GET",
        url:"/api2/weixin/getbyid?",
        data:{
            weixinid:Request("id")
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取微信信息成功"){
                obj = serverData["weixin"];
                judgeProperty(serverData["weixin"].weixinName,"name");
                judgeProperty(serverData["weixin"].intro,"intro");
                serverData["weixin"].span = "coolspan";
//                alert(obj.weixinName);
            }
        }
    });
   //为保存按钮添加点击事件
    $(".weixinMemberEditBtn").click(function(){
//        alert($(".uploadFace").val().trim());
        if($(".uploadFace").val().trim() != ""){
            var path = $(".uploadFace").val().trim();
            var last = path.substr(path.lastIndexOf(".")+1);
            if(last == "jpg" || last == "png" || last == "jpeg" || last == "bmp"){
                var file = $(".uploadFace")[0].files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                var urlData;
                reader.onload = function (e) {
                    urlData = this.result;
                    $.ajax({
                        type:"POST",
                        url:"/upload2/",
                        data:{
                            image:urlData,
                            weibo_user:Request("id")
                        },
                        success:function(serverData){
                            if(serverData["提示信息"] == "图片上传成功"){
                                obj.headimg = serverData["filename"];
                                editWeixin();
                            }
                        }
                    });
                }
            }else{
                alert("您选择的文件不是图片类型"+path);
                return;
            }
        }else{
            editWeixin();
        }
    });
    function editWeixin(){
        var weixinName = document.getElementsByName("name")[0].value;
        var intro = document.getElementsByName("intro")[0].value;
        obj.weixinName = weixinName;
        obj.intro = intro;
        $.ajax({
            type:"POST",
            url:"/api2/weixin/modify?",
            data:{
                weixinid:Request("id"),
                weixin:JSON.stringify(obj)
            },
            success:function(serverData){
//                alert(serverData["提示信息"]);
                location.href = "allBindWeixin.html";
            }
        });
    }
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