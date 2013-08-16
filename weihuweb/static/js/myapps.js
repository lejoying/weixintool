/**
 * Created with JetBrains WebStorm.
 * User: xiao
 * Date: 13-8-14
 * Time: 下午10:34
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    //给上传按钮添加点击事件
    $(".myappTXTUploadBtn").click(function(){
        var filepath = $(".uploadFace").val().trim();
        var last = filepath.substr(filepath.lastIndexOf(".")+1);
        if(last == "txt"){
            var file = $(".uploadFace")[0].files[0];
            var reader = new FileReader();
//        reader.readAsArrayBuffer(file)
//        reader.readAsDataURL(file);
            reader.readAsText(file, "GB2312");
            var urlData;
            reader.onload = function (e) {
//                console.log(reader.result);
                urlData = this.result;
                var dataarray = urlData.split("\n");
                var objs = '{"objs":[';
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
                            obj.memberrepgb = data.substr(namestart+1,nameend-1);
                            str += data.substr(namestart+1,nameend-1);
                            var imgstart = data.indexOf("〖");
                            var imgend = data.lastIndexOf("〗");
                            if(imgstart != -1 && imgend != -1){
                                obj.memberreceiveimg = data.substr(imgstart+1,imgend-nameend-2);
                                str += "\n"+data.substr(imgstart+1,imgend-nameend-2);
                            }
                            obj.memberreceivetxt = data.substr(imgend+1);
                                str += "\n"+data.substr(imgend+1);
//                            alert(JSON.stringify(obj));
                            objs += JSON.stringify(obj)+",";
                        }else{
                            continue;
                        }
//                        alert(str);
                        str = "";
                    }
                }
                objs = objs.substr(0,objs.lastIndexOf(",")-1);
                objs += "]}"
//                alert(JSON.parse(objs));
                console.log(objs);
        }
        }
    });
});