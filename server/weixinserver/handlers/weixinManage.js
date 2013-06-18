/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var weixinManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);


/***************************************
 *     URL：/api2/weixin/bindingtoken
 ***************************************/
weixinManage.bindingtoken = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        weixinOpenID: "",
        weixinName: data.weixinName,
        token: "",
        status:"binding"
    };

    var account = {
        "uid": data.uid
    };

    var timestamp = new Date().getTime();
    var random = Math.random();
    var token = (timestamp * random).toString().substring(1, 11);
    weixin.token = token;


    createWeixinNode();

    function createWeixinNode() {
        var query = [
            'START account=node({uid})' ,
            'CREATE (weixin:Weixin{weixin})',
            'CREATE UNIQUE account-[r:HAS_WEIXIN]->weixin',
            'RETURN  weixin, account, r'
        ].join('\n');

        var params = {
            uid: parseInt(account.uid),
            weixin: weixin
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            } else {
                var accountNode = results.pop().account;
                response.write(JSON.stringify({
                    "提示信息": "微信公众账号正在绑定",
                    "token": weixin.token
                }));
                response.end();
            }

        });
    }


}
/***************************************
 *     URL：/api2/weixinuer/add
 ***************************************/
weixinManage.add = function (data, response) {
    response.asynchronous = 1;
    var uid = data.uid;

    db.getNodeById(uid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息": "添加微信绑定用户失败",
                "失败原因": "账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {
        var timestamp = new Date().getTime();
        var token = Math.random();
        var subtoken = timestamp * token;
        var pushToken = subtoken.toString().substring(1, 11);
        var weixin =
        {
            "type": "weixin",
            "weixinOpenID": data.weixinOpenID,
            "weixinName": data.weixinName,
            "token": pushToken

        };

        db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
            if (node == null) {
                weixinAdd();
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": "添加微信绑定用户失败",
                    "node": node.data
                }));
                response.end();
            }
        });
        function weixinAdd() {
            var weixinNode = db.createNode(weixin);
            weixinNode.save(function (err, weixinNode) {
                weixinNode.data.weixinid = weixinNode.id;
                weixinNode.index("weixin", "weixinid", weixinNode.id);
                weixinNode.index("weixin", "weixinOpenID", weixin.weixinOpenID);
                weixinNode.save(function (err, weixinNode) {

                    weixinNode.createRelationshipFrom(accountNode, "OWNED");
                    response.write(JSON.stringify({
                        "提示信息": "添加信息成功",
                        "node": weixinNode.data
                    }));
                    response.end();
                });
            });
        }
    }
}

/***************************************
 *     URL：/api2/weixinuer/delete
 ***************************************/
weixinManage.delete = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type": "weixin",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": data.token
    }
    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
            node.delete();
            response.write(JSON.stringify({
                "information": "删除微信绑定用户成功",
                "node": node.data
            }));
            response.end();
        } else {
            response.write(JSON.stringify({
                "提示信息": "删除微信绑定用户失败",
                "reason": "微信用户不存在"
            }));
            response.end();
        }
    });
}
/***************************************
 *     URL：/api2/weixinuer/modify
 ***************************************/
weixinManage.modify = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type": "weixin",
        "weixinOpenID": data.weixinOpenID,
        "accountName": data.accountName,
        "password": data.password,
        "phone": data.phone,
        "email": data.email,
        "token": data.token
    }

    RSA.setMaxDigits(38);
    var pbkeyStr3 = RSA.RSAKeyStr("5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "5db114f97e3b71e1316464bd4ba54b25a8f015ccb4bdf7796eb4767f9828841", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pbkey3 = RSA.RSAKey(pbkeyStr3);

    var pvkeyStr3 = RSA.RSAKeyStr("10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "10f540525e6d89c801e5aae681a0a8fa33c437d6c92013b5d4f67fffeac404c1", "3e4ee7b8455ad00c3014e82057cbbe0bd7365f1fa858750830f01ca7e456b659");
    var pvkey3 = RSA.RSAKey(pvkeyStr3);

    db.getIndexedNode("message", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
//            node.getRelationshipNodes("weixin", "weixinOpenID",weixin.weixinOpenID ,function(err, node){})
            node.save(function (err, node) {
                node.data.weixinOpenID = weixin.weixinOpenID;
                node.data.weixinName = weixin.weixinName;
                node.data.phone = weixin.phone;
                node.data.email = weixin.email;
                node.index("weixin", "weixinOpenID", weixin.weixinOpenID);
                node.index("weixin", "weixinName", weixin.weixinName);
                node.index("weixin", "phone", weixin.phone);
                node.index("weixin", "email", weixin.email);
                node.save(function (err, node) {
                    response.write(JSON.stringify({
                        "提示信息": "修改微信绑定用户成功",
                        "node": node.data
                    }));
                    response.end();
                });
            });

        } else {
            response.write(JSON.stringify({
                "提示信息": "修改微信绑定用户失败",
                "reason": "微信用户不存在"
            }));
            response.end();
        }
    });
}

/***************************************
 *     URL：/api2/weixinuer/gatall
 ***************************************/
weixinManage.getall = function (data, response) {
    response.asynchronous = 1;

    var uid = data.uid;

    db.getNodeById(uid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息": "获取所有微信绑定用户失败",
                "失败原因": "账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {

        accountNode.getRelationshipNodes({type: 'OWNED', direction: 'out'}, function (err, weixinNodes) {
            var weixins = {};
            for (var index in weixinNodes) {
                var weixinNode = weixinNodes[index];
                weixins[weixinNode.data.weixinid] = weixinNode.data;
            }

            response.write(JSON.stringify({
                "提示信息": "获取所有微信绑定用户成功",
                "weixins": weixins
            }));
            response.end();
        });
    }
}

module.exports = weixinManage;