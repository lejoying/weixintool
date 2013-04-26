/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 *  http://127.0.0.1:8062/api2/account/add?
 *  http://127.0.0.1:8062/api2/account/auth?i=0
 */

var accountManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.

accountManage.add = function (response) {
    response.asynchronous = 1;
    account =
    {
        "accountName":"wwww2",
        "type":"account",
        "password":"8768fd54fd687fd867f465d",
        "phone":"15120080001",
        "phoneStatus":"verified",
        "email":"w1001@163.com",
        "emailStatus":"verifying#366541",
        "accessKey":["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"]
    };

    db.getIndexedNode("account", "accountName", account.accountName, function (err, node) {
        if (node == null) {
            db.getIndexedNode("account", "phone", account.phone, function (err, node) {
                if (node == null) {
                    db.getIndexedNode("account", "email", account.email, function (err, node) {
                        if (node == null) {
                            var node = db.createNode(account);
                            node.save(function (err, node) {
                                node.data.uid = node.id;
                                node.index("account", "accountName", account.accountName);
                                node.index("account", "phone", account.phone);
                                node.index("account", "email", account.email);
                                node.save(function (err, node) {
                                    response.write(JSON.stringify({
                                        "information":"/api2/account/add  success",
                                        "node":node.data
                                    }));
                                    response.end();
                                });
                            });
                        }
                        else {
                            response.write(JSON.stringify({
                                "information":"/api2/account/add  failed",
                                "reason":"email has existed."
                            }));
                            response.end();
                        }
                    });
                } else {
                    response.write(JSON.stringify({
                        "information":"/api2/account/add  failed",
                        "reason":"phone number has existed."
                    }));
                    response.end();
                }
            });
        }
        else {
            response.write(JSON.stringify({
                "information":"/api2/account/add  failed",
                "reason":"account name has existed."
            }));
            response.end();

        }
    });

}

var RSA = require('./../tools/RSA');
accountManage.auth = function (response) {
    response.asynchronous = 1;
    account =
    {
        "accountName":"wwww2",
        "type":"account",
        "password":"8768fd54fd687fd867f465d",
        "phone":"15120080001",
        "phoneStatus":"verified",
        "email":"w1001@163.com",
        "emailStatus":"verifying#366541",
        "accessKey":["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"]
    };

    RSA.setMaxDigits(38);
    var pbkeyStr3 = RSA.RSAKeyStr(
        "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841",
        "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841",
        "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pbkey3 = RSA.RSAKey(pbkeyStr3);

    var pvkeyStr3 = RSA.RSAKeyStr(
        "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1",
        "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1",
        "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pvkey3 = RSA.RSAKey(pvkeyStr3);

//    ciphertext = RSA.encryptedString(pvkey3, "abc");
//    plaintext = RSA.decryptedString(pbkey3, ciphertext);


    response.write(JSON.stringify({
        "uid":RSA.encryptedString(pvkey3, "111"),
        "accessKey":RSA.encryptedString(pvkey3, "f5d4f5d46f4d65f4d654f56d4f"),
        "PbKey":pbkeyStr3
    }));
    response.end();

}

module.exports = accountManage;