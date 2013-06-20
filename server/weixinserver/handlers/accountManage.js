/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var accountManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/account/add
 ***************************************/
accountManage.add = function (data, response) {
    response.asynchronous = 1;
    var account = {
        accountName: data.accountName,
        phone: data.phone,
        email: data.email,
        password: data.password
    };

    checkAccountNodeExist();

    function checkAccountNodeExist() {
        var query = [
            'MATCH account:Account',
            'WHERE account.accountName! ={accountName} OR account.phone! ={phone}',
            'RETURN  account'
        ].join('\n');

        var params = {
            accountName: account.accountName,
            phone: account.phone,
            email: account.email
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            } else if (results.length == 0) {
                createAccountNode();
            } else {
                response.write(JSON.stringify({
                    "提示信息": "注册账号失败",
                    "reason": "账号信息已存在"
                }));
                response.end();

            }
        });
    }

    function createAccountNode() {
        var query = [
            'CREATE account:Account{account}',
            'SET account.uid=ID(account)',
            'RETURN  account'
        ].join('\n');

        var params = {
            account: account
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            } else {
                var accountNode = results.pop().account;
                response.write(JSON.stringify({
                    "提示信息": "注册账号成功",
                    "uid": accountNode.id,
                    "acccesskey": "123",
                    "PbKey": "123"
                }));
                response.end();
            }

        });
    }
}

/***************************************
 *     URL：/api2/account/exist
 ***************************************/
// TODO complete this API as form of "checkAccountNodeExist()"
accountManage.exist = function (data, response) {
    response.asynchronous = 1;
    account = {
        "accountName": data.accountName,
        "email": data.email
    };
}

/***************************************
 *     URL：/api2/account/auth
 ***************************************/
accountManage.auth = function (data, response) {
    response.asynchronous = 1;
    var account = {
        "accountName": data.accountName,
        "phone": data.phone,
        "email": data.email,
        "password": data.password
    };

    var type = "账号名";
    var name = account.accountName;
    if (account.accountName != null) {
        type = "账号名";
        name = account.accountName;
        account.phone = "unexist phone";
        account.email = "unexist email";
    }
    else if (account.phone != null) {
        type = "手机";
        name = account.phone;
        account.accountName = "unexist accountName";
        account.email = "unexist email";
    }
    else if (account.email != null) {
        type = "邮箱";
        name = account.email;
        account.accountName = "unexist accountName";
        account.phone = "unexist phone";
    }

    checkAccountNode();

    function checkAccountNode() {
        var query = [
            'MATCH account:Account',
            'WHERE account.accountName! ={accountName} OR account.phone! ={phone} OR account.email! ={email}',
            'RETURN  account'
        ].join('\n');

        var params = {
            accountName: account.accountName,
            phone: account.phone,
            email: account.email
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            } else if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "账号登录失败",
                    "失败原因": name + type + " 邮箱不存在"
                }));
                response.end();
            } else {
                var accountNode = results.pop().account;
                if (accountNode.data.password == account.password) {
                    response.write(JSON.stringify({
                        "提示信息": "账号登录成功",
                        "uid": accountNode.id,
                        "acccesskey": "123",
                        "PbKey": "123"
                    }));
                    response.end();
                } else {
                    response.write(JSON.stringify({
                        "提示信息": "账号登录失败",
                        "失败原因": "密码不正确"
                    }));
                    response.end();
                }
            }
        });
    }
}

/***************************************
 *     URL：/api2/account/modify
 ***************************************/
// todo complete this API as form of "/api2/user/modify"  , first of all design its definition
accountManage.modify = function (data, response) {
    response.asynchronous = 1;
    var uid = data.uid;
    var accountStr = data.account;
    var account = JSON.parse(accountStr);

    modifyAccountNode();

    function modifyAccountNode() {
        var query = [
            'MATCH account:Account' ,
            'WHERE account.uid! ={uid}',
            'RETURN  account'
        ].join('\n');

        var params = {
            uid: uid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改账号信息失败",
                    "失败原因 ": "账号不存在"
                }));
                response.end();
            } else {
                var accountNode = results.pop().account;
                accountNode.data = account;
                accountNode.save();
                response.write(JSON.stringify({
                    "提示信息": "修改账号信息成功",
                    "account": account
                }));
                response.end();
            }
        });
    }

}

/***************************************
 *     URL：/api2/account/trash
 ***************************************/
accountManage.trash = function (data, response) {
}


module.exports = accountManage;