var myRegEx = {
	username : /^\S+$/,//用户登录名
	password : /^\S+$/,//密码
	phoneNum : /^1\d{10}$/,//手机号码
	idno : /^([a-zA-Z0-9]{15}|[a-zA-Z0-9]{18})$/,//身份证号码
	hphm : /^[A-Za-z0-9]{6}$/,//号牌号码
	clsbdh : /^[A-Za-z0-9]{6}$/,//车辆识别号后6位
	fdjh : /^[A-Za-z0-9]{4}$/,//发动机号后4位
	drvlicense : /^([a-zA-Z0-9]{15}|[a-zA-Z0-9]{18})$/,//驾驶证号
	dabh : /^[A-Za-z0-9]{12}$/,   //档案编号
	captcha : /^[A-Za-z0-9]{4}$/ //验证码
};
//首页加载微博
var ga_page = 1,jj_page = 1, crj_page = 1, hz_page = 1;
function getWeibo(url, flag, obj, isResize) {
	var title = '', page = 1;
	var fid = '9801500';
	if(flag == 1){
		title = '公安微博';
		page = ga_page;
		fid = '9801501';
	}else if (flag == 2) {
		title = '交警微博';
		page = jj_page;
		fid = '9801502';
	} else if (flag == 3) {
		title = '户政微博';
		page = hz_page;
		fid = '9801504';
	} else if (flag == 4) {
		title = '出入境微博';
		page = crj_page;
		fid = '9801503';
	}
	var reg = /href\s*=\s*\"?[^\"]*\"?/;
	$.ajax( {
				type : 'post',
				data : {
					'flag' : flag,
					'page' : page
				},
				dataType : 'json',
				url : url,
				success : function(data) {
					$('#' + obj + '_load').remove();
					var appendStr = '';
					var weiBoList = data.weiBoList;
					for ( var i = 0; i < weiBoList.length; i++) {
						appendStr += '<dl>';
						appendStr += '<dt><span class="fl">' + title
								+ '</span><span class="fr">'
								+ weiBoList[i].created_at + '</span></dt>';
						appendStr += '<dd>';
						appendStr += '<table>';
						appendStr += '<tr><th><img src="' + weiBoList[i].user.profile_image_url + '" /></th>';
						appendStr += '<td>' + weiBoList[i].text + '</td></tr>';
						appendStr += '</table>';
						appendStr += '</dd>';
						appendStr += '<dt><span class="fl">'
								+ (weiBoList[i].source).replace(reg, '')
								+ '</span><span class="fr">转发('
								+ weiBoList[i].reposts_count + ')&emsp;评论('
								+ weiBoList[i].comments_count + ')</span></dt>';
						appendStr += '</dl>';
					}
					appendStr += '<p id="'
							+ (obj + '_load')
							+ '" class="tc"><input type="button" class="apps_btn2" value="点击加载更多" onclick="saveUserAction(\''+fid+'\');getWeibo(\''
							+ url + '\',' + flag + ',\'' + obj + '\',1);"></p>';
					$(appendStr).appendTo(('#' + obj));
					if (isResize == 1) {
						var ix = flag;
						if(flag == 3)
							ix = 4;
						else if(flag == 4)
							ix = 3;
						mainactListSlide3.scroll.parent().height(
								mainactListSlide3.scroll.find('>li').eq(
										ix - 1).height());
						mainactListSlide3.reset(ix - 1);
					}
					if(flag == 1){
						ga_page++;
					}else if (flag == 2) {
						jj_page++;
					} else if (flag == 3) {
						hz_page++;
					} else if (flag == 4) {
						crj_page++;
					}
				}
			});
}

//首页业务指南加载
var  cg_bg_id_1_init=false,cg_bg_id_2_init=false;cg_bg_id_3_init=false;
function loadBusinessGuide(url,id,sid){
	//判断是否已经初始化
	if($('#cg_bg_id_'+id).children().length > 0){
		return false;
	}
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		success : function(data) {
			$('#cg_bg_id_'+id).empty();
			var body = data.body;
			for ( var i = 0; i < body.length; i++) {
				$('<li><a href='+base+'"/zn/index.do?pid='+body[i].parentId+'&id='+body[i].id+'"><div style="width:100%;"> • '+body[i].title+'</div></a></li>').appendTo('#cg_bg_id_'+id);
			}
			mainactListSlide2.scroll.parent().height(
				mainactListSlide2.scroll.find('>li').eq(
					sid).height());
		}
	});
}

//业务指南页面加载
function loadBusinessGuide2(url,id,sid,afterCallback){
	//判断是否已经初始化
	if($('#cg_bg_id_'+id).children().length > 0){
		return false;
	}
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		success : function(data) {
			$('#cg_bg_id_'+id).empty();
			var body = data.body;
			for ( var i = 0; i < body.length; i++) {
				$('<p><a href="'+base+'/zn/info.do?id='+body[i].id+'&title='+encodeURIComponent(body[i].title)+'">'+body[i].title+'</a></p>').appendTo('#cg_bg_id_'+id);
			}
			afterCallback();
		}
	});
}

//出入境办理结果查询
function crj_bl_result_query(url,param){
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : param,
		beforeSend : function(){
			$('#crj-bl-result-desc').empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo('#crj-bl-result-desc')
			$('#crj-bl-result').jumpBox(true);
		},
		success : function(data) {
			$('#crj-bl-result-desc').empty();
			if(data.returnCode == '1'){
				var body = data.body;
				if(body.length > 0){
					for(var i = 0 ; i < body.length ; i++){
						$('<p>受理编号：'+body[i].ywbh+'</p><p>处理状态：'+body[i].clzt+'</p>').appendTo('#crj-bl-result-desc');
					}
				}else{
					$('<p>查询无数据</p>').appendTo('#crj-bl-result-desc');
				}
			}else{
				$('<p>'+data.returnMsg+'</p>').appendTo('#crj-bl-result-desc');
			}
		},error : function(){
			$('#crj-bl-result-desc').empty();
			$('<p>系统繁忙，请稍后再试！</p>').appendTo('#crj-bl-result-desc');
		}
	});
}
//车管业务办理进度查询
function apply_bl_result_query(url,apply_applyno,apply_idno,apply_captcha){
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : {
			applyno : $('#'+apply_applyno).val(),
			idno : $('#'+apply_idno).val(),
			captcha : $('#'+apply_captcha).val()
		},
		beforeSend : function(){
			$('#apply-bl-result-desc').empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo('#apply-bl-result-desc')
			$('#apply-bl-result').jumpBox(true);
		},
		success : function(data) {
			$('#apply-bl-result-desc').empty();
			if(data.returnCode == '1'){
					$('<p>受理编号：'+data.body.applyno+'</p>' +
						'<p>受理时间：'+data.body.applytime+'</p>'+
						'<p>业务类型：'+data.body.biztype+'</p>'+
						'<p>办理状态：'+data.body.status+'</p>'+
						'<p>办理说明：'+data.body.statusInfo+'</p>').appendTo('#apply-bl-result-desc');
			}else{
				$('<p>'+data.returnMsg+'</p>').appendTo('#apply-bl-result-desc');
			}
		},error : function(){
			$('#apply-bl-result-desc').empty();
			$('<p>系统繁忙，请稍后再试！</p>').appendTo('#apply-bl-result-desc');
		}
	});
}
//驾驶员违章查询
function driver_wf_query(url,driver_jszh,driver_dabh,driver_captcha){
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : {
			jszh : $('#'+driver_jszh).val(),
			dabh : $('#'+driver_dabh).val(),
			captcha : $('#'+driver_captcha).val()
		},
		beforeSend : function(){
			$('#driver_wf_query-desc').empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo('#driver_wf_query-desc')
			$('#driver_wf_query').jumpBox(true);
		},
		success : function(data) {
			$('#driver_wf_query-desc').empty();
			if(data.returnCode == '1'){
				var body = data.body;
				if(body.length > 0){
					for(var i = 0 ; i < body.length ; i++){
						$('<p>号牌类型：'+body[i].hpzl+'</p>' +
							'<p>号牌号码：'+body[i].hphm+'</p>'+
							'<p>违法时间：'+body[i].wfsj+'</p>'+
							'<p>违法地址：'+body[i].wfdz+'</p>'+
							'<p>违法行为：'+body[i].wfxw+'</p>' +
							'<p>违法积分数：'+body[i].wfjfs+'</p>' +
							'<p>罚款金额：'+body[i].fkje+'</p>' +
							'<p>交款标记：'+body[i].jkbj+'</p>' +
							'<p>信息来源：'+body[i].xxly+'</p>' +
							'<p></p>' +
							'').appendTo('#driver_wf_query-desc');
					}	
				}else{
					$('<p>查询无数据</p>').appendTo('#driver_wf_query-desc');
				}
			}else{
				$('<p>'+data.returnMsg+'</p>').appendTo('#driver_wf_query-desc');
			}
		},error : function(){
			$('#driver_wf_query-desc').empty();
			$('<p>系统繁忙，请稍后再试！</p>').appendTo('#driver_wf_query-desc');
		}
	});
}

//机动车信息查询
function vehicleInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.cllx){
					var tmp = '<table>';
					tmp += '<tr><td>车牌号：</td><td>'+data.hphm+'</td></tr>';
					tmp += '<tr><td>号牌类型：</td><td>'+data.cllxmc+'</td></tr>';
					tmp += '<tr><td>检验有效期止：</td><td>'+data.yxqz+'</td></tr>';
					tmp += '<tr><td>强制报废期止：</td><td>'+data.qzbfqz+'</td></tr>';
					tmp += '<tr><td>车辆状态：</td><td>'+data.ztmc+'</td></tr>';
					tmp += '</table>';
				}else{
					tmp = '<div>没有查询到机动车信息，请进入“个人信息”编辑您的个人基础信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}

function entryInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.body){
					if($.isArray(data.body) ){
						$.each(data.body,function(i,d){
							tmp += '<table style="border-bottom:1px dotted #000; padding: 6px;margin-bottom: 5px;">'
							tmp += '<tr><td>受理编号：</td><td>'+d.ywbh+'</td></tr>';
							tmp += '<tr><td>处理状态：</td><td>'+d.clzt+'</td></tr>';
							tmp += '</table>';
						});
					}else{
						tmp += '<table>'
						tmp += '<tr><td>受理编号：</td><td>'+data.body.ywbh+'</td></tr>';
						tmp += '<tr><td>处理状态：</td><td>'+data.body.clzt+'</td></tr>';
						tmp += '</table>';
					}
				}else{
					tmp = '<div>没有查询到驾驶证信息，请进入“个人信息”编辑您的个人基础信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}


function vfInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="'+base+'/images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.body){
					if($.isArray(data.body) ){
						$.each(data.body,function(i,item){
							
							var sub = item.wfdz+'</br>';
					sub += item.wfsj+'</br>';
					sub += item.wfxw;
					if(item.xxly){
						if(item.xxly == 1){
							sub += '&nbsp;&nbsp;现场处罚</br>';
						}else if(item.xxly == 2){
							sub += '&nbsp;&nbsp;非现场处罚</br>';
						}
					}else{
						sub +='</br>';
					}
					var clbj_string = '<font color="red">未处理</font>';
					if(item.clbj != 0){
						 clbj_string = '<font color="red">已处理</font>';
					}
					tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 5px;">'+sub+clbj_string+'</div>';
							
							
						});
					}
				
				}else{
					tmp += '<div>查询没有未处理数据</div><br/>';
				}
			}else{
				tmp += '<div>'+data.returnMsg+'</div>';
			}
			tmp+='<a id="look_his_div" onclick="look_his_div_click();" href="javascript:void(0);">查看历史数据>></a>';
			$(tmp).appendTo(nextDd);
			
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()+20});
		}
	});
}


function jczbd_info(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="'+base+'/images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			$('<a href="'+base+'/ac/bjczv.do">添加</a><br>').appendTo(nextDd);
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.drvlicense){
					var sub = "";
						sub+="<table>" +
						"<tr><td>已绑定的驾驶证</td><td></td></tr>" +
						"<tr><td>"+data.drvlicense+"</td><td><a href='javascript:;' onclick='unbindjcz(\""+data.drvlicense+"\")'>取消绑定</a></td></tr>" +
						"</table>";
						tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 5px;">'+sub+'</div>';
				}else{
					tmp += '<div>没有绑定的驾驶证</div>';
				}
			}else{
				tmp += '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()+20});
		}
	});
}


function jdcbd_info(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="'+base+'/images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			$('<a href="'+base+'/ac/bjdcv.do">添加</a><br>').appendTo(nextDd);
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.body){
					var sub = "";
					if($.isArray(data.body) ){
						$.each(data.body,function(i,item){
							sub+="<table>" +
						"<tr><td>已绑定的机动车</td><td></td></tr>" ;
							sub+="<tr><td>"+item.hphm+"</td><td><a href='javascript:;' <a href='#' onclick='unbindjdc(\""+item.hphm+"\",\""+item.hpzl+"\")'>取消绑定</a></td></tr>"+
							"</table>";
							tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 5px;">'+sub+'</div>';
						});
					}else{
						sub+="<table>" +
						"<tr><td>已绑定的机动车</td><td></td></tr>" +
						"<tr><td>"+data.body.hphm+"</td><td><a href='javascript:;' onclick='unbindjdc(\""+data.body.hphm+"\",\""+data.body.hpzl+"\")'>取消绑定</a></td></tr>" +
						"</table>";
						tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 5px;">'+sub+'</div>';
					}
				}else{
					tmp += '<div>查询没有数据</div><br/>';
				}
			}else{
				tmp += '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()+20});
		}
	});
}

function unbindjcz(drvlicense){
	var url =base+"/ac/unbindjcz.do?drvlicense="+drvlicense;
	$.getJSON(url,function(data){
		alert(data.returnMsg);
		window.location.href = base + '/index.do?goself=y';
	});
}

function unbindjdc(hphm,hpzl){
	var url =base+"/ac/unbindjdc.do?hphm="+hphm+"&hpzl="+hpzl;
	$.getJSON(url,function(data){
		alert(data.returnMsg);
		window.location.href = base + '/index.do?goself=y';
	});
}


function sjdz_info(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="'+base+'/images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			$('<a href="'+base+'/member/addPostAddress.do">添加</a><br>').appendTo(nextDd);
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.body){
					if($.isArray(data.body) ){
						$.each(data.body,function(i,item){
							var sub = item.postAddress;
							sub+="&nbsp;&nbsp;&nbsp;&nbsp;";
							sub+='<a href="'+base+'/member/updatePostAddress.do?postAddressId='+item.postAddressId+'&postAddress='+encodeURI(item.postAddress)+'&postCode='+item.postCode+'">修改</a> <a href="javascript:void(0);" onclick="delPostAddress('+item.postAddressId+',$(this))">删除</a>';
							tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 5px;">'+sub+'</div>';
						});
					}
				
				}else{
					tmp += '<div>查询没有未处理数据</div><br/>';
				}
			}else{
				tmp += '<div>'+data.returnMsg+'</div>';
			}
			
			$(tmp).appendTo(nextDd);
			
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()+20});
		}
	});
}

function delPostAddress(postAddressId,obj){
	var url = base+'/member/delPostAddress.do?postAddressId='+postAddressId;
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		success : function(data) {
			if(data.returnCode == 1){
				obj.closest('div').remove();
			}else{
				alert(data.returnMsg);
			}
		}
	});	
}


function pdInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.body){
					
					if( $.isArray(data.body)){
							$.each(data.body, function(i,item){
								var sub = item.wfdz+'</br>';
								sub += item.wfsj+'</br>';
								sub += item.wfxw;
								if(item.xxly){
									if(item.xxly == 1){
										sub += '&nbsp;&nbsp;现场处罚</br>';
									}else if(item.xxly == 2){
										sub += '&nbsp;&nbsp;非现场处罚</br>';
									}
								}else{
									sub +='</br>';
								}
								tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 2px;">'+sub+'</div>';
					});
					}else{
						var item = data.body;
						var sub = item.wfdz+'</br>';
					sub += item.wfsj+'</br>';
					sub += item.wfxw;
					if(item.xxly){
						if(item.xxly == 1){
							sub += '&nbsp;&nbsp;现场处罚</br>';
						}else if(item.xxly == 2){
							sub += '&nbsp;&nbsp;非现场处罚</br>';
						}
					}else{
						sub +='</br>';
					}
					tmp += '<div style="border:1px dotted #000; padding: 6px;margin-bottom: 2px;">'+sub+'</div>';
					}
					
					
					
				}else{
					tmp = '<div>没有违法信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}

function hzInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.body){
					var tmp = '<table>'
					tmp += '<tr><td>'+data.body.status+'</td></tr>';
					tmp += '</table>';
				}else{
					tmp = '<div>没有查询到驾驶证信息，请进入“个人信息”编辑您的个人基础信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}

//驾驶员信息查询
function driverInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			if(data.returnCode == '1'){
				if(data.jzqx){
					var tmp = '<table>'
//					tmp += '<tr><td>驾证期限：</td><td>'+data.jzqx+'</td></tr>';
					tmp += '<tr><td>驾证状态：</td><td>'+data.ztmc+'</td></tr>';
					tmp += '<tr><td>累积记分：</td><td>'+data.ljjf+'</td></tr>';
					tmp += '<tr><td>体检日期：</td><td>'+data.syrq+'</td></tr>';
					tmp += '<tr><td>有效期始：</td><td>'+data.yxqs+'</td></tr>';
					tmp += '<tr><td>有效期止：</td><td>'+data.yxqz+'</td></tr>';
					tmp += '</table>';
				}else{
					tmp = '<div>没有查询到驾驶证信息，请进入“个人信息”编辑您的个人基础信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}

//我的网办查询
function wbInfo(root,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : root+'/vm/findApplyInfoList.do',
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '<div style="width:100%;text-align:center; vertical-align:middle;background-color:#E6E8FA;" >交管网办</div>';
			if(data.returnCode == '1'){
					if($.isArray(data.body) ){
						$.each(data.body,function(i,item){
							 		tmp += '<table>';
									tmp += '<tr><td colspan="2">'+item.biztype+'</td></tr>';
									tmp += '<tr><td>流水号：</td><td>'+item.applyno+'</td></tr>';
									tmp += '<tr><td>申请时间：</td><td>'+item.applytime+'</td></tr>';
									tmp += '<tr><td>办理进度：</td><td>'+item.statusInfo+'</td></tr>';
									tmp += '</table><hr>';
						});
					}else{
						tmp += '<div>查询没有数据</div>';
					}
				
			}else{
				tmp += '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
	
	var dd = nextDd.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : root+'/crj/findExitEntryInfoList.do',
		beforeSend : function(){
			dd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(dd);
			dd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			dd.empty();
			var tmp = '<div style="width:100%;text-align:center; vertical-align:middle;background-color:#E6E8FA;" >出入境网办</div>';
			if(data.returnCode == '1'){
					if($.isArray(data.body) ){
						$.each(data.body,function(i,item){
							 		tmp += '<table>';
									tmp += '<tr><td>受理编号：</td><td>'+item.ywbh+'</td></tr>';
									tmp += '<tr><td>受理状态：</td><td>'+item.clzt+'</td></tr>';
									tmp += '</table><hr>';
						});
					}else{
						tmp += '<div>查询没有数据</div><br/>';
					}
				
			}else{
				tmp += '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(dd);
			dd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
	
}





//户政信息
function smHzInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			var zjlx = '';
			if(data.returnCode == '1'){
				if(data.body){
					if($.isArray(data.body) ){
						tmp += '<table>';
						$.each(data.body,function(i,d){
							//14、普通护照；21、港澳通行证；25、大陆居民往来台湾通行证
							//alert(item.ZJLX=='2');
							if(d.ZJLX=='2'){
								zjlx = '身份证办理进度提醒设置';
								tmp += '<tr><td colspan="2">'+zjlx+'</td></tr>';
								tmp += '<tr><td>受理编号：</td><td>'+d.ZJHM+'</td></tr>';
								tmp += '<tr><td colspan="2"><hr></td></tr>';
							}else if(d.ZJLX=='1'){
								zjlx = '户口办理进度提醒设置';
								//tmp += '<table style="border-bottom:1px dotted #000; padding: 6px;margin-bottom: 5px;">';
								tmp += '<tr><td colspan="2">'+zjlx+'</td></tr>';
								tmp += '<tr><td>身份证号：</td><td>'+d.ZJHM+'</td></tr>';
								tmp += '<tr><td>姓名：</td><td>'+d.XM+'</td></tr>';
								tmp += '<tr><td colspan="2"><hr></td></tr>';
							}
						});
						tmp += '</table>';
					}else{
						tmp += '<table>';
						tmp += '<tr><td>受理编号：</td><td>'+data.body.zjhm+'</td></tr>';
						tmp += '</table>';
					}
				}else{
					tmp = '<div>没有查询到户政信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}


//实名出入境信息
function smCrjInfo(url,obj){
	var nextDd = obj.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			nextDd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			nextDd.empty();
			var tmp = '';
			var zjlx = '';
			if(data.returnCode == '1'){
				if(data.body){
					if($.isArray(data.body) ){
						tmp += '<table>';
						$.each(data.body,function(i,d){
							//14、普通护照；21、港澳通行证；25、大陆居民往来台湾通行证
							if(d.ZJLX=='14'){
								zjlx = '普通护照';
								tmp += '<tr><td colspan="2">'+zjlx+'</td></tr>';
								tmp += '<tr><td>证件号码：</td><td>'+d.ZJHM+'</td></tr>';
								tmp += '<tr><td>出生日期：</td><td>'+d.CSRQ+'</td></tr>';
								tmp += '<tr><td colspan="2"><hr></td></tr>';
							}else if(d.ZJLX=='21'){
								zjlx = '港澳通行证';
								tmp += '<tr><td colspan="2">'+zjlx+'</td></tr>';
								tmp += '<tr><td>证件号码：</td><td>'+d.ZJHM+'</td></tr>';
								tmp += '<tr><td>出生日期：</td><td>'+d.CSRQ+'</td></tr>';
								tmp += '<tr><td colspan="2"><hr></td></tr>';
							}else if(d.ZJLX=='25'){
								zjlx = '大陆居民往来台湾通行证';
								tmp += '<tr><td colspan="2">'+zjlx+'</td></tr>';
								tmp += '<tr><td>证件号码：</td><td>'+d.ZJHM+'</td></tr>';
								tmp += '<tr><td>出生日期：</td><td>'+d.CSRQ+'</td></tr>';
								tmp += '<tr><td colspan="2"><hr></td></tr>';
							}
						});
						tmp += '</table>';
					}else{
						tmp += '<table>';
						tmp += '<tr><td>证件号码：</td><td>'+data.body.ZJHM+'</td></tr>';
						tmp += '<tr><td>出生日期：</td><td>'+data.body.CSRQ+'</td></tr>';
						tmp += '</table>';
					}
				}else{
					tmp = '<div>没有查询到出入境信息。</div>';
				}	
			}else{
				tmp = '<div>'+data.returnMsg+'</div>';
			}
			$(tmp).appendTo(nextDd);
			nextDd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		}
	});
}



//户政信息设置
function setHzInfo(url,obj,postUrl){
	var nextDd = obj.next('dd');
	nextDd.empty();
	var tmp = '';
	var formName = 'hzForm1';
	tmp += '<form id="hzForm1" method="POST" >';
	tmp += '<table border="1">';
	tmp += '<tr><td colspan="2">身份证办理进度提醒设置</td></tr>';
	tmp += '<tr><td>受理编号：</td><td><input type="text" id="zjhm_hz1" name="zjhm" value="" class="gzj_inp1 apps_w160" ></td></tr>';
	tmp += '<tr><td colspan="2"><input id="zjlx_hz1" name="zjlx" type="hidden" value="2"/><input type="button" onclick="checkHzForm1(this.form.zjhm_hz.value,'+postUrl+','+formName+');" value="绑定" class="apps_btn1"></td></tr>';
	tmp += '</table></form>';
	formName = 'hzForm2';
	tmp += '<form id="hzForm2"  method="POST">';
	tmp += '<table border="1">';
	tmp += '<tr><td colspan="2">户口办理进度提醒设置</td></tr>';
	tmp += '<tr><td>身份证号：</td><td><input type="text" id="zjhm_hz2" name="zjhm" value="" class="gzj_inp1 apps_w160" ></td></tr>';
	tmp += '<tr><td>姓名：</td><td><input type="text" id="xm" name="xm"  class="gzj_inp1 apps_w160" ></td></tr>';
	tmp += '<tr><td colspan="2"><input id="zjlx_hz2" name="zjlx" type="hidden" value="1"/><input type="button" onclick="checkHzForm2(this.form.zjhm_hz.value,this.form.xm.value,'+postUrl+','+formName+');" value="绑定" class="apps_btn1"></td></tr>';
	tmp += '</table></form>';
	
	
	$(tmp).appendTo(nextDd);
	nextDd.show();
	obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
	
	var dd = nextDd.next('dd');
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		beforeSend : function(){
			dd.empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo(dd);
			dd.show();
			obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
		},
		success : function(data) {
			dd.empty();
			if(data.returnCode == '1'){
					if($.isArray(data.body) ){
						$.each(data.body,function(i,item){
							if(item.zjlx=='1'){
								$("#zjhm_hz2").val(item.zjhm);
								$("#xm").val(item.xm);
							}else if(item.zjlx=='2'){
								$("#zjhm_hz1").val(item.zjhm);
							}
						});
					}
				
			}
		}
	});
	$('').appendTo(dd);
	dd.show();
	obj.closest('.apps_slidebox').animate({height:obj.closest('ul.ot').height()});
}
	
//机动车非现场违章查询
function vehicle_violation_query(url,hphm1,hphm2,hpzl,clsbdh,fdjh,captcha){
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : {
			hphm : $('#'+hphm1).val()+$('#'+hphm2).val(),
			hpzl : $('#'+hpzl).val(),
			clsbdh : $('#'+clsbdh).val(),
			fdjh : $('#'+fdjh).val(),
			captcha : $('#'+captcha).val()
		},
		beforeSend : function(){
			$('#vehicle_violation_query-desc').empty();
			$('<div style="width:100%;align:center;"><img src="images/loading.gif"/></div>').appendTo('#vehicle_violation_query-desc')
			$('#vehicle_violation_query').jumpBox(true);
		},
		success : function(data) {
			$('#vehicle_violation_query-desc').empty();
			if(data.returnCode == '1'){
				var body = data.body;
				if(body.length > 0){
					for(var i = 0 ; i < body.length ; i++){
						$('<p>违法时间：'+body[i].wfsj+'</p>' +
							'<p>违法地址：'+body[i].wfdz+'</p>'+
							'<p>违法行为：'+body[i].wfxw+'</p>'+
							'<p>罚款金额：'+body[i].fkje+'</p>'+
							'<p>处理机关名称：'+body[i].cljgmc+'</p>' +
							'<p>处理标记：'+body[i].clbj+'</p>' +
							'<p>交款标记：'+body[i].jkbj+'</p>' +
							'').appendTo('#vehicle_violation_query-desc');
					}
				}else{
					$('<p>查询无数据</p>').appendTo('#vehicle_violation_query-desc');
				}
			}else{
				$('<p>'+data.returnMsg+'</p>').appendTo('#vehicle_violation_query-desc');
			}
		},error : function(){
			$('#vehicle_violation_query-desc').empty();
			$('<p>系统繁忙，请稍后再试！</p>').appendTo('#vehicle_violation_query-desc');
		}
	});
}

//加载公告(首次已自动加载，手动加载默认为第2页)
var jj_nt_page = 2, crj_nt_page = 2, hz_nt_page = 2;
function load_notice(url,nt){
	var pn = 1;
	if(nt == 1){
		pn = jj_nt_page;
	}else if(nt == 2){
		pn = crj_nt_page;
	}else if(nt == 3){
		pn = hz_nt_page;
	}
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : url,
		data : {
			pn : pn,
			nt : nt
		},
		beforeSend : function(){
			$('#load_more_button_'+nt).remove();
			$('<div style="width:100%;align:center;" id="load_more_img_'+nt+'"><img src="'+base+'/images/loading.gif"/></div>').appendTo($('#notice_load_'+nt).closest('div'));
		},
		success : function(data) {
			$('#notice_load_'+nt).closest('div').find('#load_more_img_'+nt).remove();
			var appendStr = '';
			if(data.returnCode == '1'){
				var body = data.body;
				if(body){
					for(var i = 0 ; i < body.length ; i++){
						appendStr += '<dt>'+body[i].title+'</dt>';
						appendStr += '<dd class="disnone">'+body[i].content+'</dd>';
					}
					$(appendStr).appendTo($('#notice_load_'+nt));
					if(data.pageInfo.currentPage < data.pageInfo.nextPage){
						var btn= '<p id="'
									+ ('load_more_button_'+nt)
									+ '" class="tc"><input type="button" class="apps_btn2" value="点击加载更多" onclick="load_notice(\''+url+'\','+nt+')"></p>';
						$(btn).appendTo($('#notice_load_'+nt).closest('div'));
					}
					mainactListSlide.scroll.parent().height(mainactListSlide.scroll.find('>li').eq(mainactListSlide.curIndex).height());
					$('.gzj_sfq dl dt').unbind('click').bind('click',function(){
						if('none'!=$(this).next('dd').css('display')){
							$(this).removeClass('on');
							$(this).next('dd').slideUp(300,function(){
								mainactListSlide.scroll.parent().height(mainactListSlide.scroll.find('>li').eq(mainactListSlide.curIndex).height());
							});
						}else{
							$(this).parent().find('dd').slideUp();
							$(this).parent().find('dt').removeClass('on');
							$(this).addClass('on').next('dd').slideDown(300,function(){
								mainactListSlide.scroll.parent().height(mainactListSlide.scroll.find('>li').eq(mainactListSlide.curIndex).height());
								return;
							});
						}
						var fid = '9801600';
						if(mainactListSlide.curIndex == 0){
							fid = '9801601';
						}else if(mainactListSlide.curIndex == 1){
							fid = '9801602';
						}else if(mainactListSlide.curIndex == 2){
							fid = '9801603';
						}
						saveUserAction(fid);
					});
				}
				if (nt == 1) {
					jj_nt_page++;
				} else if (nt == 2) {
					crj_nt_page++;
				} else if (nt == 3) {
					hz_nt_page++;
				}
			}
		},error : function(){
			$('#notice_load_'+nt).find('#load_more_img_'+nt).remove();
		}
	});
}

//登陆输入验证
function loginCheck(obj){
		var phoneNum = obj.find('input[name="phoneNum"]').val();
		var captcha = obj.find('input[name="captcha"]').val();
		var username = obj.find('input[name="username"]').val();
		var password = obj.find('input[name="password"]').val();
		var account = obj.find('input[name="account"]').val();
		var password1 = obj.find('input[name="password1"]').val();
//		var login_type = obj.find('input[type="radio"]:checked');
		var login_type = $('#login_type1').val();
//		alert('login_type>>'+login_type);
//		if(!login_type){
//			login_type = 0;
//		}else{
//			login_type = login_type.val();
//		}
		if(!login_type){
			login_type = 3;
		}
		if(login_type == 1){
			if(!myRegEx.phoneNum.test(phoneNum)){
				alert('手机号码格式不正确');
				return false;
			}
			if(!myRegEx.captcha.test(captcha)){
				alert('验证码必须为4位字母或数字');
				return false;
			}
		}else if(login_type == 2){
			if(!myRegEx.username.test(username)){
				alert('用户名格式不正确');
				return false;
			}
			if(!myRegEx.password.test(password)){
				alert('密码格式不正确');
				return false;
			}
		}else if(login_type == 3){
			if(!account){
				alert('实名账号不能为空');
				return false;
			}
			if(!password1){
				alert('实名密码不能为空');
				return false;
			}
		}else{
			alert('请选择登陆方式');
			return false;
		}
//		obj.find('input[name="ltype"]').val(login_type);
		return true;
	}

//登陆输入验证
function loginCheck1(obj){
		var phoneNum = obj.find('input[name="phoneNum"]').val();
		var captcha = obj.find('input[name="captcha"]').val();
		var username = obj.find('input[name="username"]').val();
		var password = obj.find('input[name="password"]').val();
		var account = obj.find('input[name="account"]').val();
		var password1 = obj.find('input[name="password1"]').val();
//		var login_type = obj.find('input[type="radio"]:checked');
		var login_type = $('#login_type2').val();
//		alert('login_type>>'+login_type);
//		if(!login_type){
//			login_type = 0;
//		}else{
//			login_type = login_type.val();
//		}
		if(!login_type){
			login_type = 3;
		}
		if(login_type == 1){
			if(!myRegEx.phoneNum.test(phoneNum)){
				alert('手机号码格式不正确');
				return false;
			}
			if(!myRegEx.captcha.test(captcha)){
				alert('验证码必须为4位字母或数字');
				return false;
			}
		}else if(login_type == 2){
			if(!myRegEx.username.test(username)){
				alert('用户名格式不正确');
				return false;
			}
			if(!myRegEx.password.test(password)){
				alert('密码格式不正确');
				return false;
			}
		}else if(login_type == 3){
			if(!account){
				alert('实名账号不能为空');
				return false;
			}
			if(!password1){
				alert('实名密码不能为空');
				return false;
			}
		}else{
			alert('请选择登陆方式');
			return false;
		}
//		obj.find('input[name="ltype"]').val(login_type);
		return true;
	}


//用户登录
function login1(url,obj){
	$.get(base+'/member/saveUserAction.do',{functionId:'9801401'});
	if(!loginCheck1(obj))
		return false;
	var dataParam = null;
	var ltype = obj.find('input[name="ltype"]').val();
	var redirect_url = obj.find('input[name="redirect_url"]');
	if(redirect_url)
		redirect_url = redirect_url.val();
	else
		redirect_url = '';
	if(ltype == 1){
		dataParam = {
			phoneNum : obj.find('input[name="phoneNum"]').val(),
			captcha : obj.find('input[name="captcha"]').val(),
			ltype : ltype,
			redirect_url : redirect_url
		}
	}else if(ltype == 2){
		dataParam = {
			username : obj.find('input[name="username"]').val(),
			password : obj.find('input[name="password"]').val(),
			ltype : ltype,
			redirect_url : redirect_url
		}
	}else if(ltype == 3){
		dataParam = {
			account : obj.find('input[name="account"]').val(),
			password : obj.find('input[name="password1"]').val(),
			ltype : ltype,
			redirect_url : redirect_url
		}
	}
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : dataParam,
		success : function(data) {
			if(data.returnCode == '1'){
//				window.alert("恭喜，您已成功登录警民通业务！");
//				if(data.redirectUrl && data.redirectUrl != ''){
//					window.location.href = base + data.redirectUrl;
//				}else{
				window.location.href = window.location.href;
//				}
			}else{
				window.alert(data.returnMsg);
			}
		}
	});
}

//用户登录
function login(url,obj){
	$.get(base+'/member/saveUserAction.do',{functionId:'9801401'});
	if(!loginCheck(obj))
		return false;
	var dataParam = null;
	var ltype = obj.find('input[name="ltype"]').val();
	var redirect_url = obj.find('input[name="redirect_url"]');
	if(redirect_url)
		redirect_url = redirect_url.val();
	else
		redirect_url = '';
	if(ltype == 1){
		dataParam = {
			phoneNum : obj.find('input[name="phoneNum"]').val(),
			captcha : obj.find('input[name="captcha"]').val(),
			ltype : ltype,
			redirect_url : redirect_url
		}
	}else if(ltype == 2){
		dataParam = {
			username : obj.find('input[name="username"]').val(),
			password : obj.find('input[name="password"]').val(),
			ltype : ltype,
			redirect_url : redirect_url
		}
	}else if(ltype == 3){
		dataParam = {
			account : obj.find('input[name="account"]').val(),
			password : obj.find('input[name="password1"]').val(),
			ltype : ltype,
			redirect_url : redirect_url
		}
	}
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : dataParam,
		success : function(data) {
			if(data.returnCode == '1'){
//				window.alert("恭喜，您已成功登录警民通业务！");
				if(data.redirectUrl){
					window.location.href = base + data.redirectUrl;
				}else{
					window.location.href = window.location.href;
				}
			}else{
				window.alert(data.returnMsg);
			}
		}
	});
}

//发送登录验证码
function getLoginValid(url,obj){
	var phoneNum = obj.find('input[name="phoneNum"]');
	var captcha = obj.find('input[name="captcha"]');
	var phoneNum_val = phoneNum.val();
	if(!phoneNum_val || '输入移动手机号'==phoneNum_val){
		window.alert('请输入手机号码');
//		phoneNum.select();
		return false;
	}
	if(!myRegEx.phoneNum.test(phoneNum_val)){
		window.alert('手机号码格式有误');
		phoneNum.select();
		return false;
	}
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : {
			phoneNum : phoneNum_val
		},
		success : function(data) {
			if(data.returnCode == '1'){
				window.alert('验证码已发到手机上，请查收');
//				captcha.val(data.body.captcha);
			}else{
				window.alert(data.returnMsg);
			}
		}
	});
	
}
//获取图片验证码
function getImgValidCode(obj,img,imgLoding){
	if('disnone' == img.attr('class')){
		obj.html('换一张');
	}
	img.hide();
	imgLoding.show();
	img.attr('src',base+'/captcha.vsl?t='+new Date().getTime());
	img.bind('load',function(){
		imgLoding.hide();
		img.show();
	});
}
//点击提醒我知道了
function hasRead(obj,count){
	$('#'+count).html(0);
	$(obj).closest('div').hide();
	$(obj).closest('.apps_slidebox').height($(obj).closest('ul.ot').height());
}

//加载个人设置信息列表
function customlist(){
	var obj = $('#myapp7');
	if($('#myapp-custom-list').children().length > 0){
		$('#'+obj.attr('id')+"-app").show();
		obj.closest('.apps_slidebox').height(obj.closest('ul.ot').height());
		return false;
	}
	$.ajax({
		type : 'get',
		dataType : 'json',
		url : base+'/member/customlist.do',
		beforeSend : function(){
			$('<tr><th></th><td><img src="images/loading.gif"/></td><td></td></tr>').appendTo($('#myapp-custom-list'));
		},
		success : function(data){
			$('#myapp-custom-list').empty();
			if(data.returnCode == '1'){
				var body = data.body;
				if(body){
					var appendStr = '';
					for(var i = 0 ; i < body.length ; i++){
						appendStr += '<tr id="cur_custom_'+body[i].id+'"><th>'+body[i].customBusTypeName+'</th>' +
							'<td><label><input type="hidden" value="'+body[i].clientStatus+'"/><input type="checkbox" '+(body[i].clientStatus==1?'checked':'')+'/></label></td>' +
							'<td><label><input type="hidden" value="'+body[i].smsStatus+'"/><input type="checkbox" '+(body[i].smsStatus==1?'checked':'')+'/></label></td></tr>';
					}
				}else{
					appendStr = '<tr><th></th><td>查询无数据</td><td></td></tr>';
				}
			}else{
				appendStr = '<tr><th></th><td>'+data.returnMsg+'</td><td></td></tr>';
			}
			$('#myapp-custom-list').empty();
			$(appendStr).appendTo('#myapp-custom-list');
			$("input[type='checkbox']").checkboxFn();
			$('#'+obj.attr('id')+"-app").show();
			obj.closest('.apps_slidebox').height(obj.closest('ul.ot').height());
		}
	});
}

//保存用户推送列表
function saveCustomList(url){
	if($('#myapp-custom-list').children().length == 0){
		return false;
	}
	var list = '';
	var id = '';
	var addlist = '';
	var dellist = '';
	$('#myapp-custom-list').find('tr').each(function(){
		var oldV1 = $(this).find("input[type='hidden']").eq(0).val();
		var oldV2 = $(this).find("input[type='hidden']").eq(1).val();
		var newV1 = $(this).find("input[type='checkbox']").eq(0).attr('checked');
		var newV2 = $(this).find("input[type='checkbox']").eq(1).attr('checked');
		newV1 = newV1 == 'checked'?'1':'0';
		newV2 = newV2 == 'checked'?'1':'0';
		if(oldV1 != newV1 || oldV2 != newV2){
			id = $(this).attr('id');
			id = id.substring(11);
			list += id+','+newV1+','+newV2+';';
			if(newV2 == 1){
				addlist += $(this).find('th').html()+"、";
			}else{
				dellist += $(this).find('th').html()+"、";
			}
		}
	});
	if(list.length > 0){
		list = list.substring(0,list.length-1);
		if(addlist.length > 0)
			addlist = addlist.substring(0,addlist.length-1);
		if(dellist.length > 0)
			dellist = dellist.substring(0,dellist.length-1);
	}else{
		alert('您未做任何修改，无需保存');
		return false;
	}
	var confirmStr = '';
	if(addlist.length > 0){
		confirmStr += '订制下列【'+addlist+'】';
	}
	if(addlist.length > 0 && dellist.length > 0){
		confirmStr += '，同时';
	}
	if(dellist.length > 0){
		confirmStr += '取消下列【'+dellist+'】';
	}
	if(!window.confirm("您将"+confirmStr+"免费的业务提醒短信服务，请确认提交。")){
		return false;
	}
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : url,
		data : {
			'saveCustomList' : list
		},
		beforeSend : function(){
			$('#myapp-custom-list').empty();
			$('<tr><th></th><td><img src="images/loading.gif"/></td><td></td></tr>').appendTo($('#myapp-custom-list'));
		},
		success : function(data){
			$('#myapp-custom-list').empty();
			if(data.returnCode == '1'){
				customlist();
			}else{
				$('<tr><th></th><td>'+data.returnMsg+'</td><td></td></tr>').appendTo($('#myapp-custom-list'));
			}
		}
	});
}

function saveUserAction(functionId){
	$.ajax({
            type: "GET",
            url: base+"/member/saveUserAction.do?functionId="+functionId,
            async: false,
            success: function (data) {
            return true;
		  }	,
		  error:function(){
		  return true;
		  }
});
	
}