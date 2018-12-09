window.onload=function(){
	
	
	function text(arr,item){
		for(var i=0;i<arr.length;i++){
		if(arr[i]==item){
			console.log(i);
		}
	}
	}
	var item=5;
	var items=[1,2,3,4,5];
	text(items,item);
}
