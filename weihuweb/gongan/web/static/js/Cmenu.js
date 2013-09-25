var actpath = "./ejld.php";		//联动菜单路径

$.fn.extend({
	center:function(str) {
		var obj=$(this);
		obj.find("*[name='str']").html(str);
		var screenWidth = $(window).width(), screenHeight = $(window).height(); 
		var scrolltop = $(document).scrollTop();
		var objLeft = (screenWidth - obj.width())/2 ;
		var objTop = (screenHeight - obj.height())/2 + scrolltop;
		obj.css({position:'absolute',left: objLeft + 'px', top: objTop + 'px','display': 'block'});
		obj.find("*[name='close']").click(function(){obj.hide();})
	},
	tabControl:function(tab,con,mor){
		$(this).each(function(){
			var _method=this;
			$(this).find(tab).click(function(){
				if(this.className=='more'){return false;}
				$(this).addClass('on').siblings().removeClass('on');
				$(_method).find(con).addClass('dis_none').eq($(this).index()).removeClass('dis_none');
				$(_method).find(tab+'.more').removeClass('on');
				return false;
			});
			$(this).find(mor).click(function(){window.location.href=$(this).attr('href');});
		});
	},
	seleFn:function(){
		$(this).each(function(){
			if('true'==$(this).attr('jsSim')) return false;
			var _method=$(this),_parent=null;
				len = $(this).children("option").length, str = "",
				w = $(this).width()+parseInt($(this).css('padding-right'))+parseInt($(this).css('padding-left')),
				stype= ($(this).attr('stype')=='liandong')?"stype='liandong'":"",
			    border  = "<span class='apps_fn_seleJs'><span class=\"seleTB\" "+stype+"></span><div class=\"apps_seleMenu\"></div></span>";
			var	rect='2px '+(_method.width()-23)+'px 23px 2px';
			_method.css({'height':'30px','line-height':'24px','background':'none','clip':'rect('+rect+')','position':'absolute','top':_method.position().top+3,'left':_method.position().left}).before(border);
			_method.attr('jsSim','true').prev().find('.seleTB').width(w-26);
		})//end each
		
		var _ld=$("select[stype='liandong']");
		if(0==_ld.length) return false;
		_ld.bind('change',function(){
			var ldname=$(this).attr('ldname');
			var	ldgroup=$("select[ldname='"+ldname+"']");
			var	ldlen=$("select[ldname='"+ldname+"']").length;
			var	ldindex=$("select[ldname='"+ldname+"']").index($(this));
			var	nsel=ldgroup.eq(ldindex+1);
			var	tvalue=$(this).val();
			if(""==tvalue){
				for(var i=ldindex+1;i<ldlen;i++){ 
					_ld.eq(i)[0].selectedIndex = 0;
					_ld.eq(i).prev('.apps_fn_seleJs').find('.seleTB').html(_ld.eq(i).children("option:selected").html());
				}
				return false;
			}
			$.ajax({
			   type: "POST",url: actpath,data: "value="+tvalue,dataType :"json",async: false,
			   success: function(msg){
				nsel.html('');
				for(var i in msg){nsel.append('<option value="'+msg[i][0]+'">'+msg[i][1]+'</option>');};
			   }//end success
			})//end ajax
		})//end change
			
	},
//	radioFn:function(){
//		$(this).each(function(){
//			var _method=$(this);
//			if(_method.parent('label').css('display')=='none'||_method.css('display')=='none') return false;
//			_method.parent().hide().before("<label name=\""+$(this).attr("name")+"\" class=\"apps_fn_radioTb\"><span>"+_method.parent().text()+"</span></label>"); 
//			var _parent=_method.parent().prev();
//			var str=_method.attr("checked")=="checked"?"radioBtn_on":"radioBtn";
//			var disable=_method.attr("disabled")=="disabled"?" disabled=\"disabled\"":"";
//			_parent.prepend("<span class='"+str+"' "+disable+"></span>");
//			_parent.hover(function(){_method.css({"cursor":"pointer"})},function(){_method.css({"cursor":"normal"})});
//			_parent.unbind().bind('click',function(){
//				var obj=_parent.find("span").eq(0);
//				if(obj.attr("disabled")=="disabled"){ return false;}
//				$(".apps_fn_radioTb[name='"+$(this).attr("name")+"']").find("span:eq(0):not([disabled='disabled'])").attr('class','radioBtn');
//				obj.attr('class',obj.attr('class')=='radioBtn'?'radioBtn_on':'radioBtn');	
//				_method.attr('checked',true);		
//			})
//		})//end each
//	},
	checkboxFn:function(){
		$(this).each(function(){
			var _method=$(this);
			if('none'==_method.parent().css('display')||_method.css('display')=='none') return false;
			_method.parent().hide().before("<label name=\""+_method.attr("name")+"\" class=\"apps_fn_ckboxTb\"><span>"+_method.parent().text()+"</span></label>"); 		
			var _parent=_method.parent().prev();
			var str=_method.attr("checked")=="checked"?"ckboxBtn_on":"ckboxBtn";
			var disable=_method.attr("disabled")=="disabled"?" disabled=\"disabled\"":"";
			_parent.prepend("<span class='"+str+"' "+disable+"></span>");
			_parent.hover(function(){_method.css({"cursor":"pointer"})},function(){_method.css({"cursor":"normal"})});
			_parent.unbind().bind('click',function(){
				var obj=_parent.find("span").eq(0);
				if(obj.attr("disabled")=="disabled"){ return false;}
				obj.attr('class',obj.attr('class')=='ckboxBtn'?'ckboxBtn_on':'ckboxBtn');	
				_method.attr('checked',obj.attr('class')=='ckboxBtn'?false:true);		
			})
		})
	},
	schSeleFn:function(){
		$(this).each(function(){
			if('none'==$(this).css('display')) return false;
			var _method=$(this),_parent=null;
				len = $(this).children("option").length, str="",
				w = $(this).width()+parseInt($(this).css('padding-right'))+parseInt($(this).css('padding-left')),
			    border  = "<span class=\"apps_fn_schTB\"><span class=\"selshow\" name=\"selshow\" readonly=\"readonly\" ></span><div class=\"apps_fn_schMenu\"></div></span>";
				for(var i=0; i<len; i++){
					var fs=(i==0)?" class='f' ":"",ls=(i==len-1)?" class='l' ":"";
					str += "" != $(this).children("option")[i].innerHTML?"<p "+fs+ls+"><span>"+_method.children("option")[i].innerHTML+"</span></p>":"";
				}
			_method.hide().before(border);
			_method.prev().find('.selshow').html(_method.children("option:selected")?_method.children("option:selected").html():$(this).children("option")[0].html())
			_method.prev().find(".apps_fn_schMenu").html(str);
			var _parent=_method.prev(".apps_fn_schTB"),
				_showO = _parent.find(".selshow"),
				_schMenu=_parent.find('.apps_fn_schMenu'),
				creatSch={
				init:function(){
					_parent.width(w);
					_schMenu.width(60);
					this.schJsFun();
				},
				schJsFun:function(){
					$("body").click(function(){ $(".apps_fn_schMenu").hide(); })
					_parent.unbind('click').bind('click',function(e){e.stopPropagation();_schMenu.toggle();})
					_schMenu.find("p").hover(function(){$(this).addClass('on');},function(){$(this).removeClass('on');});
					_schMenu.find("p").unbind("mousedown").bind("mousedown",function(e){
						e.stopPropagation();
						_showO.html($(this).find("span").html()).attr("tvalue",$(this).attr("value"));
						_schMenu.hide().trigger('change');
						_method[0].selectedIndex = $(this).index();
						_method.trigger('change');
					})
				}
			}
			creatSch.init();
		})
	},
	fileTxFn:function(){
		$(this).each(function(){
			if(0==$(this).width()) return false;
			var _method=$(this),w=$(this).width();
			$(this).height(0).width(0).css({'filter':'Alpha(Opacity=0)','opacity':0}).before("<span class='apps_fn_fileCss'><input type='text' class='apps_hdlt apps_w180' value='"+$(this).val()+"' readonly='readonly' /> <input class='apps_btn1 apps_w100' type='button' value='上传'></span>");
			var _parent=_method.prev('span');
			_parent.unbind().bind('click',function(){_method.click();return false;})
			_method.unbind('change').bind('change',function(){_parent.find("input[type='text']").val(_method.val());return false;})
		})
	}
})

$(document).ready(function(){
	$('select.seleCss').seleFn();
	//$("input[type='radio']").radioFn();
	$("input[type='checkbox']").checkboxFn();
	$("select.schSele").schSeleFn();
	//$("input[type='file']").fileTxFn();
})