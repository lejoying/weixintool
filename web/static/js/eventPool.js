eventPool = {};
app.eventPool = eventPool;


eventPool.serverPush = eventDispatch;
function eventDispatch(event) {
    if (event == null) {
        return;
    }
    if (event.eventID == "account_owned_weibo_add") {
        var owned_weibo_container = $(".templateContainer[template='owned_weibo']");
        renderTemplate(owned_weibo_container);
    }
    else if (event.eventID == "") {

    }

};

eventPool.body = function (status, area) {

    if (app.localSettings.key == null || app.localSettings.account == null) {
        window.location.href = "/account.html";
    }

    var now = new Date();
    app.time = new Time(now);
    app.forwardTime = new Time(now);

    $("#slide_ctrls li a").click(function () {
        var main_panel = $(this).attr("slide");

        $("#slide_ctrls li a").removeClass("current");
        $(this).toggleClass("current");

        $(".subnav").removeClass("current");
        $(".subnav").hide();
        $(".subnav[slide='" + main_panel + "']").toggleClass("current");
        $(".subnav[slide='" + main_panel + "']").show();

        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", main_panel);
        renderTemplate(main_panel_container);
    });

    $(".subnav li a").click(function () {
        var main_panel = $(this).attr("slide");

        $(".subnav li a[slide='" + main_panel + "']").removeClass("current");
        $(this).toggleClass("current");

        var subSlide = $(this).attr("subSlide");
        if (subSlide == "forward_mine") {
            data.statusList = "mine";
        }
        else if (subSlide == "forward_friend") {
            data.statusList = "friends";
        }
        else if (subSlide == "main_offline_post_list") {
            data.list = "post";
            main_panel = $(this).attr("subSlide");
        }
        else if (subSlide == "main_offline_forward_list") {
            data.list = "forward";
            main_panel = $(this).attr("subSlide");
        }
        else {
            return;
        }

        var main_panel_container = $(".templateContainer[template='main_panel']");
        main_panel_container.attr("status", main_panel);
        renderTemplate(main_panel_container);
    });


    $(".search_input_text").focus(function () {
        var text = $(this).val().trim();
        if (text == "请输入微博昵称或ID或URL") {
            $(this).val("");
        }
    });

    $(".search_input_text").blur(function () {
        var text = $(this).val().trim();
        ;
        if (text == "") {
            $(this).val("请输入微博昵称或ID或URL");
        }
    });


    $(".search_button").click(function () {
        var text = $(".search_input_text").val().trim();

        var id = text.match(/^\d{16}$/);
        if (text == "请输入微博昵称或ID或URL") {
            return;
        }
        else if (text.indexOf("weibo.com") != -1) {
            var index = text.search(/\/\d{10}\//);
            var mid = text.substring(index + 12);

            var url = "2/statuses/queryid.json";
            $.ajax({
                data: {
                    url: url,
                    type: 1,
                    mid: mid,
                    isBase62: 1,
                    abc: "abc@163.com"
                },
                type: 'POST',
                url: ("http://" + app.serverUrl + "/api2/weiboInterface/weibo"),
                success: function (serverData) {
                    data.statusList = "id";
                    data.statusList_id = serverData.id;
                    next();
                }
            });
        }
        else if (id != null) {
            data.statusList = "id";
            data.statusList_id = id;
            next();
        }
        else {
            data.statusList = "screen_name";
            data.statusList_screen_name = text;
            next();
        }

        function next() {
            var main_panel = "main_forward"
            var main_panel_container = $(".templateContainer[template='main_panel']");
            main_panel_container.attr("status", main_panel);
            renderTemplate(main_panel_container);
        }

    });


    $(".normalTitle h2").click(function () {
        $(".nav").slideToggle("fast");
        $(".subnav.current").slideToggle("fast");
    });


    $("body").click(function () {
        var droppedElements = $(".drop");
        droppedElements.toggleClass("drop");
        var shouldHideElements = $(".shouldHide");
        shouldHideElements.toggleClass("hide");
        shouldHideElements.toggleClass("shouldHide");
    });
};

eventPool.login_bar = function (status, area) {

    $(".account", area).click(function () {
        $(this).toggleClass("drop");
        $(".afterlogin", $(this)).toggleClass("hide");
        $(".afterlogin", $(this)).toggleClass("shouldHide");
        return false;//block event message loop pop this message to its father element.
    });


    $(".login_bar_li", area).click(function () {
        var operation = $(this).attr("operation");

        var main_panel_container = $(".templateContainer[template='main_panel']");
        if (operation == "change_password") {
            main_panel_container.attr("status", "main_password");
            renderTemplate(main_panel_container);
            return true;
        }
        else if (operation == "weibo_management") {
            $(".account", $(".templateContainer[template='owned_weibo']")).trigger("click", ["management"]);
            return true;
        }
    });

    $("#auth_logout", area).click(function () {
        app.localSettings.key = undefined;
        app.localSettings.account = undefined;
        app.localSettings.ownedWeibo = undefined;
        app.localSettings.authTip = "重新登录";
        saveLocalSettings();
        window.location.href = "/account.html";
    });
};


eventPool.owned_weibo = function (status, area) {

    $(".account", area).click(function (event, management) {
        if (management == null) {
            $(".owned_weibo_del", area).addClass("hide");
        }
        else {
            $(".owned_weibo_del", area).removeClass("hide");
        }
        $(this).toggleClass("drop");
        $(".afterlogin", $(this)).toggleClass("hide");
        $(".afterlogin", $(this)).toggleClass("shouldHide");
        return false;//block event message loop pop this message to its father element.
    });


    $(".owned_weibo_li", area).click(function () {
        app.localSettings.ownedWeibo.currentWeibo = $(this).attr("weibo");
        $(".current_weibo", area).html(app.localSettings.ownedWeibo.currentWeibo);
        $(".current_weibo_image", area).attr("src", app.localSettings.ownedWeibo.ownedWeiboList[app.localSettings.ownedWeibo.currentWeibo].profile_image_url);
        $(".current_weibo_image", area).attr("weibo_user_id", app.localSettings.ownedWeibo.ownedWeiboList[app.localSettings.ownedWeibo.currentWeibo].id);

        var main_panel_container = $(".templateContainer[template='main_panel']");
        var main_panel = main_panel_container.attr("status");
        if (main_panel == "main_offline_post_list" || main_panel == "main_offline_forward_list") {
            renderTemplate(main_panel_container);
        }
    });

    $(".current_weibo_image", area).click(function () {
        var weibo_user_id = $(this).attr("weibo_user_id");
        window.open("http://weibo.com/u/" + weibo_user_id);
        return false;
    });

    $(".weibo_image", area).click(function () {
        var weibo_user_id = $(this).attr("weibo_user_id");
        window.open("http://weibo.com/u/" + weibo_user_id);
        return false;
    });

    $(".add_weibo_user", area).click(function () {
        var url = "http://login.sina.com.cn/sso/logout.php?entry=openapi&r=https://api.weibo.com/oauth2/authorize?redirect_uri=";
        url += data.callbackUrl//授权回调页：
        url += "%26client_id=";
        url += data.appkey;
        url += "%26state=";
        url += data.account;
        url += "%26response_type=code%23";
        window.open(url);
        return false;
    });


    $(".owned_weibo_del", area).click(function () {

        var willDel = confirm("删除授权管理微博账号，确定？");
        if (willDel == false) {
            return false;
        }
        else {
            var delWeibo = $(this).attr("weibo");
            $.ajax({
                data: {"account": app.localSettings.account, "ownedWeibo": delWeibo},
                success: function (data) {
                    delete app.localSettings.ownedWeibo.ownedWeiboList[delWeibo];
                    renderTemplate(area);
                },
                type: 'GET',
                url: ("http://" + app.serverUrl + "/api2/accountownedweibo/del")
            });

            return false;
        }
    });
};


eventPool.time_control = function (status, area) {
    var localDataBind = $(area).attr("localDataBind");
    var time;
    if (localDataBind == "publish") {
        var time = app.time;
    }
    else if (localDataBind == "forward") {
        var time = app.forwardTime;
    }
    else {
        var time = data.time[localDataBind];
    }

    $(".select_time", area).mousewheel(function (event, delta, deltaX, deltaY) {
        var timetype = $(this).attr("timetype");
        var max = parseInt($(this).attr("max"));
        var min = parseInt($(this).attr("min"));
        var diff = max - min;
        var num = parseInt($(".btn_select_txt", this).text());
        num = -delta + num;
        num = ((num - min) + diff) % diff + min;
        $(".btn_select_txt", this).text(num);
        time[timetype] = num;
        //        console.log(type, -delta, deltaX, deltaY);
        time.public_time = getShortTimeString(time);
        if (localDataBind == "publish") {
            $("#public_time").text(time.public_time);
        }
        return false;
    });


    $(".select_time", area).click(function () {
        var timetype = $(this).attr("timetype");
        var hasClassHide = false;
        var select_time_list = $(".select_time_list[timetype='" + timetype + "']", area)
        if (select_time_list.hasClass("shouldHide")) {
            hasClassHide = true;
        }

        var shouldHideElements = $(".shouldHide");
        shouldHideElements.toggleClass("hide");
        shouldHideElements.toggleClass("shouldHide");
        var droppedElements = $(".drop");
        droppedElements.toggleClass("drop");

        if (!hasClassHide) {
            select_time_list.toggleClass("hide");
            select_time_list.toggleClass("shouldHide");
        }
        return false;
    });

    $(".time_list", area).click(function () {
        var timetype = $(this).attr("timetype");
        var num = $(this).attr("number");
        var select_time = $(".select_time[timetype='" + timetype + "']", area);
        $(".btn_select_txt", select_time).text(num);
        time[timetype] = num;
        time.public_time = getShortTimeString(time);
        if (localDataBind == "publish") {
            $("#public_time").text(time.public_time);
        }
    });

}


