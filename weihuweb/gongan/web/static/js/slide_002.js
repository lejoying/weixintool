"use static"

var Slide = function(){
	this.init = function(oTouch){
		var self = this;
		this.vertical = oTouch.vertical || false;
		this.touch = oTouch.touchId;
		this.scroll = this.touch.find(">.apps_slidebox>ul");
			if(!this.scroll[0]) return false;		
		this.auto = oTouch.auto || false;
		this.loop = oTouch.loop || false;
		this.downLine=oTouch.downLine||false;
		this.vertical = oTouch.vertical || false;
		this.startX = 0;
		this.startY = 0;
		this.curX = 0;
		this.curY = 0;
		this.touchX = 0;
		this.touchY = 0;
		this.itemW = oTouch.state&&oTouch.state=='big'?this.touch.width():this.touch.find(">.apps_slidebox>ul>li").width();
		//this.itemW = oTouch.state&&oTouch.state=='big'?$(document).width()<320?320:$(document).width():this.touch.find(">.apps_slidebox>ul>li").width();
		this.itemH = this.touch.find(">.apps_slidebox>ul>li").height();
		this.curIndex = 0;
		this.numIndex = this.touch.find(">.apps_slidebox>ul>li").length;
		//this.tabs = this.touch.find(".numIcon span");
		this.tabs = this.touch.find(">.apps_slidebox").next("p").children("span");
		this.toptabs=this.touch.find(">.apps_topslide a");
		this.isTouch = this.touch.hasClass("ui-slide-touch");
		this.prev = this.touch.find(">.l_ar");
		this.next = this.touch.find(">.r_ar");
		this.beforeSlide = oTouch.beforeSlide || function() {};
		this.afterSlide = oTouch.afterSlide || function() {};
		this.touch.find(">.apps_slidebox>ul>li").css("width",this.itemW);
		this.scroll.css("width",this.itemW*this.numIndex);
		this.scroll.parent().height(this.scroll.find('>li').eq(0).height());
		if (this.loop) {
			this.scroll.append(this.scroll.html());
		}
		if(this.downLine){
			this.mLine=this.touch.find('.mLine');
			var w=this.mLine.parent().width()/this.toptabs.length;
			this.mLine.css({width:w,left:0,bottom:0});
		}
		if(this.prev.length > 0){
			this.prev.bind("click",function(e){
				if(self.curIndex > 0){
					self.slide(self.curIndex - 1);
				}else{
					//alert("前面没有了");
				}
			});
		}
		if(this.next.length > 0){
			this.next.bind("click",function(e){
				if(self.curIndex < (self.numIndex - 1)){
					self.slide(self.curIndex + 1);
				}else{
					//alert("后面没有了");
				}
			});
		}
		if(this.tabs.length > 1){
			this.tabs.unbind().bind('click',function(){
				var _this = this,
					index = self.tabs.index(_this);
					self.slide(index);	
					return false;
			});
		}
		
		if(this.toptabs.length > 1){
			this.toptabs.unbind().bind('click',function(){
				var _this = this,
					index = self.toptabs.index(_this);
					self.slide(index);	
					return false;
			});
		}

		this.scroll[0].ontouchstart=function(event){
			self.touchStart(event);
			this.ontouchmove=function(event){
				self.touchMove(event);
			};
			this.ontouchend=function(event){
				self.touchEnd(event);
			};
		}
		/*------*/
//		$(window).resize(function(){
//			self.scroll.removeAttr('style');
//			self.touch.find(">.apps_slidebox>ul>li").removeAttr('style');
//			self.itemW = oTouch.state&&oTouch.state=='big'?self.touch.width():self.touch.find(">.apps_slidebox>ul>li").width();
//			self.scroll.css("width",self.itemW*self.numIndex);
//			self.touch.find(">.apps_slidebox>ul>li").css("width",self.itemW);
//		});
	};
}
Slide.prototype = {
	touchStart : function(e){
		this.isMoving = false;
		var touching = e.touches[0];
		this.startX = touching.pageX;
		this.startY = touching.pageY;
		this.curX = 0;
		this.curY = 0;
		this.touchX = 0;
		this.touchY = 0;
	},
	touchMove : function(e){
		var touching = e.touches[0];
		this.curX = touching.pageX;
		this.curY = touching.pageY;	
		this.touchX = this.curX - this.startX;
		this.touchY = this.curY - this.startY;
		if(!this.isMoving){
			this.isMoveX = Math.abs(this.touchX) > Math.abs(this.touchY);
			this.isMoveY = Math.abs(this.touchX) < Math.abs(this.touchY);
			this.isMoving = true;
			if (this.vertical) {
				if (this.isMoveY) {
					e.preventDefault();
				}
			} else {
			if(this.isMoveX){
				e.preventDefault();
			}
			}
		} else {
			if (this.vertical) {
				if (this.isMoveY) {
					this.scroll[0].style.top = this.scroll[0].offsetTop + this.touchY / Math.abs(this.touchY) + "px";
					e.preventDefault();
				}
		}else{
			if(this.isMoveX){
				this.scroll[0].style.left = this.scroll[0].offsetLeft + this.touchX/Math.abs(this.touchX) + "px";
				e.preventDefault();
			}
		}
		}
	},
	touchEnd : function(e){
		if (!this.isMoving) {
			return;
		}
//		if (this.vertical) {
//			if (this.touchY > 10) {
//				if (this.curIndex <= 0) {
//					this.slide(this.curIndex);
//					return;
//				} else {
//					this.slide(this.curIndex - 1);
//				}
//			} else if (this.touchY < -10) {
//				if (this.curIndex == this.numIndex - 1) {
//					if (this.loop) {
//						this.slide(this.curIndex + 1);
//					} else {
//						this.slide(this.curIndex);
//						return;
//					}
//				} else {
//					this.slide(this.curIndex + 1);
//				}
//			} else {
//
//			}
//		} else {
		if(this.touchX > 100){
			if(this.curIndex <= 0){
				this.slide(this.curIndex);
				return;
			}else{
				this.slide(this.curIndex - 1);
			}
		}else if(this.touchX < - 100){
			if(this.curIndex == this.numIndex - 1){
					if (this.loop) {
						this.slide(this.curIndex + 1);
					} else {
				this.slide(this.curIndex);
				return;
					}
			}else{
				this.slide(this.curIndex + 1);
			}
		}else{

		}
//		}
	},
	slide :function(index){
		var _this = this;
		this.beforeSlide();
		this.scroll.parent().height(this.scroll.find('>li').eq(index).height());
		if (this.vertical) {
			this.scroll.animate({
				top: -this.itemH * index + "px"
			}, 500, function(e) {
				if (index >= _this.numIndex) {
					_this.curIndex = 0;
					_this.scroll.css({
						top: 0
					});
				} else {
					_this.curIndex = index;
				}
				if (!_this.loop) {
					_this.reset(_this.curIndex);
				}
				_this.afterSlide();
			})
		} else {
			this.scroll.animate({
				left: -this.itemW * index + "px"
			}, 500, function(e) {
				if (index >= _this.numIndex) {
					_this.curIndex = 0;
					_this.scroll.css({
						left: 0
					});
				} else {
					_this.curIndex = index;
				}
				if (!_this.loop) {
					_this.reset(_this.curIndex);
				}
				_this.afterSlide();
			});
			if(this.downLine){
				this.mLine.animate({
					left:this.mLine.width()*index+"px"
				},500)
			}
			if(index <= 0){
				_this.prev.addClass("l_ar_none");
			}else if(0<index<this.numIndex){
				_this.prev.removeClass("l_ar_none");
			} 
			if(index == this.numIndex -1){
				_this.next.addClass("r_ar_none");
			}else if(index < this.numIndex-1){
				_this.next.removeClass("r_ar_none");
			}
			_this.touch.find("*[type='clink']").html(_this.scroll.find('li').eq(index).find("*[type='link']").html());
		}
	},
	reset:function(index){
		this.tabs.removeClass("on").eq(index).addClass("on");
		this.toptabs.removeClass("on").eq(index).addClass("on");
	}
}


$.fn.extend({
	jxpage:function(_num,_pageH){
		var tul=$(this);
		var creatPage={
			tul:$(this),
			lis:$(this).find('li'),
			linum:$(this).find('li').length||0,
			pagelis:6,
			page:0,
			classNm:null,
			init:function(_num,_pageH){
				this.classNm=tul.attr('class');
				this.pagelis=parseInt(_num);
				if(this.linum<=this.pagelis){return false;}
				var str="<li style='background:none; padding-left:0;padding-right:0; float:left; overflow:hidden; width:320px;margin:0;border:0;'><ol class='"+this.classNm+"'>";
				for(var i=0;i<this.linum;i++){
					(i!=0&&i%this.pagelis==0)?str+="</ol></li><li style='background:none; padding-left:0;padding-right:0; float:left; overflow:hidden; width:320px;margin:0;border:0;'><ol class='"+this.classNm+"'>":str+=""; 
					str+="<li>"+this.lis.eq(i).html()+"</li>";
				}
				str+="</ol></li>";
				this.tul.html(str);
				str="<p class='apps_newscircle numIcon'>";
				for(var i=0;i<this.linum/this.pagelis;i++){
					str+=i==0?"<span class='on'>"+(i+1)+"</span>":"<span>"+(i+1)+"</span>";
				}
				str+="</p>";
				this.tul.after(str);
				this.tul.css({'position':'absolute','height':_pageH+'px'});
				this.tul.wrap("<div class='apps_slidebox'></div>");
				this.tul.parent().css({'position':'relative','overflow':'hidden','height':_pageH+'px'});
				this.tul.attr('class','');
				this.uppageFun();
			},//end init
			uppageFun:function(){
				var ListSlide = new Slide();
				ListSlide.init({touchId:tul.parent().parent()});
			}//end uppageFun
		}
		creatPage.init(_num,_pageH);
	}
})

