"use strict";
try{
	fetch("test.txt?utm_source=test&nontracker=1").then(function(res){
		var resURL = new URL(res.url)
		if(resURL.searchParams.has("utm_source")){
 var r = document.createElement('p')
		r.textContent = 'Requests with tracking parameters are not being filtered'
		r.style = 'color:#cf0000;'
		document.getElementById('result').appendChild(r)
return
		}
		if(resURL.searchParams.has("utm_source") === false & resURL.searchParams.get("nontracker") === '1'){
 var r = document.createElement('p')
		r.textContent = 'Requests with tracking parameters are being filtered'
		r.style = 'color:green;'
		document.getElementById('result').appendChild(r)
return
		}
		 if(resURL.searchParams.has("utm_source") === false & resURL.searchParams.has("nontracker") === false){
 var r = document.createElement('p')
		r.textContent = 'All parameters are being removed. This may break websites'
		r.style = 'color:#cf0000;'
		document.getElementById('result').appendChild(r)
return
		}
		
	}).catch(function(){
		var r = document.createElement('p')
		r.textContent = 'Requests with tracker parameters are being blocked'
		r.style = 'color:#cf0000;'
		document.getElementById('result').appendChild(r)
	})
}
catch(err){
}

try{
	window.setTimeout(function(){
		//make sure the other fetch request has already gone through or failed
	fetch("/test.txt").catch(function(){
		document.getElementById('result').textContent = "Unable to load test file. Please modify the settings in your content blocker to allow https://iam-py-test.github.io/tools/test.txt"
	})
	},10)
}
catch(err){
	document.getElementById('result').textContent = "Unable to preform test. Please verify you are using an up-to-date browser"
}