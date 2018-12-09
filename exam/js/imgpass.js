window.onload=function(){	
	//start autoChange
	autoChange();
	//get imglist
	var imgList=document.getElementById("imgList");		
	//get all img
	var imgArr=document.getElementsByTagName("img"); 
	//set imglist width otherwise float doesnt wrok
	imgList.style.width=520*imgArr.length+"px";
	
	
	var navDiv=document.getElementById("navDiv");
	
	var outer=document.getElementById("outer");
	
	navDiv.style.left=(outer.offsetWidth-navDiv.offsetWidth)/2+"px";
	
	var allA=document.getElementsByTagName("a");
	var index=0;
	allA[index].style.backgroundColor="black";
	
	for(var i=0;i<allA.length;i++){
		
		allA[i].num=i;
		
		allA[i].onclick=function(){
			
			clearInterval(timer);
			index = this.num;
			move(imgList,"left",-520*index,20,function(){
				autoChange();
			})
			setA();
		}
	}
	
	function setA(){
		if(index>=imgArr.length-1){
			index=0;
			imgList.style.left=0;
		}
		
		for(var i=0;i<allA.length;i++){
			allA[i].style.backgroundColor="";
		}
		allA[index].style.backgroundColor="black";
	}
	

	
	var timer;
	
	function autoChange(){
		
		timer=setInterval(function(){
			index++;
			index%=imgArr.length;
			move(imgList,"left",-520*index,20,function(){
				setA();
			})
		},3000)
	}
	
	
	
	
	function getStyle(obj, name) {
		if(window.getComputedStyle) {
			//正常浏览器的方式，具有getComputedStyle()方法
			return getComputedStyle(obj, null)[name];
		} else {
			//IE8的方式，没有getComputedStyle()方法
			return obj.currentStyle[name];
		}
	}
	
	function move(obj,attr,target,speed,callback){
		clearInterval(obj.timer);
		var current=parseInt(getStyle(obj,attr));
		
		if(current>target){
			speed=-speed;
		}
		
		obj.timer=setInterval(function(){
			
			var oldValue=parseInt(getStyle(obj,attr));
			
			var newValue=oldValue +speed;
			
			if((speed<0&&newValue<target)||(speed>0&&newValue>target)){
				newValue=target;
			}
			
			obj.style[attr]=newValue+"px";
			
			if(newValue==target){
				clearInterval(obj.timer);
				callback&&callback();
			}
		},30)
	}
	
	
}
