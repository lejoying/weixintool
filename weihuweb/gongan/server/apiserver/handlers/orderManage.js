/**
 * API account/verification handler
 * Date: 2013.05.21
 */

var orderManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var RSA = require('./../tools/RSA');
var sha1 = require('./../tools/sha1');
var ajax = require('../lib/ajax');

RSA.setMaxDigits(38);
var pbkeyStr0 = RSA.RSAKeyStr("5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
var pbkey0 = RSA.RSAKey(pbkeyStr0);

var pvkeyStr0 = RSA.RSAKeyStr("10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
var pvkey0 = RSA.RSAKey(pvkeyStr0);


/***************************************
 *     URL：/api2/order/create
 ***************************************/
orderManage.create = function (data, response) {

    response.asynchronous = 1;
    var order = {
        "type": "order",
        "phone": data.phone,
        "service_type": data.service_type
    };

    var message = "【" + order.phone + "】预定了【" + order.service_type + "】服务，请回应。【乐家生活】";
    sendPhoneMessage("15120088197", message);

    function sendPhoneMessage(phone, message) {
        ajax.ajax({
            type: 'GET',
            url: "http://11529-c9239.sms-api.63810.com/api/SmsSend/user/wsds/hash/54c0b95f55a8851cc15f0ccaaea116ae/encode/utf-8/smstype/notify",
            data: {mobile: phone, content: message},
            success: function (dataStr) {
                //todo check if the message sent failed.
            }
        });
    }

    response.write(JSON.stringify({
        "提示信息": "订单创建成功"
    }));
    response.end();
};


module.exports = orderManage;