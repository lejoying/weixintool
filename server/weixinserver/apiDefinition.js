/*************************************** ***************************************
 * *    Class：account
 *************************************** ***************************************/

api = {
    /***************************************
     *     URL：/api2/account/add
     ***************************************/
    "account_add": {
        request: {
            typical: {"accountname": "XXX", "phone": "1XXXXXXXXXX", "email": "XXX@XXX.XXX", "password": sha1("XXXXXX"), "invite": "XXXXX"}
        },
        response: {
            success: {"提示信息": "注册账号成功", "accountname": "XXX", "uid": uid / PbKey0, "acccesskey": acccesskey / Pbkey0, "PbKey": PbKey0},
            failed: {"提示信息": "注册账号失败", "失败原因": ["账号名已存在" | "注册邮箱已存在" | "邀请码不正确"]}
        }
    },
    /***************************************
     *     URL：/api2/account/exist
     ***************************************/
    "account_exist": {
        request: {
            typical: {"accountname": "XXX", "email": "XXX@XXX.XXX"}
        },
        response: {
            success: {"提示信息": ["用户名存在" | "邮箱已存在"], "失败原因": ["用户名已存在" | "邮箱已存在" ], "status": "failed"},
            failed: {"提示信息": ["用户名不存在" | "邮箱不存在"], "status": "passed"}
        }
    },
    /***************************************
     *     URL：/api2/account/auth
     ***************************************/
    "account_auth": {
        request: {
            typical: {"accountname": "XXX", "password": "******", "phone": "1XXXXXXXXXX", "email": "XXX@XXX.XXX"}
        },
        response: {
            success: {"提示信息": "账号登录成功", "accountname": "XXX", "uid": uid / PbKey0, "accesskey": acccesskey / Pbkey0, "PbKey": PbKey0},
            failed: {"提示信息": "账号登录失败", "失败原因": ["[账号|邮箱|手机]号名不存在" | "密码不正确"]}
        }
    },
    /***************************************
     *     URL：/api2/account/trash
     *     Functionality : Delete accesskey that generated when account auth.
     ***************************************/
    "account_trash": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX"}
        },
        response: {
            success: {"提示信息": "账号注销成功"}
        }
    },
    /***************************************
     * URL：/api2/account/modify
     ***************************************/
    "account_modify": {
        request: {
            typical: {accountname: "XXX", accesskey: "XXXXXX", "password": "******"}
        },
        response: {
            success: {"提示信息": "修改密码成功", account: {}},
            failed: {"提示信息": "修改密码失败", "失败原因": "原密码不正确"}
        }
    }
}


/*************************************** ***************************************
 * *    Class：weixin
 *************************************** ***************************************/
    //todo need design
api = {

    /***************************************
     * URL：/api2/weixin/bindingtoken
     ***************************************/
    "weixin_bindingtoken": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", weixinName: "XXXX"}
        },
        response: {
            success: {"提示信息": "微信公众账号正在绑定", token: "XXXXXXX"}
        }
    },
    /***************************************
     * URL：/api2/weixin/getall
     ***************************************/
    "weixinuer_[getall]": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX"}
        },
        response: {
            success: {"提示信息": "获取所有绑定微信公众账号成功", weixins: {
                (weixinopenid): {weixinopenid: "nnnnn", weixinName: "习近平", token: "f7d8f798d7f", apps: [
                    {id: "..", "……": "......"},
                    "..."
                ]},
                ("..."): "..."
            }
            },
            failed: {"提示信息": "获取所有绑定微信公众账号失败", "失败原因": "没有已绑定微信公众账号"}
        }
    },
    /***************************************
     * URL：/api2/weixin/bindapp
     ***************************************/
    "weixin_bindapp": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", weixinopenid: "nnnnn", appid: "nnn" }
        },
        response: {
            success: {"提示信息": "微信公众账号添加应用成功"},
            failed: {"提示信息": "微信公众账号添加应用失败", "失败原因": "数据不正常"}
        }
    },
    /***************************************
     * URL：/api2/weixin/unbindapp
     ***************************************/
    "weixin_unbindapp": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", weixinopenid: "nnnnn", appid: "nnn" }
        },
        response: {
            success: {"提示信息": "微信公众账号移除应用成功"},
            failed: {"提示信息": "微信公众账号添加应用失败", "失败原因": "数据不正常"}
        }
    },
    /***************************************
     * URL：/api2/weixin/modify
     ***************************************/
    "weixin_modify": {
        request: {
            typical: {weixinid: "XXXX", weixin: JSON({})}
        },
        response: {
            success: {"提示信息": "修改绑定微信信息成功", weixin: {}},
            failed: {"提示信息": "修改绑定微信信息失败", "失败原因": "绑定微信信息不存在"}
        }
    }
}
/*************************************** ***************************************
 * *    Class：user
 *************************************** ***************************************/

api = {

    /***************************************
     * URL：/api2/user/getall
     ***************************************/
    "user_getall": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", weixinopenid: "nnnnn", start: n, end: n}
        },
        response: {
            success: {"提示信息": "获得所有关注用户成功", users: [
                {id: "..", "……": "......"},
                "..."
            ]},
            failed: {"提示信息": "获得所有关注用户失败", "失败原因": "微信公众账号不存在"}
        }
    },
    /***************************************
     * URL：/api2/user/modify
     ***************************************/
    "user_modify": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", userid: "XXXX", user: JSON({})}
        },
        response: {
            success: {"提示信息": "修改关注用户信息成功", user: {}},
            failed: {"提示信息": "修改关注用户信息失败", "失败原因": "用户信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/user/getbyid
     ***************************************/
    "user_getbyid": {
        request: {
            typical: {userid: "XXXX"}
        },
        response: {
            success: {"提示信息": "获取用户信息成功", user: {}},
            failed: {"提示信息": "获取用户信息失败", "失败原因": "用户信息不存在"}
        }
    }
}

/*************************************** ***************************************
 * *    Class：app
 *************************************** ***************************************/

api = {
    /***************************************
     * URL：/api2/app/getall
     ***************************************/
    "app_getall": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", filter: ["ALL" | "OWN" | "BIND"], _weixinOpenID: "nnnnn" }
        },
        response: {
            success: {"提示信息": "获得应用列表成功", apps: [
                {id: "..", "……": "......"},
                "..."
            ]},
            failed: {"提示信息": "获得应用列表失败", "失败原因": "指定微信公众账号|账号不存在"}
        }
    },
    /***************************************
     * URL：/api2/app/add
     ***************************************/
    "app_add": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", app: JSON({}), script: content("XXX.js")}
        },
        response: {
            success: {"提示信息": "新建应用成功", _app: {}},
            failed: {"提示信息": "新建应用失败", "失败原因": "脚本形式不正确"}
        }
    },
    /***************************************
     * URL：/api2/app/modify
     ***************************************/
    "app_modify": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", appid: "nnn", app: JSON({}), script: content("XXX.js")}
        },
        response: {
            success: {"提示信息": "修改应用成功", _app: {}},
            failed: {"提示信息": "修改应用失败", "失败原因": "脚本形式不正确|没有找到指定应用"}
        }
    },
    /***************************************
     * URL：/api2/app/delete
     ***************************************/
    "app_delete": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", appid: "nnn"}
        },
        response: {
            success: {"提示信息": "删除应用成功"},
            failed: {"提示信息": "删除应用失败", "失败原因": "应用不存在"}
        }
    }
}

