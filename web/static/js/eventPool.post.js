eventPool.main_offline_post = function (status, area) {


    registerUploadImageEvent();
    eventPool.main_offline_post.registerUploadImageEvent = registerUploadImageEvent;

    function registerUploadImageEvent() {
        $('#input_image').click(function () {

            $("#input_image").val("");
            $("#input_image").trigger("click");
        });

        $("#input_image").change(function () {
            var myFiles = this.files;
            for (var i = 0, f; f = myFiles[i]; i++) {
                var imageReader = new FileReader();
                imageReader.onload = (function (aFile) {
                    return function (e) {
                        var span = document.createElement('span');
                        span.innerHTML = ['<span id="pointupicon" class="uppoint" style="">▲</span><a class="images_a"  href="javascript:" ><img class="images" src="', e.target.result, '" title="', aFile.name, '"/></a>'].join('');
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
    }
}


