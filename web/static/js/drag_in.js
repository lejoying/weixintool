function bindoutframe(){

//    String.format = function (src) {
//        if (arguments.length == 0) return null;
//        var args = Array.prototype.slice.call(arguments, 1);
//        return src.replace(/\{(\d+)\}/g, function (m, i) {
//            return args[i];
//        });
//    };
//    var dragSrcEl = null;
//    function handleDragStart(e) {
//        this.style.opacity = '0.2';
//        dragSrcEl = this;
//        this.classList.add('moving');
//    }
//    function handleDragOver(e) {
//        if (e.preventDefault) {
//            e.preventDefault(); // Necessary. Allows us to drop.
//        }
//        return false;
//    }
//    function handleDragEnter(e) {
//        // this / e.target is the current hover target.
//        this.classList.add('over');
//    }
//    function handleDragEnd(e) {
//        // this/e.target is the source node.
//        this.style.opacity = '0.9';
//        [].forEach.call(cols, function (col) {
//            col.classList.remove('over');
//            col.classList.remove('moving');
//        });
//        $(".circle_out").removeClass("over");
//        $(".circle_out").removeClass("moving");
//    }
//    var cols = document.querySelectorAll('.out_frame');
//    [].forEach.call(cols, function (col) {
//        col.setAttribute('draggable', 'true');
//    });
//    $(".out_frame").bind("dragstart", handleDragStart);
//    $(".out_frame").bind("dragenter", handleDragEnter);
//    $(".out_frame").bind("dragend", handleDragEnd);
//    /******************************
//     处理circle_out
//     *****************************/
//    $(".circle_out").bind("dragover", function (e) {
//        if (e.preventDefault) {
//            e.preventDefault(); // Necessary. Allows us to drop.
//        }
//        $(this).addClass("over");
//    });
//    $(".circle_out").bind("dragleave", function () {
//        $(this).removeClass("over");
//    });
//
//    $(".circle_out").bind("drop", function (arg) {
//        if ($(dragSrcEl).hasClass("out_frame")) {
//            append_circle($(this));
//        }
//    });
//
//    $(".circle_out").bind("dragend", function () {
//        $(".circle_out").removeClass("over");
//        $(".circle_out").removeClass("moving");
//
//    });
//    function append_circle(circle) {
//        var amount = parseInt(circle.attr("amount"));
//        var button=document.createElement("div");
//        button.setAttribute("class","circel_ele circel_ele_"+(++amount));
//        button.setAttribute("title","微信订餐管理");
//        button.setAttribute('draggable', 'true');
//        var img = document.createElement("img");
//        img.setAttribute("src","/static/images/face.jpg");
//        $(button).append(img);
//        circle.append(button);
//        circle.attr("amount", amount);
//        digui($(button));
//
//    }
//    function digui(qq){
//        qq.bind("drag", function (e) {
//            qq.remove();
//            var circle= $($(".circle_out")[0]);
//            var amount1 = parseInt(circle.attr("amount"));
//            circle.attr("amount", amount1 - 1);
//            //先删除所有ele
//            var all = $(".circel_ele");
//            all.remove();
//            //重新排列
//            for(var i=1; i<amount1; i++){
//                var button1=document.createElement("div");
//                button1.setAttribute("class","circel_ele circel_ele_"+(i));
//                button1.setAttribute("title","微信订餐管理");
//                button1.setAttribute('draggable', 'true');
//                var img1 = document.createElement("img");
//                img1.setAttribute("src","/static/images/logo_app.png");
//                $(button1).append(img1);
//                circle.append(button1);
//                digui($(button1));
//            }
//        });
//    }
}

//String.format = function (src) {
//    if (arguments.length == 0) return null;
//    var args = Array.prototype.slice.call(arguments, 1);
//    return src.replace(/\{(\d+)\}/g, function (m, i) {
//        return args[i];
//    });
//};
//
//var dragSrcEl = null;
//
//function handleDragStart(e) {
//    this.style.opacity = '0.2';
//
//    dragSrcEl = this;
//
//    this.classList.add('moving');
//}
//
//function handleDragOver(e) {
//    if (e.preventDefault) {
//        e.preventDefault(); // Necessary. Allows us to drop.
//    }
//    return false;
//}
//
//function handleDragEnter(e) {
//    // this / e.target is the current hover target.
//    this.classList.add('over');
//}
//
//function handleDragEnd(e) {
//    // this/e.target is the source node.
//    this.style.opacity = '0.9';
//    [].forEach.call(cols, function (col) {
//        col.classList.remove('over');
//        col.classList.remove('moving');
//    });
//    $(".circle_out").removeClass("over");
//    $(".circle_out").removeClass("moving");
//}
//
//var cols = document.querySelectorAll('.out_frame');
//[].forEach.call(cols, function (col) {
//    col.setAttribute('draggable', 'true');
//});
//$(".out_frame").bind("dragstart", handleDragStart);
//$(".out_frame").bind("dragenter", handleDragEnter);
//$(".out_frame").bind("dragend", handleDragEnd);
//
//
///******************************
// 处理circle_out
// *****************************/
//$(".circle_out").bind("dragover", function (e) {
//    if (e.preventDefault) {
//        e.preventDefault(); // Necessary. Allows us to drop.
//    }
//    $(this).addClass("over");
//});
//$(".circle_out").bind("dragleave", function () {
//    $(this).removeClass("over");
//});
//
//$(".circle_out").bind("drop", function (arg) {
//    if ($(dragSrcEl).hasClass("out_frame")) {
//        append_circle($(this));
//    }
//});
//
//$(".circle_out").bind("dragend", function () {
//    $(".circle_out").removeClass("over");
//    $(".circle_out").removeClass("moving");
//
//});
//function append_circle(circle) {
//    var amount = parseInt(circle.attr("amount"));
//    var button=document.createElement("div");
//    button.setAttribute("class","circel_ele circel_ele_"+(++amount));
//    button.setAttribute("title","微信订餐管理");
//    button.setAttribute('draggable', 'true');
//    var img = document.createElement("img");
//    img.setAttribute("src","/static/images/face.jpg");
//    $(button).append(img);
//    circle.append(button);
//    circle.attr("amount", amount);
//    //ajax
//    $.ajax({
//        type: "GET",
//        url: "/api2/weixin/bindapp",
//        data: {uid: "", accesskey: "", weixinopenid: "16", appid: "100"},
//        success: function (event, data) {
//            if (data["提示信息"] == "微信公众账号添加应用成功") {
//
//            }
//            else{
//
//            }
//        }
//    });
//
//    digui($(button));
//}
//function digui(qq){
//    qq.bind("drag", function (e) {
//        qq.remove();
//        $.ajax({
//            type: "GET",
//            url: "/api2/weixin/unbindapp",
//            data: {uid: "", accesskey: "", weixinopenid: "16", appid: "100"},
//            success: function (event, data) {
//                if (data["提示信息"] == "微信公众账号移除应用成功") {
//                }
//                else{
//
//                }
//            }
//        });
//        var circle= $($(".circle_out")[0]);
//        var amount1 = parseInt(circle.attr("amount"));
//        circle.attr("amount", amount1 - 1);
//        //先删除所有ele
//        var all = $(".circel_ele");
//        all.remove();
//        //重新排列
//        for(var i=1; i<amount1; i++){
//            var button1=document.createElement("div");
//            button1.setAttribute("class","circel_ele circel_ele_"+(i));
//            button1.setAttribute("title","微信订餐管理");
//            button1.setAttribute('draggable', 'true');
//            var img1 = document.createElement("img");
//            img1.setAttribute("src","/static/images/logo_app.png");
//            $(button1).append(img1);
//            circle.append(button1);
//            digui($(button1));
//        }
//    });
//}
