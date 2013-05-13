/***************************************
 * *    Class：account
 ***************************************/

api = {
    /***************************************
     *     URL：/api2/account/add
     ***************************************/
    "account_add": {
        request: {
            typical: {"accountname": "XXX", "phone": "1XXXXXXXXXX", "email": "XXX@XXX.XXX", "password": sha1("XXXXXX")}
        },
        response: {
            success: {"提示信息": "注册账号成功。", "uid": uid / PbKey0, "acccesskey": acccesskey / Pbkey0, "PbKey": PbKey0},
            failed: {"提示信息": "注册账号失败", "失败原因": ["账号名已存在。" | "邮箱已存在。" | "邀请码不正确。"]}
        },
        /***************************************
         *     URL：/api2/account/exist
         ***************************************/
        "account_exist": {
            request: {
                typical: {"accountname": "XXX", "phone": "1XXXXXXXXXX", "email": "XXX@XXX.XXX", "password": sha1("XXXXXX")}
            },
            response: {
                success: {"提示信息": "注册账号成功。", "uid": uid / PbKey0, "acccesskey": acccesskey / Pbkey0, "PbKey": PbKey0},
                failed: {"提示信息": "注册账号失败", "失败原因": ["账号名已存在。" | "邮箱已存在。" | "邀请码不正确。"]}
            }
        },
        /***************************************
         *     URL：/api2/account/auth
         ***************************************/
        "account_auth": {
            request: {
                typical: {"accountname": "XXX", "phone": "1XXXXXXXXXX", "email": "XXX@XXX.XXX", "password": sha1("XXXXXX")}
            },
            response: {
                success: {"提示信息": "注册账号成功。", "uid": uid / PbKey0, "acccesskey": acccesskey / Pbkey0, "PbKey": PbKey0},
                failed: {"提示信息": "注册账号失败", "失败原因": ["账号名已存在。" | "邮箱已存在。" | "邀请码不正确。"]}
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
                success: {"提示信息": "账号注销成功。"}
            }
        }
    }
}


/***************************************
 * *    Class：weixin
 ***************************************/

api = {
    /***************************************
     * URL：/api2/weixinuer/[add|delete|modify]
     ***************************************/
    "weixinuer_[add|delete|modify]": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX", weixinOpenID: "nnnnn", weixinName: "XXXX", token: "XXXXXXX"}
        },
        response: {
            success: {"提示信息": "[添加|修改|删除]微信绑定用户成功", data: {"……": "......"}},
            failed: {"提示信息": "[添加|修改|删除]微信绑定用户失败", errorMessage: "......", data: {"……": "……"}}
        }
    },
    /***************************************
     * URL：/api2/weixinuer/getall
     ***************************************/
    "weixinuer_[add|delete|modify]": {
        request: {
            typical: {uid: "nnnn", accesskey: "XXXXXX"}
        },
        response: {
            success: {"提示信息": "获取所有微信绑定用户成功", weixin: {
                (weixinID): {weixinID: "88888", weixinName: "全球时尚", token: "f7d8f798d7f"},
                (weixinID): {weixinID: "88888", weixinName: "全球时尚", token: "f7d8f798d7f"}
            }}
        }
    }
}
