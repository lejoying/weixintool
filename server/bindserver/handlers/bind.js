var bind = {};


bind.message = function (echostr, response) {
    response.write(echostr);
}
bind.weixinuser = function (echostr, response) {
    response.write(echostr);
}



module.exports = bind;