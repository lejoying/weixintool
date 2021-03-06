$(document).ready(function(){
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        $(".myappTitle span").html(JSON.parse(nowWeixin).weixinName);
    }
    $($(".myappBottomMessage")[0]).html("共有0条回复，此处显示最前10条回复设置");
    var nowAccount = window.localStorage.getItem("nowAccount");
    var obj = {};
    //获取当前微信用户的ID
    var weixinid = "";
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
        $.ajax({
            type:"POST",
            url:"/api2/app/getmyapp?",
            data:{
                weixinid : JSON.parse(nowWeixin).weixinOpenID,
                appid: 125
            },
            success:function(serverData){
                obj = serverData["r"];
                if(obj.power != undefined){
                    if(obj.power == true){
                        $(".myappTitle input")[0].setAttribute("checked","true");
                    }else{
                        $(".myappTitle input")[0].removeAttribute("checked");
                    }
                }
            }
        });
    }
    if(weixinid != ""){
        //获取个性化设置的前10条数据
        $.ajax({
            type:"POST",
            url:"/api2/app/getallmyapp?",
            data:{
                weixinid : weixinid
            },
            success:function(serverData){
                if(serverData["提示信息"] == "获取个性化设置成功"){
                    var selfdom_myapps = getTemplate("selfdom_myapps");
                    $(".appExamplesList").html(selfdom_myapps.render(serverData["r"]));
                    if(serverData["count"] != undefined)
                        $($(".myappBottomMessage")[0]).html("共有"+serverData["count"]+"条回复，此处显示最前10条回复设置");
                    for(var i=0;i<$(".receivetxt").length;i++){
                        var id = $($(".receivetxt")[i]).html();
                        $($(".receivetxt")[i]).html(id.substr(0,20)+"...");
                    }
                    $(".receiveimg img").css({
                        "width":"50px",
                        "height":"50px"
                    });
                }
            }
        });

        $(".myappTitle input").click(function(){
//            alert(obj.switch+"--"+this.checked);
            var ob = {};
            ob.mydata = obj.mydata;
            ob.power = this.checked;
            $.ajax({
                type:"post",
                url:"/api2/app/modifymyapp?",
                data:{
                    weixinid:weixinid,
                    appid:125,
                    r:JSON.stringify(ob)
                },
                success:function(serverData){
                    if(serverData["提示信息"] == "获取应用信息成功"){
                        if(serverData["r"].power==true){
                            showBlackPage("开启成功","开启成功");
                        }else{
                            showBlackPage("关闭成功","关闭成功");
                        }
                    }else if(serverData["提示信息"] == "获取应用信息失败"){
                        showBlackPage("设置失败","设置失败");
                    }
                }
            });
        });
    }
    //给上传按钮添加点击事件
    $(".myappTXTUploadBtn").click(function(){

        var filepath = $(".uploadFace").val().trim();
        if(filepath == ""){
            showBlackPage("请您选择要上传的txt文件","请您选择要上传的txt文件");
            return;
        }
        var last = filepath.substr(filepath.lastIndexOf(".")+1);
        if(last == "txt"){
            var file = $(".uploadFace")[0].files[0];
            var reader = new FileReader();
            reader.readAsText(file, "GB2312");
            var urlData;
            reader.onload = function (e) {
                urlData = this.result;
                var dataarray = urlData.split("\n");
                var objs = "[";
                var index = 1;
                for(var i=0;i<dataarray.length;i++){
                    var data = dataarray[i].trim();
                    if(data == ""){
                        continue;
                    }else{
                        var namestart = data.indexOf("【");
                        var nameend = data.lastIndexOf("】");
                        var str = "";
                        if(namestart != -1 && nameend != -1){
                            var obj = {};
                            obj.replytxt = data.substr(namestart+1,nameend-1);
                            str += data.substr(namestart+1,nameend-1);
                            var imgstart = data.indexOf("〖");
                            var imgend = data.lastIndexOf("〗");
                            if(imgstart != -1 && imgend != -1){
                                obj.receiveimg = data.substr(imgstart+1,imgend-nameend-2);
                                str += "\n"+data.substr(imgstart+1,imgend-nameend-2);
                                obj.receivetxt = data.substr(imgend+1);
                                str += "\n"+data.substr(imgend+1);
                            }else{
                                obj.receivetxt = data.substr(nameend+1);
                                str += "\n"+data.substr(nameend+1);
                            }
                            obj.myappid = index;
                            index++;
                            objs += JSON.stringify(obj)+",";
                        }else{
                            continue;
                        }
                    }
                }
                objs = objs.substr(0,objs.lastIndexOf(","));
                objs += "]"
                if(weixinid != ""){
                    $.ajax({
                        type:"POST",
                        url:"/api2/app/addmyapp?",
                        data:{
                            weixinid:weixinid,
                            "myapp":objs
                        },
                        success:function(serverData){
                            showBlackPage(serverData["提示信息"],serverData["提示信息"]);
                        }
                    });
                }else{
                    alert("您还没有绑定微信公众账号");
                }
            }
        }else{
            alert("您上传的不是txt文件");
        }
    });
});

//根据id获取模版
function getTemplate(id) {
    var tenjin = nTenjin;
    var templateDiv = $('.templates #' + id).parent();
    var string = templateDiv.html();
    string = string.replace(/\<\!\-\-\?/g, "<?");
    string = string.replace(/\?\-\-\>/g, "?>");
    string = string.replace(/比较符号大于/g, ">");
    string = string.replace(/比较符号兄小于/g, "<");
    var template = new tenjin.Template();
    template.convert(string);
    return template;
}