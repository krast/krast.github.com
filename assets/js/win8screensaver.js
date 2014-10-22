/*///////////////////////////////////////////
作者：幻想
Blog:http://huanxiangspace.diandian.com/
//////////////////////////////////////////*/
var w8sc_stime;
function win8screensaver(info){
	var p1=0,start=0,image="http://m2.img.libdd.com/farm4/2012/1005/15/C1C34C8B2F8A650A808F8FFAD956A8B138A80D05049E_1200_777.JPEG",message="Welcome!";
	if(info!=null){
		image=info.img!=null?info.img:"http://m2.img.libdd.com/farm4/2012/1005/15/C1C34C8B2F8A650A808F8FFAD956A8B138A80D05049E_1200_777.JPEG";
		message=info.msg!=null?info.msg:"Welcome!";
	}
	$("body").prepend("<div class=\"screensaver\" style=\"background-color:#FFF;\"><img id=\"screenimg\" src=\""+image+"\" width=\"100%\" height=\"100%\"><div class=\"screenwork\"><div id=\"screentime\">12:12</div><div id=\"screendate\">10月5日, 星期五</div><div id=\"screennotes\"><span class=\"screennotes\">"+message+"</span></div></div><div class=\"screenface\" title=\"向上滑动解锁\"></div></div>");
	screentime();
	$(".screensaver").mousedown(function(e){
		p1=e.clientY;
		start=1;
		return false;
	});
	$(".screensaver").mousemove(function(e){
		if(start==1){
			var movey=e.clientY-p1;
			if(movey>0)
				movey=0;
			$(".screensaver").css("top",movey+"px");
		}
		return false;
	});
	$(".screensaver").mouseup(function(e){
		start=0;
		var movey=e.clientY-p1;
		if(movey>-200)
			$(".screensaver").animate({top:"0px"});
		else{
			$(".screensaver").animate({top:"-"+(screen.height+10)+"px"});
			clearTimeout(w8sc_stime);
		}
		return false;
	});	
	$(".screensaver").mouseout(function(){
		if(start==1){
			start=0;
			$(".screensaver").animate({top:"-"+(screen.height+10)+"px"});
			clearTimeout(w8sc_stime);
		}
	});
}

function screentime(){
	var now=new Date;
	var m=now.getMonth()+1;
	var d=now.getDate();
	var dy=now.getDay();
	var week=["日","一","二","三","四","五","六"];
	var h=now.getHours();
	h=h<10?"0"+h:h;
	var ms=now.getMinutes();
	ms=ms<10?"0"+ms:ms;
	$("#screentime").html(h+":"+ms);
	$("#screendate").html(m+"月"+d+"日, 星期"+week[dy]);
	w8sc_stime=setTimeout("screentime()", 300);
}

var mouseEventTypes = {
	touchstart : "mousedown",
	touchmove : "mousemove",
	touchend : "mouseup"
};

for (originalType in mouseEventTypes) {
	document.addEventListener(originalType, function(originalEvent) {
		event = document.createEvent("MouseEvents");
		touch = originalEvent.changedTouches[0];
		event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
		window, 0, touch.screenX, touch.screenY, touch.clientX,
		touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
		touch.metaKey, 0, null);
		originalEvent.target.dispatchEvent(event);
		});
}
