var server = require("./server");
var route  = require("./route");

//var serverSetting = root.globaldata.serverSetting;
//console.log("index: " + JSON.stringify(serverSetting));

server.start(route.route);