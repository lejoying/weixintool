var requestHandler=require("./requestHandler");

// /var serverSetting = root.globaldata.serverSetting;
//console.log("route: " + JSON.stringify(serverSetting));

function route(pathname,response,postData){
    if (typeof requestHandler.handle[pathname] === 'function') {

        requestHandler.handle[pathname](response,postData);
        response.end();
    }
    else {
        console.log("No request handler found for " +pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");

    }
}
exports.route=route;/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-2-16
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */
