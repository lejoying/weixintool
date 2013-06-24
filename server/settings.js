root.globaldata = {};

var serverSetting = {};
globaldata.serverSetting = serverSetting;
serverSetting.environment = "local";//local or server
serverSetting.debug = true;

if (serverSetting.environment == "local") {
    serverSetting.appkey = "2445517113";//魔方石的诱惑
    serverSetting.secret = "c50cd576bd3b7ba0228998831ff5f267";
    serverSetting.callbackUrl = "http://www.weixintool.com";
    serverSetting.imageFolder = "D://Users//ChrisGai//Downloads//nginx-1.3.16//upload//";
    serverSetting.neo4jUrl = "http://42.96.138.221:7474/";
}
else if (serverSetting.environment == "server") {
    serverSetting.appkey = "3322737363";
    serverSetting.secret = "37e14bdd7ce808fae43539a6cc39375d";
    serverSetting.callbackUrl = "http://www.weixintool.com";
    serverSetting.imageFolder = "//Users//ChrisGai//Downloads//nginx-1.3.16//upload//";
    serverSetting.neo4jUrl = "http://127.0.0.1:7474/";
}

module.exports = serverSetting;