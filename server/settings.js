root.globaldata = {};

var serverSetting = {};
globaldata.serverSetting = serverSetting;
serverSetting.environment = "local";//local or server

if (serverSetting.environment == "local") {
    serverSetting.appkey = "2445517113";//魔方石的诱惑
    serverSetting.secret = "c50cd576bd3b7ba0228998831ff5f267";
    serverSetting.callbackUrl = "http://www.weibo.com/oauth/callback";
    serverSetting.imageFolder = "E://nginx//upload//";
}
else if (serverSetting.environment == "server") {
    serverSetting.appkey = "3322737363";
    serverSetting.secret = "37e14bdd7ce808fae43539a6cc39375d";
    serverSetting.callbackUrl = "http://offline.wlm1001.com/oauth2/callback";
    serverSetting.imageFolder = "//upload//weibo//";
}


module.exports = serverSetting;