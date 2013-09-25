var SlideAuto = function() {
		this.init = function(oTouch) {
			var self = this;
			this.vertical = oTouch.vertical || false;
			this.touch = $("." + oTouch.touchId);
			this.scroll = this.touch.find("ul");
			if(!this.scroll[0]) return false;
			this.auto = oTouch.auto || false;
			this.loop = oTouch.loop || false;
			this.drag = oTouch.drag || false;
			this.vertical = oTouch.vertical || false;
			this.timer = null;
			this.speed=oTouch.speed||5000;
			this.startX = 0;
			this.startY = 0;
			this.curX = 0;
			this.curY = 0;
			this.touchX = 0;
			this.touchY = 0;
			this.itemW = this.touch.find("ul li").width() || 320;
			this.itemH = this.touch.find("ul li").height();
			this.curIndex = 0;
			this.numIndex = this.scroll.find("li").length;
			this.tabs = this.touch.find(".smalltag i");
			this.isTouch = this.touch.hasClass("ui-slide-touch");
			this.prev = this.touch.find(">.l_ar");
			this.next = this.touch.find(">.r_ar");
			this.showTit=this.touch.find(".newsTit");
			this.showTit.html(this.scroll.find('li img').eq(0).attr('title'));
			this.scroll.css("width",this.itemW*(this.numIndex+1));
			this.beforeSlide = oTouch.beforeSlide ||
			function() {};
			this.afterSlide = oTouch.afterSlide ||
			function() {};
			if (this.loop) {
				this.scroll.append(this.scroll.html());
			}
			if (this.prev.length > 0) {
				this.prev.on("click", function(e) {
					if (self.curIndex > 0) {
						self.slide(self.curIndex - 1);
					} else {
						//alert("前面没有了");
					}
				});
			}
			if (this.next.length > 0) {
				this.next.on("click", function(e) {
					if (self.curIndex < (self.numIndex - 1)) {
						self.slide(self.curIndex + 1);
					} else {
						//alert("后面没有了");
					}
				});
			}
			if (this.tabs.length > 1) {
				this.tabs.bind('click', function() {
					var _this = this,
						index = self.tabs.index(_this);
					clearTimeout(self.timer);
					self.timer = null;
					self.slide(index);
				});
			}
			this.scroll[0].addEventListener('touchstart', function(e) {
				self.touchStart(e);
				e.stopPropagation();
			}, false);
			this.scroll[0].addEventListener('touchmove', function(e) {
				self.touchMove(e);
				e.stopPropagation();
			}, false);
			this.scroll[0].addEventListener('touchend', function(e) {
				self.touchEnd(e);
				e.stopPropagation();
			}, false);
			if(this.auto){
				this.autoplay();
			}
			if (this.drag) {
				this.dragFun('li');
			}
		};
	}
SlideAuto.prototype = {
	autoplay:function(){
		var _this = this;
		_this.timer = setTimeout(function(){
			_this.curIndex = _this.curIndex >= _this.numIndex ? 0 : _this.curIndex+1;
			_this.slide(_this.curIndex);
			_this.autoplay();
		},_this.speed);
	},
	stopplay:function(){
		var _this = this;
		clearTimeout(_this.timer);
	},
	touchStart: function(e) {
		this.isMoving = false;
		var touching = e.touches[0];
		this.startX = touching.pageX;
		this.startY = touching.pageY;
		this.curX = 0;
		this.curY = 0;
		this.touchX = 0;
		this.touchY = 0;
		clearTimeout(self.timer);
		self.timer = null;
	},
	touchMove: function(e) {
		var touching = e.touches[0];
		this.curX = touching.pageX;
		this.curY = touching.pageY;
		this.touchX = this.curX - this.startX;
		this.touchY = this.curY - this.startY;
		if (!this.isMoving) {
			this.isMoveX = Math.abs(this.touchX) > Math.abs(this.touchY);
			this.isMoveY = Math.abs(this.touchX) < Math.abs(this.touchY);
			this.isMoving = true;
			if (this.vertical) {
				if (this.isMoveY) {
					e.preventDefault();
				}
			} else {
				if (this.isMoveX) {
					e.preventDefault();
				}
			}
		} else {
			if (this.vertical) {
				if (this.isMoveY) {
					this.scroll[0].style.top = this.scroll[0].offsetTop + this.touchY / Math.abs(this.touchY) + "px";
					e.preventDefault();
				}
			} else {
				if (this.isMoveX) {
					this.scroll[0].style.left = this.scroll[0].offsetLeft + this.touchX / Math.abs(this.touchX) + "px";
					e.preventDefault();
				}
			}
		}
	},
	touchEnd: function(e) {
		if (!this.isMoving) {
			retrun;
		}
		
		//clearTimeout(self.timer);
		//self.timer = null;
		
		if (this.vertical && this.isMoveY) {
			if (this.touchY > 10) {
				if (this.curIndex <= 0) {
					this.slide(this.curIndex);
					return;
				} else {
					this.slide(this.curIndex - 1);
				}
			} else if (this.touchY < -10) {
				if (this.curIndex == this.numIndex - 1) {
					if (this.loop) {
						this.slide(this.curIndex + 1);
					} else {
						this.slide(this.curIndex);
						return;
					}
				} else {
					this.slide(this.curIndex + 1);
				}
			} else {

			}
		} else if (this.isMoveX) {
			if (this.touchX > 10) {
				if (this.curIndex <= 0) {
					this.slide(this.curIndex);
					return;
				} else {
					this.slide(this.curIndex - 1);
				}
			} else if (this.touchX < -10) {
				if (this.curIndex == this.numIndex - 1) {
					if (this.loop) {
						this.slide(this.curIndex + 1);
					} else {
						this.slide(this.curIndex);
						return;
					}
				} else {
					this.slide(this.curIndex + 1);
				}
			} else {

			}
		}
		
	},
	slide: function(index) {
		var _this = this;
		this.beforeSlide();
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
				//if (!_this.loop) {
					_this.reset(_this.curIndex);
				//}
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
				//if (!_this.loop) {
					_this.reset(_this.curIndex);
				//}
				_this.afterSlide();
			});
			if (index <= 0) {
				_this.prev.addClass("l_ar_none");
			} else if (0 < index < this.numIndex) {
				_this.prev.removeClass("l_ar_none");
			}
			if (index == this.numIndex - 1) {
				_this.next.addClass("r_ar_none");
			} else if (index < this.numIndex - 1) {
				_this.next.removeClass("r_ar_none");
			}
			
		}
		if(_this.auto && _this.timer == null){
			_this.autoplay();
		}
	},
	reset: function(index) {
		this.showTit.html(this.scroll.find('li img').eq(index).attr('title'));
		this.tabs.removeClass("on").eq(index).addClass("on");
	},
	dragFun:function(child){
		var _method=this.scroll,
		    _this = this,
			len=_method.find(child).length,width=_method.find(child).width()+parseInt(_method.find(child).css('border-left-width'))*2+parseInt(_method.find(child).css('padding-left'))*2,
			stopDefault=function(){return false;},
			dragStart=function(e){
				old.l=_method.position().left;
				old.i=Math.abs(parseInt(old.l/width));
				old.x=e.clientX;
				if(_this.timer){_this.stopplay();}
				_method.find('*').unbind('click',stopDefault);
				document.onmousemove=function(e){
					e=window.event||e;
					old.cut=Math.max(Math.min((old.i>0)?width:0,e.clientX-old.x),(old.i<len-1)?-width:0);
					old.newl=Math.min(Math.max(-len*width,old.cut+old.l),0);
					_method.css('left',old.newl);
					_method.find('*').bind('click',stopDefault).each(function(){
						this.ondragstart=function(){return false;};
					});
				}
				document.onmouseup=function(e){
					document.onmousemove='';
					document.onmouseup='';
					if(old.cut!=0){
						var i=old.cut>0?old.i-1:old.i+1;
						_method.unbind('mousedown',dragStart).stop(true,true).animate({'left':Math.min(Math.max(-len*width,-i*width),0)},300,function(){
							_method.bind('mousedown',dragStart);
						});
					}
					_this.curIndex=i;
					_this.reset(i);
					_this.autoplay();
					return false;
				}
				return false;
			}
			old={'l':0,'x':0,'cut':0,'newl':0,'i':0};
		_method.width(len*width).bind('mousedown',dragStart);
	}
}



$.fn.extend({
	showWord:function(str){
		$(this).focus(function(){
			if(str == $(this).val()) $(this).val('');
		})
		$(this).blur(function(){
			if("" == $(this).val()) $(this).val(str);
		})
	},
	upSlider:function(sp,st,o){
		var _method=this,
			c=$(this).find(o).html(),
			ol=$(this).find(o).height();
		$(this).find(o).html(c+c);
		var automove=function(){
			if(_method.height()>parseInt(_method.find(o).css('top'))+ol){
				_method.find(o).css({'top':'0px'});
			}
			var h=parseInt(_method.find(o).css('top'))-_method.height();
			_method.find(o).animate({'top':h+'px'},sp);
		}
		var move=setInterval(function(){automove()},st);
	}
})
