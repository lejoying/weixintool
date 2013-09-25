/**
 * API account/verification handler
 * Date: 2013.05.21
 */

var verification = {};

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
 *     URL：/api2/account/verification/get
 ***************************************/
verification.get = function (data, response) {

    response.asynchronous = 1;
    var account = {
        "type": "account",
        "phone": data.phone,
        "phoneStatus": "verified",
        "accessKey": ["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"],
        "verification": "",
        "last_verification_time": 0
    };

    var now = new Date();
    var sha_verification = sha1.hex_sha1(now.toString());
    var verificationStr = sha_verification.substr(0, 5);
    var verificationNum = Math.floor(parseInt(verificationStr, 16) / 1.048577);
    var verification = verificationNum.toString();
    if (verificationNum < 100000) {
        verification = verificationNum.toPrecision(6).split(".")[1].concat(verificationNum);
    }

    account.verification = verification;
    account.last_verification_time = now.getTime();

    var message = "乐家品质生活服务手机验证码：" + verification + "，欢迎您使用【乐家生活】";
    //    console.log(account.phone, message);

    db.getIndexedNode("account", "phone", account.phone, function (err, node) {
        if (node == null) {
            addAccountToNeo4j();
        }
        else {
            var interval = account.last_verification_time - node.data.last_verification_time;
            if (interval > 1000 * 60 * 10) {
                node.data.verification = account.verification;
                node.data.last_verification_time = account.last_verification_time;
                node.save(function (err, node) {
                    sendPhoneMessage(account.phone, message);
                    response.write(JSON.stringify({
                        "提示信息": "验证码已发送到指定手机"
                    }));
                    response.end();
                });
            }
            else if (interval > 1000 * 10 * 1) {
                node.data.last_verification_time = account.last_verification_time;
                var message1 = "乐家品质生活服务手机验证码：" + node.data.verification + "，欢迎您使用【乐家生活】";
                node.save(function (err, node) {
                    sendPhoneMessage(account.phone, message1);
                    response.write(JSON.stringify({
                        "提示信息": "验证码已发送到指定手机"
                    }));
                    response.end();
                });
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": "验证码已于10秒之内发送到指定手机"
                }));
                response.end();
            }
        }
    });

    function addAccountToNeo4j() {
        var node = db.createNode(account);
        node.save(function (err, node) {
            node.data.uid = node.id;
            node.index("account", "phone", account.phone);
            node.save(function (err, node) {
                sendPhoneMessage(account.phone, message);
            });
        });
    }

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

};


/***************************************
 *     URL：/api2/account/verification/auth
 ***************************************/
verification.auth = function (data, response) {

    response.asynchronous = 1;
    var account = {
        "type": "account",
        "phone": data.phone,
        "phoneStatus": "verified",
        "accessKey": ["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"],
        "verification": data.verification
    };

    checkPhone();

    function checkPhone() {
        db.getIndexedNode("account", "phone", account.phone, function (err, node) {
            if (node != null) {
                var data = node.data;
                if (account.verification == data.verification) {
                    console.log(account.phone, "验证码验证通过");
                    response.write(JSON.stringify({
                        "提示信息": "验证码验证通过",
                        "status": "passed",
                        "uid": data.uid,
                        "acccesskey": data.accessKey,
                        "PbKey": pbkeyStr0
                    }));
                    response.end();
                }
                else {
                    response.write(JSON.stringify({
                        "提示信息": "验证码错误不正确",
                        "status": "failed"
                    }));
                    response.end();
                }
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": " 用户名不存在",
                    "status": "failed"
                }));
                response.end();
            }
        });
    }
};


module.exports = verification;