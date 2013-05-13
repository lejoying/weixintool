/**
 * Date: 2013.04.15
 *  http://127.0.0.1:8061/api2/redis/get
 *  http://127.0.0.1:8061/api2/redis/reset?i=0
 */

var demo2 = {};

var redis = require("redis");
var client = redis.createClient();

demo2.get = function (response) {
    response.asynchronous = 1;
    client.get("access", function (err, accessStr) {
        var access = 1;
        if (accessStr != null) {
            access=parseInt(accessStr);
        }

        response.write(JSON.stringify({
            "information":"/api2/redis/get success",
            "access":access
        }));
        response.end();
        access++;
        client.set("access", access);
    });
}

demo2.reset = function (i, response) {
    var access = i;
    client.set("access", access);
    response.write(JSON.stringify({
        "information":"/api2/redis/reset  success",
        "access":access
    }));
}

module.exports = demo2;