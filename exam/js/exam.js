window.onload=function(){
	
	autoChange();
	//设置轮播图ul列表宽度
	var imglist=document.getElementById("imglist");
	var imgArr=document.getElementsByClassName("lbimg");
	imglist.style.width=1200*imgArr.length+"px";
	
	//设置导航点居中
	var navDiv=document.getElementById("navDiv");
	var outer=document.getElementById("outer");
	navDiv.style.left=((outer.offsetWidth-66)-navDiv.offsetWidth)/2+"px";
	
	//设置a
	var allA=document.getElementsByClassName("a1");
	var index=0;
	
	allA[index].style.opacity="1";
	allA[index].style.borderRadius="40%";
	allA[index].style.width="20px";
	
	for(var i=0;i<allA.length;i++){
		
		allA[i].num=i;
		
		allA[i].onclick=function(){
			
			clearInterval(timer);
			index=this.num;
			
			move(imglist,"left",-1200*index,100,function(){
				autoChange();
			})
			
			setA();
		}
	}
	
	//设置a
	function setA(){
		if(index>=imgArr.length-1){
			index=0;
			imglist.style.left=0;
		}
		
		for(var i=0;i<allA.length;i++){
			allA[i].style.opacity="";
			allA[i].style.borderRadius="";
			allA[i].style.width="";
		}
		allA[index].style.opacity="1";
		allA[index].style.borderRadius="40%";
		allA[index].style.width="20px";
	}
	
	
	//图片自动转换
	var timer;
	function autoChange(){
		timer=setInterval(function(){
			index++;
			index%=imgArr.length;
			move(imglist,"left",-1200*index,30,function(){
				setA();
			})
		},3000)
	}
	
	
	
	//获取样式的方法
	function getStyle(obj, name) {
		if(window.getComputedStyle) {
			//正常浏览器的方式，具有getComputedStyle()方法
			return getComputedStyle(obj, null)[name];
		} else {
			//IE8的方式，没有getComputedStyle()方法
			return obj.currentStyle[name];
		}
	}
	
	
	//移动图片的方法
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
	
	
	var allCo=document.getElementsByClassName("co");
	for(var i=0;i<allCo.length;i++){
		allCo[i].style.height=420/allCo.length+"px";
	}
	
	
	//设置楼梯导航
	
	var allInd=document.getElementsByClassName("ind");
	var index1=0;
	allInd[index1].style.color="";
	
	var ladder=document.getElementById("ladder");
	window.onscroll=function(){
		var st=document.body.scrollTop||document.documentElement.scrollTop;
		/*console.log(st);*/
		
		if(st>=882&&st<1386){
			index1=0;
		}else if(st>=1386&&st<1890){
			index1=1;
		}else if(st>=1890&&st<=2159){
			index1=2;
		}else if(st>2159&&st<2330){
			index1=3;
		}else{
			for(var i=0;i<allInd.length;i++){
				allInd[i].style.color="";
			}
		}
		
		for(var i=0;i<allInd.length;i++){
			allInd[i].style.color="";
		}
		
		allInd[index1].style.color="#00A4FF";
		
		if(st>370&&st<=2355){
			ladder.style.display="inline";
		}else{
			ladder.style.display="none";
		}
	}
	
	//为楼梯导航里的li绑定单击响应函数
	var ind=document.getElementsByClassName("ind");
	ind[0].onclick=function(){
		gun(1131);
	} 
	
	ind[1].onclick=function(){
		gun(1607);
	}
	
	ind[2].onclick=function(){
		gun(2018);
	}
	
	ind[3].onclick=function(){
		gun(2349);
	}
	
	//楼梯导航画面滚动
	function gun(target){
		var st=document.body.scrollTop||document.documentElement.scrollTop;
				var i=st;
				if(i>target){
					var timer2=setInterval(function(){
				
						window.scrollTo(0,i-=30);
						if(i<=target){
							window.scrollTo(0,target);
							clearInterval(timer2);
						}
					},1);
				}else if(i<target){
					var timer2=setInterval(function(){
				
						window.scrollTo(0,i+=30);
						if(i>=target){
							window.scrollTo(0,target);
							clearInterval(timer2);
						}
					},1);
				}		
	}
	
		
	
	function toggleMenu(obj){
					//在切换类之前，获取元素的高度
					var begin = obj.offsetHeight;
					
					//切换parentDiv的显示
					toggleClass(obj , "collapsed");
					
					//在切换类之后获取一个高度
					var end = obj.offsetHeight;
					
					//console.log("begin = "+begin +" , end = "+end);
					//动画效果就是将高度从begin向end过渡
					//将元素的高度重置为begin
					obj.style.height = begin + "px";
					
					//执行动画，从bengin向end过渡
					move(obj,"height",end,50,function(){
						//动画执行完毕，内联样式已经没有存在的意义了，删除之
						obj.style.height = "";
					});
						
				}
	
	function toggleClass(obj, cn) {

		//判断obj中是否含有cn
		if(hasClass(obj, cn)) {
			//有，则删除
			removeClass(obj, cn);
		} else {
			//没有，则添加
			addClass(obj, cn);
		}

	}
	
	function addClass(obj, cn) {

		//检查obj中是否含有cn
		if(!hasClass(obj, cn)) {
			obj.className += " " + cn;
		}

	}

	/*
	 * 判断一个元素中是否含有指定的class属性值
	 * 	如果有该class，则返回true，没有则返回false
	 * 	
	 */
	function hasClass(obj, cn) {
	
		//判断obj中有没有cn class
		//创建一个正则表达式
		//var reg = /\bb2\b/;
		var reg = new RegExp("\\b" + cn + "\\b");
	
		return reg.test(obj.className);
	
	}

	/*
	 * 删除一个元素中的指定的class属性
	 */
	function removeClass(obj, cn) {
		//创建一个正则表达式
		var reg = new RegExp("\\b" + cn + "\\b");
	
		//删除class
		obj.className = obj.className.replace(reg, "");
	
	}
	
		var search=document.getElementById("seartext");
		var menu=document.getElementsByClassName("menu");
		
		search.onfocus=function(){
			toggleMenu(menu[0],"collapsed");
		}
	
		search.onblur=function(){
			var timer1=setTimeout(function(){
				toggleMenu(menu[0],"collapsed");
			},80);
		}
		
		
		//设置登录和注册
		var allSpanbtn=document.getElementsByClassName("spanbtn");
		var rl=document.getElementById("rl");
		var index2=0;
		allSpanbtn[index2].style.borderBottom="1px #00A4FF solid";
		allSpanbtn[index2].style.color="#00A4FF";
		for(var i=0;i<allSpanbtn.length;i++){
			allSpanbtn[i].num=i;
			allSpanbtn[i].onclick=function(){
				
				index2=this.num;
				/*console.log(index2);*/
				move(rl,"left",-360*index2,30,function(){
					
				})
				
				setallspan();
			}
		}
		//登录与注册的span
		function setallspan(){
			for(var j=0;j<allSpanbtn.length;j++){
					allSpanbtn[j].style.borderBottom="";
					allSpanbtn[j].style.color="";
					
				}
				allSpanbtn[index2].style.borderBottom="1px #00A4FF solid";
				allSpanbtn[index2].style.color="#00A4FF";
		}
		
		//设置登录注册框的显示与消失
		var rlclose=document.getElementById("rlclose");
		var signup=document.getElementById("signup");
		var modelbg=document.getElementById("modelbg");
		rlclose.onclick=close;
		
		var log=document.getElementById("log");
		var sig=document.getElementById("sig");
		var btn2=document.getElementById("btn2");
		
		//登录按钮
		btn2.onclick=function(){
			show();
			index2=0;
			move(rl,"left",-360*index2,30,function(){
					
				})
			setallspan();
		}
		log.onclick=function(){
			show();
			index2=0;
			move(rl,"left",-360*index2,30,function(){
					
				})
			setallspan();
		}
		
		//注册按钮
		sig.onclick=function(){
			show();
			index2=1;
			move(rl,"left",-360*index2,30,function(){
					
				})
			setallspan();
		}
		
		//登录框及其背景的关闭
		function close(){
			signup.style.display="none";
			modelbg.style.display="none";
		}
		
		//登录框极其背景的显示
		function show(){
			signup.style.display="inline";
			modelbg.style.display="inline";
		}
		
		//设置登录前与登录后
		var btn3=document.getElementById("btn3");
		var btn4=document.getElementById("btn4");
		var unlogin=document.getElementById("unlogin");
		var logined=document.getElementById("logined");
		var loginfo=document.getElementById("loginfo");
		var text1=document.getElementById("text1");
		var text2=document.getElementById("text2");
		var text3=document.getElementById("text3");
		var text4=document.getElementById("text4");
		var agreement=document.getElementById("agreement");
		var autosign=document.getElementById("auto-signin");
		var user="";
		var passwo="";
		
		var phoneReg=/^1[3|4|5|8][0-9]{9}$/;
		var passwordReg=/^(\w){6,20}$/;
		
		/*console.log(passwordReg.test("123456_"));*/
		
		btn3.onclick=function(){
			if(text1.value==""){
				alert("请输入登录手机号");
			}else if(!phoneReg.test(text1.value)){
				alert("请输入正确的手机号");
			}else if(text2.value==""){
				alert("请输入密码");
			}else if(!passwordReg.test(text2.value)){
				alert("只能输入6-20位数字、字母、下划线")
			}else if(text1.value!=user||text2.value!=passwo){
				alert("用户名或密码不正确！");
			}else{
				unlogin.style.display="none";
				logined.style.display="block";
				loginfo.style.display="block";
				close();
			}
		}
		
		btn4.onclick=function(){
			if(text3.value==""){
				alert("请输入注册手机号");
			}else if(!phoneReg.test(text3.value)){
				alert("请输入正确的手机号");
			}else if(text4.value==""){
				alert("请输入密码");
			}else if(!passwordReg.test(text4.value)){
				alert("只能输入6-20位数字、字母、下划线")
			}else if(agreement.checked!=true){
				alert("未同意协议不可注册");
			}else{
				user=text3.value;
				passwo=text4.value;
				/*alert(user);*/
				alert("注册成功！");
				text3.value="";
				text4.value="";
				close();
			}
		}
		
		
		//设置搜索框里的文字
		var seartext=document.getElementById("seartext");
		var btn=document.getElementById("btn");
		
		//历史搜索
		var history=document.getElementById("history");
		btn.onclick=add;
		
		function add(){
			var a=document.createElement("a");
			a.className="historya";
			a.href="javascript:;";
			a.innerHTML=seartext.value;
			a.onclick=function(){
				seartext.value=a.innerHTML;
			};
			var li=document.createElement("li");
		
				li.appendChild(a);
				history.insertBefore(li,history.firstChild);
		
		}
		
		/*function judgeRepeat(searchValue){
			for(var i in history){
				history.children[i].num=i;
				alert(history.children[this.num].innerText);
				if(searchValue==history.children[this.num].innerText)
				return true;
			}
		}*/
		
		
		//热门搜索
		var allHotA=document.getElementsByClassName("hota");
		for(var i=0;i<allHotA.length;i++){
			allHotA[i].num=i;
			allHotA[i].onclick=function(){
				seartext.value=allHotA[this.num].innerHTML;
				for(var i=0;i<history.children.length;i++){
					if(seartext.value==history.children[i].innerText){
						return;
					}
				}
				add();
			};
			
		}
		
		var clear=document.getElementById("clear");
		
		clear.onclick=function(){
			/*alert(history.children.length);*/
			
			/*for(var i in history){
				history.removeChild(history.firstChild);
			}*/
			history.innerHTML="";
		}
			
}


