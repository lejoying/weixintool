root.globaldata = {};

var serverSetting = {};
globaldata.serverSetting = serverSetting;
serverSetting.environment = "local";//local or server
serverSetting.debug = true;

if (serverSetting.environment == "local") {
    serverSetting.imageFolder = "E://codespace//";
    serverSetting.neo4jUrl = "http://42.96.138.221:7474/";
}
else if (serverSetting.environment == "server") {
    serverSetting.imageFolder = "/alidata/upload/";
    serverSetting.neo4jUrl = "http://127.0.0.1:7474/";
}

module.exports = serverSetting;