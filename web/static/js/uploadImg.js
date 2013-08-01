$(document).ready(function(){
    $("[name='new_name']").click(function(){
        $("[name='new_name']").focus();
    });
    $("[name='new_name']").blur(function(){
        var name = $("[name='new_name']").val();
        if(name == ""){
            $(".tip_out").show();
            name.focus();
        }else{
            $(".tip_out").hide();
        }
    });
})

function uploadPic(next) {
    if (app.uploadStatus == "uploading") {
        var file = $("#input_image")[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var urlData = this.result;

            $.ajax({
                data: {filename: "1.png", image: urlData, weibo_user: app.localSettings.ownedWeibo.currentWeibo},
                type: 'POST',
                url: ("http://" + app.serverUrl + "/upload2/"),
                success: function (data) {
                    var filename = data.filename;
                    var pidRegExp = /^\D*\d{13}$/;
                    if (pidRegExp.test(filename) && data["提示信息"] == "图片上传成功") {
                        next(filename);
                    }
                    else {
                        alert(JSON.stringify(data));
                    }
                }
            });
        };

        app.uploadStatus = "none";
    }
    else {
        next("none")
    }
}

function addPost(time, text, pic, next) {
    $.ajax({
        data: {"text": text, "weibo_user": app.localSettings.ownedWeibo.currentWeibo, "time": time, "pic": pic},
        type: 'POST',
        url: ("http://" + app.serverUrl + "/api2/post/add"),
        success: function (data) {
            next(data);
        }
    });
}

registerUploadImageEvent();
uploadImg.main_offline_post.registerUploadImageEvent = registerUploadImageEvent;

function registerUploadImageEvent() {
    $('#addPicButton').click(function () {

        $("#input_image").val("");
        $("#input_image").trigger("click");
    });
    $(document).ready(function(){
    $("#input_image").change(function () {
        var myFiles = this.files;
              // alert("input_image change");
        for (var i = 0, f; f = myFiles[i]; i++) {
            var imageReader = new FileReader();
            imageReader.onload = (function (aFile) {
                return function (e) {
                    var span = document.createElement('span');
                    span.innerHTML = ['<img class="images" src="', e.target.result, '" title="', aFile.name, '"/>'].join('');
                    //                    document.getElementById('thumbs').insertBefore(span, null);
                    $("#thumbs").empty();
                    $("#thumbs").append(span);
                    if (app.uploadStatus = "none") {
                        app.uploadStatus = "uploading";
                    }
                    $('.images_a', $(span)).click(function () {
                        if ($(this).hasClass("focus")) {
                            $(this).removeClass("focus");
                            $("#pointupicon").toggleClass("uppointclick");
                            $(".images_close_a", $(this)).remove();
                        }
                        else {
                            $(this).addClass("focus");
                            $("#pointupicon").toggleClass("uppointclick");
                            $(this).append('<a class="images_close_a" href="javascript:"><img class="images_close"  style="vertical-align: top;" src="/static/images/close_small.png"></a>')
                            $('.images_close_a', $(this)).click(function () {
                                $(span).remove();
                                $("#pointupicon").remove();
                                if (app.uploadStatus = "uploading") {
                                    app.uploadStatus = "none";
                                }
                            });
                        }
                    });
                };
            })(f);
            imageReader.readAsDataURL(f);
            $("#pointupicon").show();

            break;
        }
    });
    });
}
