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
            success: {"提示信息": "获得分页注册用户成功", account: {}},
            failed: {"提示信息": "修改密码失败", "失败原因": "原密码不正确"}
        }
    },
    /***************************************
     * URL：/api2/account/getnowpageaccount
     ***************************************/
    "account_getnowpageaccount": {
        request: {
            typical: {start: "XXX", end: "XXXXXX"}
        },
        response: {
            success: {"提示信息": "修改密码成功", accounts: {}, count: "XX"},
            failed: {"提示信息": "获得分页注册用户失败", "失败原因": "无注册用户"}
        }
    },
    /***************************************
     * URL：/api2/account/getbyid
     ***************************************/
    "account_getbyid": {
        request: {
            typical: {uid: "XX"}
        },
        response: {
            success: {"提示信息": "获取用户信息成功", account: {}},
            failed: {"提示信息": "获取用户信息失败", "失败原因": "用户信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/account/modifyaccount
     ***************************************/
    "account_modifyaccount": {
        request: {
            typical: {uid: "XX", account: "XX"}
        },
        response: {
            success: {"提示信息": "修改用户信息成功", account: {}},
            failed: {"提示信息": "修改用户信息失败", "失败原因": "用户信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/account/getallcount
     ***************************************/
    "account_getallcount": {
        request: {
            typical: {}
        },
        response: {
            success: {"提示信息": "获得所有注册用户数量成功", count: "XX"},
            failed: {"提示信息": "获得所有注册用户数量失败", "失败原因": "数据异常"}
        }
    },
    /***************************************
     * URL：/api2/account/delete
     ***************************************/
    "account_delete": {
        request: {
            typical: {uid: "XX"}
        },
        response: {
            success: {"提示信息": "删除注册用户成功"},
            failed: {"提示信息": "删除注册用户失败", "失败原因": "用户不存在"}
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
            typical: {uid: "nnnn", start: "XXXXXX", end: ""}
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
            failed: {"提示信息": "获取所有绑定微信公众账号失败" || "获得所有绑定微信数量失败", "失败原因": "没有已绑定微信公众账号" || "数据格式不正确"}
        }
    },
    /***************************************
     * URL：/api2/weixin/getbyid
     ***************************************/
    "weixin_getbyid": {
        request: {
            typical: {weixinid: "XXX"}
        },
        response: {
            success: {"提示信息": "获取微信信息成功", weixin: {}},
            failed: {"提示信息": "获取微信信息失败", "失败原因": "微信信息不存在"}
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
            typical: {weixinid: "XXXX", weixin: "XX"}
        },
        response: {
            success: {"提示信息": "修改绑定微信信息成功", weixin: {}},
            failed: {"提示信息": "修改绑定微信信息失败", "失败原因": "绑定微信信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/weixin/delete
     ***************************************/
    "weixin_delete": {
        request: {
            typical: {weixinid: "XXXX", uid: "XX"}
        },
        response: {
            success: {"提示信息": "删除绑定微信成功"},
            failed: {"提示信息": "删除绑定微信失败", "失败原因": "数据不正常"}
        }
    },
    /***************************************
     * URL：/api2/weixin/modifyrelapro
     ***************************************/
    "weixin_modifyrelapro": {
        request: {
            typical: {weixinid: "XXXX", uid: "XXXX", switch: true | false}
        },
        response: {
            success: {"提示信息": "修改绑定微信开关成功", weixin: {}},
            failed: {"提示信息": "改绑定微信开关失败", "失败原因": "数据不正常"}
        }
    },


    /***************************************
     * URL：/api2/weixin/getmessageulist
     ***************************************/
    "weixin_getmessageulist": {
        request: {
            typical: {weixinid: "XXXX", nowpage: "XXX", pagesize: "XXX"}
        },
        response: {
            success: {"提示信息": "获取用户列表成功", users: {}, count: "XXX"},
            failed: {"提示信息": "获取用户列表失败", "失败原因": "数据异常"}
        }
    },

    /***************************************
     * URL：/api2/weixin/getmessages
     ***************************************/
    "weixin_getmessages": {
        request: {
            typical: {weixinid: "XXXX", userid: "XXXX", nowpage: "XXX", pagesize: "XXX"}
        },
        response: {
            success: {"提示信息": "获取消息成功", messages: {}, count: "XXX"},
            failed: {"提示信息": "获取消息失败", "失败原因": "数据异常"}
        }
    },

    /***************************************
     * URL：/api2/weixin/getnowpageweixin
     ***************************************/
    "weixin_getnowpageweixin": {
        request: {
            typical: {start: "XX", end: "XX"}
        },
        response: {
            success: {"提示信息": "获取绑定微信公众账号分页数据成功", weixins: {}, count: "XX"},
            failed: {"提示信息": "获取绑定微信公众账号分页数据失败" || "获得所有绑定微信数量失败", "失败原因": "没有已绑定微信公众账号" || "数据格式不正确"}
        }
    },
    /***************************************
     * URL：/api2/weixin/getnewusercount
     ***************************************/
    "weixin_getnewusercount": {
        request: {
            typical: {weixinid: "XX", time: "XX"}
        },
        response: {
            success: {"提示信息": "获取今日新增会员数量成功", count: "XX"},
            failed: {"提示信息": "获取今日新增会员数量失败", "失败原因": "数据格式不正确"}
        }
    },
    /***************************************
     * URL：/api2/weixin/getbindcount
     ***************************************/
    "weixin_getbindcount": {
        request: {
            typical: {weixinid: "XX", time: "XX"}
        },
        response: {
            success: {"提示信息": "获取绑定微信数量成功", count: "XX"},
            failed: {"提示信息": "获取绑定微信数量失败", "失败原因": "数据异常"}

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
            failed: {"提示信息": "获得所有关注用户失败" || "获得所有关注用户数量失败", "失败原因": "微信公众账号不存在"}
        }
    },
    /***************************************
     * URL：/api2/user/modify
     ***************************************/
    "user_modify": {
        request: {
            typical: {userid: "XXXX", user: JSON({})}
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
    },
    /***************************************
     * URL：/api2/user/getnowpageuser
     ***************************************/
    "user_getnowpageuser": {
        request: {
            typical: {start: "XX", end: "XX"}
        },
        response: {
            success: {"提示信息": "获得分页关注用户成功", users: {}, count: "XX"},
            failed: {"提示信息": "获得分页关注用户失败" || "获得所有关注用户数量失败", "失败原因": "微信公众账号不存在" || "数据格式不正确"}
        }
    },
    /***************************************
     * URL：/api2/user/delete
     ***************************************/
    "user_delete": {
        request: {
            typical: {userid: "XX"}
        },
        response: {
            success: {"提示信息": "删除用户信息成功"},
            failed: {"提示信息": "删除用户信息失败", "失败原因": "用户信息不存在"}
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
            typical: {uid: "nnnn", type: ["public" | "instrudy"], filter: ["ALL" | "OWN" | "BIND"], mold: "XX", status: "XX", start: "XX", end: "XX"}
        },
        response: {
            success: {"提示信息": "获得应用列表成功", apps: [
                {id: "..", "……": "......"},
                "..."
            ], count: "XX"},
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
    },
    /***************************************
     * URL：/api2/app/getbyid
     ***************************************/
    "app_getbyid": {
        request: {
            typical: {appid: "nnnn"}
        },
        response: {
            success: {"提示信息": "获取应用信息成功", app: {}},
            failed: {"提示信息": "获取应用信息失败", "失败原因": "应用信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/app/addmyapp
     ***************************************/
    "app_addmyapp": {
        request: {
            typical: {weixinid: "XXX", myapp: "XXX"}
        },
        response: {
            success: {"提示信息": "保存个性化设置成功", r: {}},
            failed: {"提示信息": "保存个性化设置失败", "失败原因": "保存数据出现异常"}
        }
    },
    /***************************************
     * URL：/api2/app/getallmyapp
     ***************************************/
    "app_getallmyapp": {
        request: {
            typical: {weixinid: "XXX"}
        },
        response: {
            success: {"提示信息": "获取个性化设置成功", r: {}, count: "XX"},
            failed: {"提示信息": "获取个性化设置失败", "失败原因": "获取数据出现异常"}
        }
    },
    /***************************************
     * URL：/api2/app/modifymyapp
     ***************************************/
    "app_modifymyapp": {
        request: {
            typical: {weixinid: "XXX", appid: "XX", r: "XX"}
        },
        response: {
            success: {"提示信息": "获取应用信息成功", r: {}},
            failed: {"提示信息": "获取应用信息失败", "失败原因": "应用信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/app/getmyapp
     ***************************************/
    "app_getmyapp": {
        request: {
            typical: {weixinid: "XXX", appid: "XX"}
        },
        response: {
            success: {"提示信息": "获取应用信息成功", r: {}},
            failed: {"提示信息": "获取应用信息失败", "失败原因": "应用信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/app/getappscount
     ***************************************/
    "app_getappscount": {
        request: {
            typical: {type: "XXX"}
        },
        response: {
            success: {"提示信息": "获取应用数量成功", count: "XX"},
            failed: {"提示信息": "获取应用数量失败", "失败原因": "数据格式不正常"}
        }
    },
    /***************************************
     * URL：/api2/app/modifystatus
     ***************************************/
    "app_modifystatus": {
        request: {
            typical: {appid: "XXX", status: "XX"}
        },
        response: {
            success: {"提示信息": "修改应用信息成功", app: {}},
            failed: {"提示信息": "修改应用信息失败", "失败原因": "应用信息不存在"}
        }
    },
    /***************************************
     * URL：/api2/app/getprivateapp
     ***************************************/
    "app_getprivateapp": {
        request: {
            typical: {start: "XXX", end: "XX"}
        },
        response: {
            success: {"提示信息": "获得用户个性化设置成功", rs: {}, count: "XX"},
            failed: {"提示信息": "获得用户个性化设置失败", "失败原因": "个性化设置不存在"}
        }
    },
    /***************************************
     * URL：/api2/app/getappcount
     ***************************************/
    "app_getappcount": {
        request: {
            typical: {}
        },
        response: {
            success: {"提示信息": "获取微乎应用数量成功", oncount: "XX", offcount: "XX"},
            failed: {"提示信息": "获取微乎应用数量失败", "失败原因": "数据异常"}
        }
    },
    /***************************************
     * URL：/api2/app/getuserappcount
     ***************************************/
    "app_getuserappcount": {
        request: {
            typical: {}
        },
        response: {
            success: {"提示信息": "获取个性化应用开启数量成功", count: "XX"},
            failed: {"提示信息": "获取微乎应用数量失败", "失败原因": "数据异常"}
        }
    }
}

