$(document).ready(function(){
    var provinces = ["直辖市","特别行政区","黑龙江","吉林","辽宁","内蒙古","河北","河南","山东","山西","江苏","安徽","陕西",
        "宁夏","甘肃","青海","湖北","湖南","浙江","江西","福建","贵州","四川","广东","广西","云南","海南","新疆","西藏","台湾"];
    var citys = [["北京","上海","天津","重庆"],["香港","澳门"],["哈尔滨","齐齐哈尔","牡丹江","大庆","伊春","双鸭山","鹤岗","鸡西",
        "佳木斯","七台河","黑河","绥化","大兴安岭"],["长春","延吉","吉林","白山","白城","四平","松原","辽源","大安","通化"],
        ["沈阳","大连","葫芦岛","盘锦","本溪","抚顺","铁岭","辽阳","营口","阜新","朝阳","锦州","丹东","鞍山"],
        ["呼和浩特","呼伦贝尔","锡林浩特","包头","赤峰","海拉尔","乌海","鄂尔多斯","通辽"],
        ["石家庄","唐山","张家口","廊坊","邢台","邯郸","沧州","衡水","承德","保定","秦皇岛"],
        ["郑州","开封","洛阳","平顶山","焦作","鹤壁","新乡","安阳","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口",
            "驻马店"],["济南","青岛","淄博","威海","曲阜","临沂","烟台","枣庄","聊城","济宁","菏泽","泰安","日照","东营","德州",
            "滨州","莱芜","潍坊"],
        ["太原","阳泉","晋城","晋中","临汾","运城","长治","朔州","忻州","大同","吕梁"],["南京","苏州","昆山","南通","太仓","吴县",
            "徐州","宜兴","镇江","淮安","常熟","盐城","泰州","无锡","连云港","扬州","常州","宿迁"],["合肥","巢湖","蚌埠","安庆",
            "六安","滁州","马鞍山","阜阳","宣城","铜陵","淮北","芜湖","毫州","宿州","淮南","池州"],["西安","韩城","安康","汉中",
            "宝鸡","咸阳","榆林","渭南","商洛","铜川","延安"],["银川","固原","中卫","石嘴山","吴忠"],["兰州","白银","庆阳","酒泉",
            "天水","武威","张掖","甘南","临夏","平凉","定西","金昌"],["西宁","海北","海西","黄南","果洛","玉树","海东","海南"],
        ["武汉","宜昌","黄冈","恩施","荆州","神农架","十堰","咸宁","襄阳","孝感","随州","黄石","荆门","鄂州"],["长沙","邵阳",
            "常德","郴州","吉首","株洲","娄底","湘潭","益阳","永州","岳阳","衡阳","怀化","韶山","张家界"],["杭州","湖州","金华",
            "宁波","丽水","绍兴","衢州","嘉兴","台州","舟山","温州"],
        ["南昌","萍乡","九江","上饶","抚州","吉安","鹰潭","宜春","新余","景德镇","赣州"],["福州","厦门","龙岩","南平","宁德",
            "莆田","泉州","三明","漳州"],["贵阳","安顺","赤水","遵义","铜仁","六盘水","毕节","凯里","都匀"],["成都","泸州","内江",
            "凉山","阿坝","巴中","广元","乐山","绵阳","德阳","攀枝花","雅安","宜宾","自贡","甘孜州","达州","资阳","广安","遂宁",
            "眉山","南充"],["广州","深圳","潮州","韶关","湛江","惠州","清远","东莞","江门","茂名","肇庆","汕尾","河源","揭阳",
            "梅州","中山","德庆","阳江","云浮","珠海","汕头","佛山"],["南宁","桂林","阳朔","柳州","梧州","玉林","桂平","贺州",
            "钦州","贵港","防城港","百色","北海","河池","来宾","崇左"],["昆明","保山","楚雄","德宏","红河","临沧","怒江","曲靖",
            "思茅","文山","玉溪","昭通","丽江","大理"],["海口","三亚","儋州","琼山","通什","文昌"],["乌鲁木齐","阿勒泰","阿克苏",
            "昌吉","哈密","和田","喀什","克拉玛依","石河子","塔城","库尔勒","吐鲁番","伊宁"],["拉萨","阿里","昌都","那曲","日喀则",
            "山南","林芝"],["台北","高雄"]];

    $(".titleMemberId").html("会员ID："+Request("id"));

    //加载select中的省份数据
    for(var i=0;i<provinces.length;i++){
        var option = document.createElement("option");
        option.value = i;
        option.appendChild(document.createTextNode(provinces[i]));
        $(".js_provinces")[0].appendChild(option);
        if(i+1 == provinces.length){
            checkcity();
        }
    }
    var obj = {};
    var cityStr = "";
    var proindex = -1;
    var cityindex = -1;
    function checkcity(){
        //根据指定的id获取该用户的详细信息
        $.ajax({
            type:"GET",
            url:"/api2/user/getbyid?",
            data:{
                "userid":Request("id")
            },
            success:function(serverData){
                if(serverData["提示信息"] == "获取用户信息成功"){
                    obj = serverData["user"];
                    judgeProperty(serverData["user"].nickName,"nickName");
                    if(serverData["user"].city != undefined){
                        cityStr = serverData["user"].city;
                    }
                    judgeProperty(serverData["user"].realName,"realName");
                    judgeProperty(serverData["user"].phone,"phone");
                    judgeProperty(serverData["user"].email,"email");
                    judgeProperty(serverData["user"].weixinNum,"weixinNum");
                    judgeProperty(serverData["user"].company,"company");
                    judgeProperty(serverData["user"].serviceName,"serviceName");
                    //根据用户的信息中的城市，自动选中用户所在的城市
                    var arr = cityStr.split(" ");
                    if(arr.length != 1){
                        var index = -1;
                        for(var i=0;i<provinces.length;i++){
                            if(provinces[i] == arr[0].split(":")[0]){
                                index = i;
                                proindex = index;
                                $(".js_provinces option")[i+1].selected = true;
                                $(".js_provinces option")[i+1].value = index;
                                var cs = citys[index];
                                var cindex = -1;
                                for(var j=0;j<cs.length;j++){
                                    var option = document.createElement("option");
                                    option.value = j;
                                    option.appendChild(document.createTextNode(cs[j]));
                                    $(".js_city")[0].appendChild(option);
                                    if(cs[j] == arr[1].split(":")[0]){
                                        cindex = j;
                                        cityindex = j;
                                    }
                                    if(j+1 == cs.length){
                                        if(cindex != -1){
                                            $(".js_city option")[cindex+1].selected = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

    }
    //给所在地的select框注册值发生改变的事件
    $(".js_provinces").change(function(){
        $(".js_city")[0].length = 1;
        if(this.value == "不限"){
            proindex = -1;
            cityindex = -1;
            return;
        }
        var cs = citys[this.value];
        proindex = this.value;
        for(var i=0;i<cs.length;i++){
            var option = document.createElement("option");
            option.value = i;
            option.appendChild(document.createTextNode(cs[i]));
            $(".js_city")[0].appendChild(option);
        }
    });

    $(".js_city").change(function(){
        if(this.value == "不限"){
            cityindex = -1;
            return;
        }
        cityindex = this.value;
    });

    //给保存按钮绑定点击事件
    $(".weixinMemberEditBtn").click(function(){
        obj.nickName = domByName("nickName").value.trim();
        if(proindex != -1){
            var c = provinces[proindex]+":"+proindex+" ";
            if(cityindex != -1){
                c += citys[proindex][cityindex]+":"+cityindex;
            }
            obj.city = c + "";
        }else if(proindex == -1 && cityindex == -1){
            obj.city = "";
        }
        obj.realName = domByName("realName").value.trim();
        obj.phone = domByName("phone").value.trim();
        obj.email = domByName("email").value.trim();
        obj.weixinNum = domByName("weixinNum").value.trim();
        obj.company = domByName("company").value.trim();
        obj.serviceName = domByName("serviceName").value.trim();
        if(domByName("phone").value.trim() != ""){
            var phoneRegexp = /^[1][358]\d{9}$/;
            if(!phoneRegexp.test(domByName("phone").value.trim())){
                alert("手机号码格式不正确");
                return;
            }
        }
        if(domByName("email").value.trim() != ""){
            var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            if(!emailRegexp.test(domByName("email").value.trim())){
                alert("邮箱格式不正确");
                return;
            }
        }
        obj.id = Request("id");
        $.ajax({
            type:"POST",
            url:"/api2/user/modify?",
            data:{
                "userid":Request("id"),
                "user":JSON.stringify(obj)
            },
            success:function(serverData){
                if(serverData["提示信息"] == "修改关注用户信息成功"){
                    location.href = "weixinMember.html";
                }
            }
        });
    });
});
//根据对象的属性和指定的name，给指定的name对应的Dom节点对象赋值
function judgeProperty(proName,eleName){
    if(proName != undefined){
        domByName(eleName).value = proName;
    }
}
//获取指定name的Dom节点对象
function domByName(eleName){
    return document.getElementsByName(eleName)[0];
}
//获取html页面传递过来的参数值
function Request(strName)
{
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for(var i = 0; i < arrTmp.length; i++){
        var arrTemp = arrTmp[i].split("=");
        if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}