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
    if("" == (data.accountname.trim()) || "" == (data.password.trim())){
        response.write(JSON.stringify({
            "提示信息": "注册账号失败",
            "reason": "账号信息不能为空"
        }));
       /* if(data.phone==undefined){
            data.phone="123654789";
        }*/
        response.end();
    }
    var account = {
        accountname: data.accountname,
        phone: data.phone,
//        email: data.email,
        password: data.password
    };

    checkAccountNodeExist();

    function checkAccountNodeExist() {

        var query = [
            'MATCH account:Account',
            'WHERE account.accountname! ={accountname}',
            'RETURN  account'
        ].join('\n');

        var params = {
            accountname: account.accountname
//            phone: account.phone
//            email: account.email
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
                return;
            } else {
                var accountNode = results.pop().account;
                response.write(JSON.stringify({
                    "提示信息": "注册账号成功",
                    "uid": accountNode.id,
                    "accountname": accountNode.data.accountname,
                    "accesskey": "123",
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
/*accountManage.exist = function (data, response) {
    response.asynchronous = 1;
    var account = {
        accountname: data.accountname,
        email: data.email
    };

    var type = "账号名";
    var name = account.accountname;
    if (account.accountname != null) {
        type = "账号名";
        name = account.accountname;
        account.email = "unexist email";
    }
    else if (account.email != null) {
        type = "邮箱";
        name = account.email;
        account.accountname = "unexist accountname";
    }

    checkAccountNodeExist();

    function checkAccountNodeExist() {
        var query = [
            'MATCH account:Account',
            'WHERE account.accountname! ={accountname} OR account.email! ={email}',
            'RETURN  account'
        ].join('\n');

        var params = {
            accountname: account.accountname,
            email: account.email
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            } else if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "验证失败",
                    "失败原因": name + type + " ",
                    "status": "failed"
                }));
                response.end();
            } else {
                var accountNode = results.pop().account;
                if (accountNode.data.password == account.password) {
                    response.write(JSON.stringify({
                        "提示信息": "用户名存在",
                        "status": "passed"
                    }));
                    response.end();
                }
            }
        });
    }
}*/


/***************************************
 *     URL：/api2/account/auth
 ***************************************/
accountManage.auth = function (data, response) {
    response.asynchronous = 1;
    var account = {
        "accountname": data.accountname,
        "phone": data.phone,
        "email": data.email,
        "password": data.password
    };

    var type = "账号名";
    var name = account.accountname;
    if (account.accountname != null) {
        type = "账号名";
        name = account.accountname;
        account.phone = "unexist phone";
        account.email = "unexist email";
    }
    else if (account.phone != null) {
        type = "手机";
        name = account.phone;
        account.accountname = "unexist accountname";
        account.email = "unexist email";
    }
    else if (account.email != null) {
        type = "邮箱";
        name = account.email;
        account.accountname = "unexist accountname";
        account.phone = "unexist phone";
    }

    checkAccountNode();

    function checkAccountNode() {
        var query = [
            'MATCH account:Account',
            'WHERE account.accountname! ={accountname} OR account.phone! ={phone} OR account.email! ={email}',
            'RETURN  account'
        ].join('\n');

        var params = {
            accountname: account.accountname,
            phone: account.phone,
            email: account.email
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
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
                        "accountname": accountNode.data.accountname,
                        "accesskey": "123",
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
accountManage.modify = function (data, response) {
    response.asynchronous = 1;

    var account = {
        uid: data.uid,
        oldpassword: data.oldpassword,
        newpassword: data.newpassword
    };


    modifyAccountNode();

    function modifyAccountNode() {
        var query = [
            'MATCH account:Account',
            'WHERE account.uid! ={uid} AND account.password! ={password}',
            'SET account.password={newpassword}',
            'RETURN  account'
        ].join('\n');

        var uid =  data.uid;
        var params = {
           
            uid: parseInt(uid),
            password: account.oldpassword,
            newpassword: account.newpassword
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
         
            } else if (results.length != 0) {
                response.write(JSON.stringify({
                    "失败原因": "原密码不正确",
                    "提示信息": "修改密码成功"
                }));
                response.end();

            } else {
                response.write(JSON.stringify({
                    "提示信息": "修改密码失败",
                    "失败原因": "原密码不正确"
                }));
                response.end();
            }

        });
    }

}
/***************************************
 *     URL：/api2/account/exist
 ***************************************/
accountManage.exist = function (data, response) {
    response.asynchronous = 1;
    var account = {
        accountname: data.accountname,
        email: data.email
    };

    var type = "邮箱";
    var name = account.accountname;
    if (account.accountname != null) {
        type = "邮箱";
        name = account.accountname;
        account.email = "unexist email";
    }
  /*  else if (account.email != null) {
        type = "昵称";
        name = account.email;
        account.accountname = "unexist accountname";
    }*/

    checkAccountNodeExist();

    function checkAccountNodeExist() {
        var query = [
            'MATCH account:Account',
            'WHERE account.accountname! ={accountname} OR account.email! ={email}',
            'RETURN  account'
        ].join('\n');

        var params = {
            accountname: account.accountname,
            email: account.email
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                return;
            } else if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "用户名不存在",
                    "status": "passed"
                }));
                response.end();
            } else {
                var accountNode = results.pop().account;
//                if (accountNode.data.password == account.password) {
                    response.write(JSON.stringify({
                        "提示信息": "用户名存在",
                        "失败原因": name + type + "已存在",
                        "status": "failed"
                    }));
                    response.end();
//                }
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


