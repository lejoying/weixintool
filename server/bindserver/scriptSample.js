app = {};
app.data = {};
app.handler = function (api, message, reply, weixin, user, bindApp) {
    //message, reply, weixin, user, bindApp的数据结构如下：
    var message = message || {
        type:"text" || "image" || "location" || "link" || "event",
        MsgId:1,
        text:{
            content:"消息文本"
        },
        image:{
            picUrl:"http://baidu.com"
        },
        location:{
            location_X:241524,
            location_Y:2141535,
            scale:23,
            label:"地点1"
        },
        link:{
            title:"百度",
            description:"百度网站",
            url:"http://baidu.com"
        },
        event:{
            eventType:"subscribe" || "unsubscribe" || "CLICK",
            EventKey:68
        }
    };
    var reply = reply || {
        type:"text" || "music" || "news",
        text:{
            content:"回复文本"
        },
        music:{
            MusicUrl:"http://baidu.com/lala.map4",
            HQMusicUrl:"http://baidu.com/lala.map5"
        },
        news:{
            ArticleCount:2,
            Articles:[
                {
                    Title:"拥护共产党的领导",
                    description:"践行中国梦",
                    picUrl:"http://baidu.com",
                    url:"http://baidu.com"
                },
                {
                    Title:"拥护共产党的路线",
                    description:"实现中国梦",
                    picUrl:"http://baidu.com",
                    url:"http://baidu.com"
                }
            ]
        }
    };
    var weixin = weixin || {
        data:{}
    }
    var user = user || {
        id:"oeFW0juS8FCHZN6VAGYN6MCdyBxo"
    }
    var bindApp = bindApp || {
        data:{}
    }


    user.name = "卌大大";
    bindApp.data.lastUser = user.name;
    api.saveData();

    reply.type = "text";
    reply.text.content = "紧密团结在党中央周围，开拓奋进，实践中国梦！";
    api.sendReply();
}
