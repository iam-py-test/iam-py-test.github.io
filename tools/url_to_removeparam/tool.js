"use strict";

var urlsTextarea = document.getElementById("urls");
var options = {
	"cleanWWW":false
}

var convertURL = function(url){
	var urlObj = new URL(url);
	var domain = urlObj.hostname;
	var end = [];
	var searchParamKeys = urlObj.searchParams.keys();
	var tmprule = "";
	var nextResult = searchParamKeys.next()
	while(nextResult.done === false){
		console.log(nextResult)
		tmprule = `||${domain}^$removeparam=${nextResult.value}`
		end.push(tmprule)
		nextResult = searchParamKeys.next()
	}
	
	return end.join("\n")
}

var convertAll = function(){
	var output = document.getElementById("out");
	var allUrls = urlsTextarea.value;
	var urlsArray = allUrls.split("\n");
	var endRules = "";
	for(let i = 0; i < urlsArray.length;i++){
		endRules += convertURL(urlsArray[i]) + "\n";
	}
	output.value = endRules
}

urlsTextarea.onchange = convertAll