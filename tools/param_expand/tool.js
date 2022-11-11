"use strict";
var parseQuery = function(){
    var url = document.getElementById("url").value;
    var uparsed = new URL(url);
    var output = document.getElementById("output");
    output.textContent = "";
    uparsed.searchParams.forEach(function(value,name){
        var param = document.createElement("span");
        param.innerText = `${name}: ${value}\n`;
        output.appendChild(param);
    })
}

document.getElementById("url").onchange = parseQuery;