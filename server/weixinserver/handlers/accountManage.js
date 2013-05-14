/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var accountManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.
var RSA = require('./../tools/RSA');


/***************************************
 *     URL：/api2/account/add
 ***************************************/
accountManage.add = function (data, response) {
    response.asynchronous = 1;
    var account = {
        "accountName": data.accountName,
        "type": "account",
        "password": data.password,
        "phone": data.phone,
        "phoneStatus": "verified",
        "email": data.email,
        "emailStatus": "verifying#366541",
        "accessKey": ["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"]
    };
    RSA.setMaxDigits(38);
    var pbkeyStr3 = RSA.RSAKeyStr("5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pbkey3 = RSA.RSAKey(pbkeyStr3);

    var pvkeyStr3 = RSA.RSAKeyStr("10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pvkey3 = RSA.RSAKey(pvkeyStr3);

    db.getIndexedNode("account", "accountName", account.accountName, function (err, node) {
        if (node == null) {
            if (account.email == null) {
                addAccountToNeo4j();
            }
            db.getIndexedNode("account", "email", account.email, function (err, node) {
                if (node == null) {
                    addAccountToNeo4j();
                }
                else {
                    response.write(JSON.stringify({
                        "提示信息": "注册账号失败",
                        "reason": "注册邮箱已存在。"
                    }));
                    response.end();
                }
            });
        }
        else {
            response.write(JSON.stringify({
                "提示信息": "注册账号失败",
                "reason": "账号名已存在。"
            }));
            response.end();
        }
    });

    function addAccountToNeo4j(){
        var node = db.createNode(account);
        node.save(function (err, node) {
            node.data.uid = node.id;
            node.index("account", "accountName", account.accountName);
            node.index("account", "phone", account.phone);
            node.index("account", "email", account.email);
            node.save(function (err, node) {
                response.write(JSON.stringify({
                    "提示信息": "注册账号成功",
                    "uid": node.data.uid,
                    "acccesskey": node.data.accessKey
                }));
                response.end();
            });
        });
    }
}

var RSA = require('./../tools/RSA');
/***************************************
 *     URL：/api2/account/exist
 ***************************************/
accountManage.exist = function (data, response) {
    response.asynchronous = 1;
    account = {
        "accountName": data.accountName,
        "email": data.email
    };
    checkAccountName();

    function checkAccountName() {
        if (account.accountName != null) {
            db.getIndexedNode("account", "accountName", account.accountName, function (err, node) {
                if (node != null) {
                    response.write(JSON.stringify({
                        "提示信息":" 用户名存在",
                        "status": "failed"
                    }));
                    response.end();
                    return;
                }
                else {
                    checkEmail();
                }
            });
        }
        else {
            checkEmail();
        }
    }

    function checkEmail() {
        if (account.email != null) {
            db.getIndexedNode("account", "email", account.email, function (err, node) {
                if (node != null) {
                    response.write(JSON.stringify({
                        "提示信息": " 邮箱已存在",
                        "status": "failed"
                    }));
                    response.end();
                    return;
                }
                else {
                    responsePass();
                }
            });
        }
        else {
            responsePass();
        }
    }

    function responsePass() {
        response.write(JSON.stringify({
            "提示信息": (account.accountName || account.email) + " 不存在",
            "status": "passed"
        }));
        response.end();
    }
}

var RSA = require('./../tools/RSA');
/***************************************
 *     URL：/api2/account/auth
 ***************************************/
accountManage.auth = function (data, response) {
    response.asynchronous = 1;
    account = {
        "accountName": data.accountName,
        "password": data.password,
        "type": "account",
        "phone": data.phone,
        "email": data.email
    };
    RSA.setMaxDigits(38);
    var pbkeyStr3 = RSA.RSAKeyStr("5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pbkey3 = RSA.RSAKey(pbkeyStr3);

    var pvkeyStr3 = RSA.RSAKeyStr("10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pvkey3 = RSA.RSAKey(pvkeyStr3);

    if (account.accountName != null) {
        checkAccountName();
    }
    else if (account.phone != null) {
        checkPhone();
    }
    else if (account.email != null) {
        checkEmail();
    }


    function checkAccountName() {
        db.getIndexedNode("account", "accountName", account.accountName, function (err, node) {
            if (node != null) {
                var data = node.data;
                if (account.password == node.data.password) {
                    node.index("account", "accountName", account.accountName);
                    response.write(JSON.stringify({
                        "提示信息": "账号不存在 ",
                        "status": "通过验证"
                    }));
                    response.end();
                }
                else {
                    response.write(JSON.stringify({
                        "提示信息": account.password + " 密码不正确",
                        "status": "账号登录失败"
                    }));
                    response.end();
                }
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": account.accountName + " 用户不存在",
                    "status": "账号登录失败"
                }));
                response.end();
            }

        });
    }

    function checkPhone() {
        db.getIndexedNode("account", "phone", account.phone, function (err, node) {
            if (node != null) {
                var data = node.data;
                if (account.password == node.data.password) {
                    node.index("account", "phone", account.phone);
                    response.write(JSON.stringify({
                        "提示信息": "电话存在",
                        "status": "通过验证"
                    }));
                    response.end();
                }
                else {
                    response.write(JSON.stringify({
                        "提示信息": account.password + " 密码不正确",
                        "status": "账号登录失败"
                    }));
                    response.end();
                }
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": account.phone + " 电话号码不存在",
                    "status": "账号登录失败"
                }));
                response.end();
            }

        });

    }

    function checkEmail() {
        db.getIndexedNode("account", "email", account.email, function (err, node) {
            if (node != null) {
                var data = node.data;
                if (account.password == node.data.password) {
                    node.index("account", "email", account.email);
                    response.write(JSON.stringify({
                        "提示信息": "邮箱存在",
                        "status": "通过验证"
                    }));
                    response.end();
                }
                else {
                    response.write(JSON.stringify({
                        "提示信息": account.password + " 密码不正确",
                        "status": "账号登录失败"
                    }));
                    response.end();
                }
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": account.email + " 邮箱不存在",
                    "status": "账号登录失败"
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/account/trash
 ***************************************/



module.exports = accountManage;