/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-14
 * Time: 下午4:42
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    //txtdoc
    $(".myappTXTUploadBtn").click(function(){
        var file = $(".uploadFace")[0].files[0];
        var reader = new FileReader();
//        reader.readAsArrayBuffer(file)
//        reader.readAsDataURL(file);
        reader.readAsText(file, "GB2312");
        var urlData;
        reader.onload = function (e) {
            urlData = this.result;
            alert(urlData.split("\n")[1]);
            console.log(reader.result);
        }
//        reader.readAsBinaryString(file);
    });
});