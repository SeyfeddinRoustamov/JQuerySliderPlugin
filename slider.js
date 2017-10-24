
	(function($){
		$.fn.mySlider=function(options){
			var settings={speed:500,auto:0};
			if(options){$.extend(settings,options);}
			return this.each(function(){
				var $this=$(this);
				var $childrens=$this.children();
				var itemsTotal=$childrens.length;
				var running=false;
				var timeout=null;
				var running=false;
				var stop=false;
				$this.css({'display':'block','position':'relative','overflow':'hidden'});
				$childrens.css({'display':'block','position':'absolute','top':0,'left':0,'width':'100%','height':'100%','box-sizing':'border-box'}).eq(0).addClass('current').siblings().removeClass('current').css({'opacity':0,'left':'-100%'})
				if(itemsTotal<=1)return;
				var nav='<div class="nav"><span class="current"></span>';
				for(var i=itemsTotal-1;i--;){nav+='<span></span>';};
				$this.append(nav+'</div>');
				$this.append('<div class="prev"><i class="fa fa-chevron-left"></i></div><div class="next"><i class="fa fa-chevron-right"></i></div>');
				$this.on('click','.prev',function(){prev();});
				$this.on('click','.next',function(){next();});
				$this.on('click','.nav span',function(){
					if(!$(this).hasClass('current')){slide($(this).index())}
				});
				var touchstart;
				$this.on('touchstart',function(e){touchstart=e.touches[0].pageX;});
				$this.on('touchmove',function(e){
					if(touchstart-e.touches[0].pageX>44)next();
					if(touchstart-e.touches[0].pageX<-44)prev();
				});
				if(settings.auto>1000){
					auto();
					$this.on('mouseenter touchstart',function(){stop=true;});
					$this.on('mouseleave touchend',function(){stop=false;auto();});
				}
				if(settings.auto>1000)auto;
				function next(){slide($childrens.filter('.current').index()+1);}
				function prev(){slide($childrens.filter('.current').index()-1);}
				function slide(ind){
					var index=ind;
					var $current=$childrens.filter('.current');
					if(index>=itemsTotal)index=0;
					if(index<0)index=itemsTotal-1;
					if(running)return false;
					running=true;
					$this.addClass('disabled');
					stop=true;
					$this.find('.nav span').eq(index).addClass('current').siblings().removeClass('current');
					if(index>$current.index()){
						$current.animate({'left':'-100%','opacity':0},{queue:false,duration:settings.speed,complete:function(){
							if(settings.auto>1000){
								stop=false;
								auto();
							}
							running=false;
							$this.removeClass('disabled');
						}}).removeClass('current');
						$childrens.eq(index).css({'left':'100%'}).animate({'left':0,'opacity':1},{queue:false,duration:settings.speed}).addClass('current');
					}else{
						$current.animate({'left':'100%','opacity':0},{queue:false,duration:settings.speed}).removeClass('current');
						$childrens.eq(index).css({'left':'-100%'}).animate({'left':0,'opacity':1},{queue:false,duration:settings.speed,complete:function(){
							if(settings.auto>1000){
								stop=false;
								auto();
							}
							running=false;
							$this.removeClass('disabled');
						}}).addClass('current');
					}
					return false;
				}
				function auto(){
					clearTimeout(timeout);
					if(stop)return;
					timeout=setTimeout(function(){
						if(stop)return;
						next();
						auto();
					},settings.auto);
				};
			});
		}
	})(jQuery);
