/*************************************** ***************************************
 *    public functions
 *************************************** ***************************************/
var templatePool = {};
function getTemplate(template) {
    if (templatePool[template] != null) {
        return  templatePool [template];
    }
    var tenjin = nTenjin;
    var templateDiv = $(".template[template='" + template + "']")

    if (templateDiv.size() != 1) {
        return null;
    }
    var string = templateDiv.html();
    string = string.replace(/\<\!\-\-\?/g, "<?");
    string = string.replace(/\?\-\-\>/g, "?>");
    string = string.replace(/比较符号大于/g, ">");
    string = string.replace(/比较符号兄小于/g, "<");
    var nTemplate = new tenjin.Template();
    nTemplate.convert(string);
    nTemplate.eventPool = $(templateDiv).attr("eventPool");
    nTemplate.serverData = $(templateDiv).attr("serverData");
    nTemplate.localData = $(templateDiv).attr("localData");
    templatePool [template] = {template: nTemplate, templateDiv: templateDiv}
    return templatePool [template];
    return {template: nTemplate, templateDiv: templateDiv};
}


/*************************************** ***************************************
 *    callback session
 *************************************** ***************************************/
$(document).ready(function () {
    var now = new Date();
    data.appid = "36";
    data.sessionID = data.uid + now.getTime();
    getEvent();
});


function getEvent() {
    if (data.uid == null || data.sessionID == null) {
        return;
    }
    $.ajax({
        type: "GET",
        url: "/api2/session/event",
        timeout: 30000,
        data: {uid: data.uid, sessionID: data.sessionID},
        success: function (event, textStatus) {
            eventLoop(event)
            getEvent();
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                getEvent();
            }
        }
    });
}

function eventLoop(event) {
    if (event.eventID == "bind_server") {
        alert("bind_server");
        location.href = "default.html";
    }
}


/*************************************** ***************************************
 *    bind token
 *************************************** ***************************************/

$(document).ready(function () {
    $("#bindingtoken").click(function () {
        var weixinName = $("#weixinName").val();
        if (weixinName != "" && weixinName != "请输入公众平台帐号名称") {
            bindingtoken(weixinName)
            function bindingtoken(weixinName) {
                $.ajax({
                    type: "get",
                    url: "/api2/weixin/bindingtoken?",
                    data: {
                        weixinName: weixinName, uid: data.uid, accesskey: data.accesskey
                    },
                    success: function (serverData) {
                        if (serverData["提示信息"] == "微信公众账号正在绑定") {
                            data.bindingWeixinName = weixinName;
                            data.bindingToken = serverData.token;
                            location.href = "step_1.html";
                        }
                    }
                });
            }
        }
        else {
            $("#weixinName").val("请输入公众平台帐号名称");
        }
    });
});

$(document).ready(function () {
    $("#bindingToken").val(data.bindingToken);
});


/*************************************** ***************************************
 *    get Weixins
 *************************************** ***************************************/
$(document).ready(function () {
//    getWeixins();
});
function getWeixins() {
    $.ajax({
        type: "GET",
        url: "/api2/weixin/getall",
        data: {
            uid: data.uid,
            accesskey: data.accesskey
        },
        success: function (serverData) {
            if (serverData["提示信息"] == "获取所有绑定微信公众账号失败") {
                if (serverData["失败原因"] == "没有已绑定微信公众账号") {
                    location.href = "step.html";
                }
            } else if (serverData["提示信息"] == "获取所有绑定微信公众账号成功") {
                data.weixins = serverData.weixins;
                for (var index in data.weixins) {
                    if (index == "") {
                        continue;
                    }
                    data.weixinOpenID = data.weixins[index].weixinOpenID;
                    break
                }
                var nTemplate = getTemplate("weixin_list");
                if (nTemplate == null) {
                    return;
                }
                var innerHtml = nTemplate.template.render();
                nTemplate.templateDiv.html(innerHtml);
                nTemplate.templateDiv.removeClass("hide");

                next();
            }

            function next() {

                {
                    {
                        String.format = function (src) {
                            if (arguments.length == 0) return null;
                            var args = Array.prototype.slice.call(arguments, 1);
                            return src.replace(/\{(\d+)\}/g, function (m, i) {
                                return args[i];
                            });
                        };
                        var dragSrcEl = null;

                        function handleDragStart(e) {
                            this.style.opacity = '0.2';
                            dragSrcEl = this;
                            var appid = $(this).attr("appid");
                            this.classList.add('moving');
                        }

                        function handleDragOver(e) {
                            if (e.preventDefault) {
                                e.preventDefault(); // Necessary. Allows us to drop.
                            }
                            return false;
                        }

                        function handleDragEnter(e) {
                            // this / e.target is the current hover target.
                            this.classList.add('over');
                        }

                        function handleDragEnd(e) {
                            // this/e.target is the source node.
                            this.style.opacity = '0.9';
                            [].forEach.call(cols, function (col) {
                                col.classList.remove('over');
                                col.classList.remove('moving');
                            });
                            $(".circle_out").removeClass("over");
                            $(".circle_out").removeClass("moving");
                        }

                        var cols = document.querySelectorAll('.out_frame');
                        [].forEach.call(cols, function (col) {
                            col.setAttribute('draggable', 'true');
                        });
                        $(".out_frame").bind("dragstart", handleDragStart);
                        $(".out_frame").bind("dragenter", handleDragEnter);
                        $(".out_frame").bind("dragend", handleDragEnd);
                        outFrameOver();
                        getWeixinName();
                        /******************************
                         处理circle_out
                         *****************************/
                        $(".circle_out").bind("dragover", function (e) {
                            if (e.preventDefault) {
                                e.preventDefault(); // Necessary. Allows us to drop.
                            }
                            $(this).addClass("over");
                        });
                        $(".circle_out").bind("dragleave", function () {
                            $(this).removeClass("over");
                        });
                        String.format = function (src) {
                            if (arguments.length == 0) return null;
                            var args = Array.prototype.slice.call(arguments, 1);
                            return src.replace(/\{(\d+)\}/g, function (m, i) {
                                return args[i];
                            });
                        };
                        var dragSrcEl = null;

                        function handleDragStart(e) {
                            this.style.opacity = '0.2';
                            dragSrcEl = this;
                            var appid = $(this).attr("appid");
                            this.classList.add('moving');
                        }

                        function handleDragOver(e) {
                            if (e.preventDefault) {
                                e.preventDefault(); // Necessary. Allows us to drop.
                            }
                            return false;
                        }

                        function handleDragEnter(e) {
                            // this / e.target is the current hover target.
                            this.classList.add('over');
                        }

                        function handleDragEnd(e) {
                            // this/e.target is the source node.
                            this.style.opacity = '0.9';
                            [].forEach.call(cols, function (col) {
                                col.classList.remove('over');
                                col.classList.remove('moving');
                            });
                            $(".circle_out").removeClass("over");
                            $(".circle_out").removeClass("moving");
                        }

                        var cols = document.querySelectorAll('.out_frame');
                        [].forEach.call(cols, function (col) {
                            col.setAttribute('draggable', 'true');
                        });
                        $(".out_frame").bind("dragstart", handleDragStart);
                        $(".out_frame").bind("dragenter", handleDragEnter);
                        $(".out_frame").bind("dragend", handleDragEnd);
                        /******************************
                         处理circle_out
                         *****************************/
                        $(".circle_out").bind("dragover", function (e) {
                            if (e.preventDefault) {
                                e.preventDefault(); // Necessary. Allows us to drop.
                            }
                            $(this).addClass("over");
                        });
                        $(".circle_out").bind("dragleave", function () {
                            $(this).removeClass("over");
                        });

                        $(".circle_out").bind("drop", function (arg) {
                            if ($(dragSrcEl).hasClass("out_frame")) {
                                //                        alert($(dragSrcEl).attr("appid"));
                                //                        var appid = $(dragSrcEl).attr("appid");
                                append_circle($(this), $(dragSrcEl));
                            }
                        });
                        $(".circle_out").bind("dragend", function () {
                            $(".circle_out").removeClass("over");
                            $(".circle_out").removeClass("moving");

                        });
                        function append_circle(circle_out, dragSrcEl) {
                            var amount = parseInt(circle_out.attr("amount"));
                            var button = document.createElement("div");
                            button.setAttribute("class", "circel_ele circel_ele_" + (++amount));
//                    button.setAttribute("title", dragSrcEl.attr("title"));
                            button.setAttribute("appid", dragSrcEl.attr("appid"));
                            button.setAttribute("weixinOpenID", circle_out.attr("weixinOpenID"));
                            var img = document.createElement("img");
                            img.setAttribute("src", "/static/images/face.jpg");
                            $(button).append(img);
                            circle_out.append(button);
                            circle_out.attr("amount", amount);
                            var appid = $(button).attr("appid");
                            var weixinOpenID = $(button).attr("weixinOpenID");

                            $.ajax({
                                type: "GET",
                                url: "/api2/weixin/bindapp",
                                data: {uid: "91", accesskey: "123", weixinopenid: weixinOpenID, appid: appid},
                                success: function (event, data) {
                                    if (data["提示信息"] == "微信公众账号添加应用成功") {
                                    }
                                    else {

                                    }
                                }
                            });

                            digui($(button));

                        }

                        function digui(temp) {
                            $(temp).bind("drag", function (e) {
                                var appid = $(this).attr("appid");
                                var weixinOpenID = $(this).attr("weixinOpenID");
                                if (appid != 99) {
                                    $(temp).remove();
                                    $.ajax({
                                        type: "GET",
                                        url: "/api2/weixin/unbindapp",
                                        data: {uid: "91", accesskey: "123", weixinopenid: weixinOpenID, appid: appid},
                                        success: function (event, data) {
                                            if (data["提示信息"] == "微信公众账号移除应用成功") {
                                                //                                        alert(appid0);
                                            }
                                            else {
                                                //                                        alert(appid0);
                                            }
                                        }
                                    });
                                    for (var acc = 0; acc < $(".circle_out").length; acc++) {
                                        if ($($(".circle_out")[acc]).attr("weixinOpenID") == $(this).attr("weixinOpenID")) {

                                            var circle = $($(".circle_out")[acc]);
                                            var amount1 = parseInt(circle.attr("amount"));
                                            circle.attr("amount", amount1 - 1);
                                            //先删除所有ele
                                            var all = circle[0].children;
                                            var length = all.length;
                                            for (var i = 1; i < length; i++) {
                                                var button = circle[0].children[i];
                                                $(button).attr("class", "circel_ele circel_ele_" + (i));
                                            }
                                        }
                                    }
                                }
                            });

                        }


//                直接页面生成的注册事件
                        for (var acc = 0; acc < $(".circle_out").length; acc++) {
                            for (var acc2 = 0; acc2 < $($(".circle_out")[acc]).attr("amount"); acc2++) {
                                var temp = $($(".circle_out")[acc])[0].children[acc2 + 1];
                                var weixinOpenID = $($(".circle_out")[acc]).attr("weixinOpenID");
                                $(temp).bind("drag", function (e) {
                                    var appid = $(this).attr("appid");
                                    var weixinOpenID = $(this).attr("weixinOpenID");
                                    if (appid != 99) {
                                        $(this).remove();
                                        $.ajax({
                                            type: "GET",
                                            url: "/api2/weixin/unbindapp",
                                            data: {uid: "91", accesskey: "123", weixinopenid: weixinOpenID, appid: appid},
                                            success: function (event, data) {
                                                if (data["提示信息"] == "微信公众账号移除应用成功") {
                                                    //                                        alert(appid0);
                                                }
                                                else {
                                                    //                                        alert(appid0);
                                                }
                                            }
                                        });
                                        for (var acc = 0; acc < $(".circle_out").length; acc++) {
                                            if ($($(".circle_out")[acc]).attr("weixinOpenID") == $(this).attr("weixinOpenID")) {

                                                var circle = $($(".circle_out")[acc]);
                                                var amount1 = parseInt(circle.attr("amount"));
                                                circle.attr("amount", amount1 - 1);
                                                //先删除所有ele
                                                var all = circle[0].children;
                                                var length = all.length;
                                                for (var i = 1; i < length; i++) {
                                                    var button = circle[0].children[i];
                                                    $(button).attr("class", "circel_ele circel_ele_" + (i));
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }

                    }
                }
                //            registerWeixinListEvent();
            }
        }
    });
}

function registerWeixinListEvent() {

    $(".app_delete").click(function () {
        var appid = $(this).attr("appid");
        console.log(appid);
        deleteApp(appid);
    });
}


/*************************************** ***************************************
 *    add and modify App
 *************************************** ***************************************/
$(document).ready(function () {


    var image_changed = false;
    var js_changed = false;

    $("#app_modify").click(function () {
        var name = $("#app_name").val();
        var description = $("#app_description").val();
        if (name != "") {
            modifyApp(name, description);
        }
        else {
            alert("应用名称不能为空！");
        }
    });

    function modifyApp(name, description) {
        if (image_changed == true) {
            uploadPic(next);
        }
        else {
            next(data.currentApp.icon);
        }

        function next(filename) {
            if (js_changed == true) {
                readJS(next);
            }
            else {
                next(data.currentApp.script);
            }
            function next(script) {
                $.ajax({
                    type: "POST",
                    url: "/api2/app/modify?",
                    data: {
                        uid: data.uid,
                        accesskey: data.accesskey,
                        script: script,
                        appid: data.currentApp.appid,
                        app: JSON.stringify({
                            name: name,
                            description: description,
                            icon: filename,
                            type: "public"
                        })
                    },
                    success: function (serverData) {
                        if (serverData["提示信息"] == "修改应用成功") {
                            location.href = "default.html";
                        }
                        else {
                            console.log(serverData);
                        }
                    }
                });
            }
        }
    }

    $("#app_add").click(function () {
        var name = $("#app_name").val();
        var description = $("#app_description").val();
        if (name != "") {
            addApp(name, description);
        }
        else {
            alert("应用名称不能为空！");
        }
    });

    function addApp(name, description) {
        uploadPic(next);
        function next(filename) {
            readJS(next);
            function next(script) {
                $.ajax({
                    type: "POST",
                    url: "/api2/app/add?",
                    data: {
                        uid: data.uid,
                        accesskey: data.accesskey,
                        script: script,
                        app: JSON.stringify({
                            name: name,
                            description: description,
                            icon: filename,
                            type: "public"
                        })
                    },
                    success: function (serverData) {
                        if (serverData["提示信息"] == "新建应用成功") {
                            location.href = "default.html";
                        }
                        else {
                            console.log(serverData);
                        }
                    }
                });
            }
        }
    }

    $('.js_upload_image').click(function () {
        $("#input_image").val("");
        $("#input_image").trigger("click");
    });

    $('.js_upload_js').click(function () {
        $("#input_js").val("");
        $("#input_js").trigger("click");
    });

    $("#input_js").change(function () {
        js_changed = true;
        var files = this.files;
        for (var i = 0, file; file = files[i]; i++) {
            filename = file.name;
            $("#upload_file_name").html(filename);
            break;
        }
    });
    function readJS(next) {
        var file = $("#input_js")[0].files[0];
        var jsReader = new FileReader();
        jsReader.onload = function (e) {
            var urlData = this.result;
            var script = getScript(urlData)
            next(script);
        };
        jsReader.readAsDataURL(file);
    }

    function getScript(urlData) {
        if (urlData.indexOf("data:application/x-javascript;base64,") != 0) {
            alert("脚本格式不正确");
        }
        var script = urlData.substr(37);
        return script;
    }


    function uploadPic(next) {
        if (app.uploadStatus == "uploading") {
            var file = $("#input_image")[0].files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var urlData = this.result;

                $.ajax({
                    data: {filename: "1.png", image: urlData, weibo_user: data.uid},
                    type: 'POST',
//                    url: (app.serverUrl + "/upload2/"),
                    url: ("/upload2/"),
                    success: function (data) {
                        var filename = data.filename;
                        var pidRegExp = /^\d{15}$/;
                        if (pidRegExp.test(filename) && data["提示信息"] == "图片上传成功") {
                            next(filename);
                            app.uploadStatus = "none";
                        }
                        else {
                            alert(JSON.stringify(data));
                        }
                    }
                });
            };

        }
        else {
            next("default.png")
        }
    }


    $("#input_image").change(function () {
        image_changed = true;

        var myFiles = this.files;
        for (var i = 0, file; file = myFiles[i]; i++) {
            var imageReader = new FileReader();
            imageReader.onload = function (e) {
                var span = document.createElement('span');
                span.innerHTML = ['<img class="images" src="', this.result, '" title="', file.name, '"/>'].join('');

                $("#thumbs").empty();
                $("#thumbs").append(span);
                if (app.uploadStatus == "none") {
                    app.uploadStatus = "uploading";
                }
            }
            imageReader.readAsDataURL(file);
            break;
        }

    });
});

/*************************************** ***************************************
 *    get apps    del app    modify app
 *************************************** ***************************************/

function getApps() {
    $.ajax({
        type: "GET",
        url: "/api2/app/getall",
        data: {
            uid: data.uid,
            accesskey: data.accesskey,
            weixinopenid: data.weixinopenid,
            filter: "ALL"
        },
        success: function (serverData) {
            console.log(serverData);
            data.apps = serverData.apps;
            var nTemplate = getTemplate("app_list");
            var innerHtml = nTemplate.template.render();
            nTemplate.templateDiv.html(innerHtml);
            nTemplate.templateDiv.removeClass("hide");
            registerAppListEvent();
        }
    });
}

function registerAppListEvent() {

    $(".app_config").click(function () {
        var appid = $(this).attr("appid");
        console.log(appid);
        modifyApp(appid);
    });


    $(".app_delete").click(function () {

        var appid = $(this).attr("appid");
        console.log(appid);
        if (appid == "99") {
            alert("基础应用不能被删除")
            return;
        }
        deleteApp(appid);
    });
}

function deleteApp(appid) {
    $.ajax({
        type: "GET",
        url: "/api2/app/delete",
        data: {
            uid: data.uid,
            accesskey: data.accesskey,
            appid: appid
        },
        success: function (serverData) {
            console.log(serverData);
            if (serverData["提示信息"] == "删除应用成功") {
                $(".out_frame[appid=" + appid + "]").addClass("hide");
                getApps();
            }
        }
    });
}
function modifyApp(appid) {
    data.appid = appid;
    location.href = "personal_app_change.html";
//    $.ajax({
//        type: "POST",
//        url: "/api2/app/modify",
//        app: {
//            appid: data.appid,
//            accesskey: data.accesskey,
//            app: JSON.stringify({
//                "名称": "说的萨",
//                "图标": "发货的合法身份哈师傅沙发上飞",
//                "上传脚本": "kdkdldf.js",
//                "应用说明": "飞到天上去"
//            })
//        },
//        success: function (serverData) {
//            console.log(serverData);
//        }
//    });
}
/*************************************** ***************************************
 *    bind app    unbind app
 *************************************** ***************************************/

$(document).ready(function () {
//    bindapp();
//    unbindapp();
});
function bindapp() {
    $.ajax({
        type: "GET",
        url: "/api2/weixin/bindapp?",
        data: {
            "appid": 77,
            "weixinopenid": "gh_7a898e6d9109"
        },
        success: function (data) {
//            alert(JSON.stringify(data));
        }
    });
}


function unbindapp() {
    $.ajax({
        type: "GET",
        url: "/api2/weixin/unbindapp?",
        data: {
            "appid": 36,
            "weixinopenid": "gh_c6cd8a443586"
        },
        success: function (data) {
            alert(JSON.stringify(data));
        }
    });
}


/*************************************** ***************************************
 *    get users
 *************************************** ***************************************/
$(document).ready(function () {
    data.appid = "36";
    data.start = 0;
    data.end = 50;
//    getUsers();
});
function getUsers() {
    $.ajax({
        type: "GET",
        url: "/api2/user/getall",
        data: {
            uid: data.uid,
            accesskey: data.accesskey,
            weixinopenid: data.weixinOpenID,
            start: data.start,
            end: data.end
        },
        success: function (serverData) {
            console.log(serverData);
            data.users = serverData.users;
            var nTemplate = getTemplate("user_list");
            if (nTemplate == null) {
                return;
            }
            nTemplate.templateDiv.html(nTemplate.template.render());
            nTemplate.templateDiv.removeClass("hide");
            addUserInfoEvent();
            changeUserInfoEvent();
        }
    });
}

function addUserInfoEvent() {
    $(".js_add_info").click(function () {
        var userid = $(this).attr("userid");
        $(this).hide();
        $(".js_modify_element[userid=" + userid + "]").show();
    });
    $(".js_cancel_button").click(function () {
        var userid = $(this).attr("userid");
        $(".js_modify_element[userid=" + userid + "]").hide();
        $(".js_add_info[userid=" + userid + "]").show();
    });
    $(".js_save_button").click(function () {
        var userid = $(this).attr("userid");
        var js_index = $(this).attr("js_index");
        saveClick(userid,js_index,"creat");
    });
}
function changeUserInfoEvent() {
    $(".js_change_info").click(function(){
        var parentParentId = $(this).parent().parent().attr("userid");
        var parentObj = $(this).parent();
        var resetValue = parentObj.html();
        var js_index =  $(".js_save_button[userid='"+parentParentId+"']").attr("js_index");

        /* var childLength =$(this).parent().parent().length;
        var childArray = new array();
        childArray=null;
        var allKey = $(".user_info[userid="+parentParentId+"]").children().children().children()[0].innerHTML;
        for(i=0;i<childLength;i+3){
        childArray[i] = $(".user_info[userid="+parentParentId+"]").children().children().children()[i].innerHTML;
        }*/

        var allValue =$(this).parent() ;
        var changeKey = $(this).children()[0].innerHTML;
        var changValue = $(this).children()[2].innerHTML;
        var changeOpt = "<span class='js_modify_element' style='display:block;' userid='"+parentParentId+"'><input name='' type='text' value='"+changeKey+"'  class='key_style'  userid='"+parentParentId+"'/><input name='' type='text' value='"+changValue+"' class='value_style' userid='"+parentParentId+"'/><span><a href='javascript:;' class='add_opt_button js_change_save' userid='"+parentParentId+"' js_index='"+js_index+"'>保存</a><a href='javascript:;' class='add_opt_button js_change_cancel' userid='"+parentParentId+"'>取消</a></span></span>"

        parentObj.empty();
        parentObj.html(changeOpt);
        $('.js_change_cancel').bind('click', function() {
            alert("修改-取消");
            $(this).parent().parent().parent().html(resetValue);
            //changeUserInfoEvent();
        });
        $('.js_change_save').bind('click', function() {
            alert("修改-保存");
            var userid = $(this).attr("userid");
            var js_index = $(this).attr("js_index");
            saveClick(userid,js_index,"change");
        });

    });
}
function saveClick(userid,js_index,opt){
    alert("开始保存");
    var userid = userid;
    var opt = opt;
    var js_index = js_index;
    var key = $(".key_style" + "[userid='" + userid + "']").val();
    var value = $(".value_style" + "[userid='" + userid + "']").val();
    if (key == "" || value == "") {
        alert("key或value不能为空");
    }
    else {
        var user = data.users[js_index];
        user[key] = value;
        $.ajax({
            type: "POST",
            url: "/api2/user/modify?",
            data: {"uid": "nnnn", "accesskey": "XXXXXX", "userid": userid, "user": JSON.stringify(user)},
            success: function (data) {
                //callback operate
                if (data["提示信息"] = "修改关注用户信息成功") {
                    $(".user_info" + "[userid=" + userid + "] li" + ":last").before(function () {
                        return "<li><span class='infomation_bg js_change_info'><span>" + key + "</span><img src='/static/images/weixin_step/line.png'/><span>" + value + "</span></span></li>";
                    });
                }
                else {
                    alert("连接错误");
                }
            }
        });
        if(opt=="creat"){
            $(".js_modify_element[userid=" + userid + "]").hide();
            $(".js_add_info[userid=" + userid + "]").show();
        }else if(opt=="change"){
            return;
        }
    }
}
function getWeixinName(){
    var weixin_name = $(".js_weixin_list div div p").html();
    $(".weixin_user span").html(weixin_name);
}
function outFrameOver(){
    $('.out_frame').bind({
        mouseenter:function(){
            var appid = $(this).attr("appid");
            $(".app_opreation[appid="+appid+"]").slideDown(150);
        },
        mouseleave:function(){
            var appid = $(this).attr("appid");
            $(".app_opreation[appid="+appid+"]").slideUp(150);
        }
    });
}