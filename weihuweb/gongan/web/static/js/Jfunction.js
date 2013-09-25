// JavaScript Document

"use strict"
$.fn.extend({
	//输入框字符显示
	showWord:function(str){
		var _c=$(this).css('color');
		$(this).focus(function(){
			if(str == $(this).val()){ 
				$(this).val('');
				$(this).css('color','#000');
			}
		})
		$(this).blur(function(){
			if("" == $(this).val()){
				 $(this).val(str);
				 $(this).css('color',_c);
			}
		})
	},
	//end 输入框字符显示
	
	//图片滑动切换
	divMove:function(left,right,cont,tag,maxLen,lrNo,where){
		$(this).each(function(){
			var oLeft=$(this).find('i.'+right),
				oRight=$(this).find('i.'+left),
				oCont=$(this).find(cont),
				oWhere=$(this).find(where),
				w=oCont.find(tag).width()+parseInt(oCont.find(tag).css('margin-right')),
				len=oCont.find(tag).length,
				index=0,_method=this,
				maxL=maxLen?maxLen:1,
				leftNo=lrNo?lrNo+'r':right+'_none',
				rightNo=lrNo?lrNo+'l':left+'_none';
			oCont.width(w*len);
			oLeft.click(function(){
				if($(this).attr('class').indexOf(leftNo)>0){return false;}
				index+=maxLen;
				if(index>0){oRight.removeClass(rightNo);}
				if(index>=len-maxL){$(this).addClass(leftNo);}
				oCont.stop(true,false).animate({'left':-1*index*w},800);
				oWhere.eq(index).addClass('on').siblings().removeClass('on');
			});
			oRight.click(function(){
				if($(this).attr('class').indexOf(rightNo)>0){return false;}
				index-=maxLen;
				if(index>=0){oLeft.removeClass(leftNo);}
				if(index<=0){$(this).addClass(rightNo);}
				oCont.stop(true,false).animate({'left':-1*index*w},800);
				oWhere.eq(index).addClass('on').siblings().removeClass('on');
			});
		});
	},
	//end 图片滑动切换
	
	
	//选项卡
	tabControl:function(tab,con,mor){
		$(this).each(function(){
			var _method=this;
			$(this).find(tab).click(function(){
				if(this.className=='more'){return false;}
				$(this).addClass('on').siblings().removeClass('on');
				$(_method).find(con).addClass('disnone');
				$(_method).find(con).eq($(this).index()).removeClass('disnone');
				//$(_method).find(tab+'.more').removeClass('on');
				return false;
			});
			$(this).find(mor).click(function(){
				window.location.href=$(this).attr('href');
			});
		});
	},
	//end 选项卡
	
	
	//弹出框
	jumpBox:function(style){
		var _method=$(this);
		$("body select").css('visibility','hidden');
		$("#mask").css({'display':'block','height':$(document).height()});
		$(this).show(0,function(){
			center($(this),style);
		});
		$(this).find("*[name='close']").click(function(){
			$("body select").css('visibility','visible');	
			$("#mask").hide();
			_method.hide();
			return false;
		})
	},
	//end 弹出框
	
	//滚动文字广告
	txtAdvRoll:function(){
		$(this).each(function(){
			var _method=$(this).find('ul'),length=_method.find('li').length,
				width=_method.find('li').width(),height=_method.find('li').height(),index=0,speed1=3000,speed2=1000,
				roll_up=function(){
					index++;
					_method.css('left',0).animate({'top':-index*height},300,function(){
						if(index>=length){
							index=0;
							_method.css('top',0);
						}
						setTimeout(roll_left,speed2);
					});
				},
				roll_left=function(){
					var left=_method.find('li a').eq(index).width()-width;
					if(left>0){
						_method.animate({'left':-left},left*10,function(){
							setTimeout(roll_up,speed1);
						});
					}else{
						setTimeout(roll_up,speed1);
					}
				};
			_method.html(_method.html()+_method.html());
			setTimeout(roll_left,speed2);
			$(window).resize(function(){width=_method.find('li').width();});
		});
		return this;
	}
	//end 滚动文字广告
	
});

function reststr(str,len)			//计算字符长度
{
   var str_length = 0,r={'rest':len,'has':0};
   var str_len = 0,
	  str_cut = new String();
	  str_len = str.length;
	  for(var i = 0;i<str_len;i++){
		var a = str.charAt(i);
		str_length++;
		if(escape(a).length > 4) { str_length++; }
		str_cut = str_cut.concat(a);
		//if(str_length>=len){ r.rest=0;r.has=str_length;return r;}
	}
	//if(str_length<len){
	 r.has=str_length;
	 r.rest=len-str_length;
	 return r;
	//}
}
//function center(obj,style) {		//取中间值
//	var screenWidth = $(window).width(), screenHeight = $(window).height(); 
//	var scrolltop = $(document).scrollTop();
//	var objLeft = (screenWidth - obj.width())/2 ;
//	var objTop = obj.offset().top + scrolltop;
//	
//	obj.css({left: objLeft + 'px', top: objTop + 'px'});
//	
//	$(window).bind('resize', function() {
//		center(obj,style);
//	});
//}
function center(obj,style) {		//取中间值
	var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
	var objLeft = (screenWidth - obj.width())/2 ;
	var objTop = (screenHeight - obj.height())/2 + $(document).scrollTop();
	obj.css({position:'absolute',left: objLeft + 'px', top: objTop + 'px'});
	if(true==style){
		$(window).bind('scroll', function() { 
			objTop = (screenHeight - obj.height())/2 + $(document).scrollTop();
			obj.css({top:objTop+'px'});
			$("#mask").css({'height':$(document).height()});
		});	
	}else{
		$(window).unbind('scroll');
	}
}