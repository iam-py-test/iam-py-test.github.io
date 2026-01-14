"use strict";
function tryDecode(data){
    let found = {};
    try{
        base64_decoded = atob(data)
        if(base64_decoded != "" && base64_decoded != data){
            found['base64'] = base64_decoded
        }
    }
    catch(err){}
    try{
        uridecoded = decodeURIComponent(data)
        if(uridecoded !== data && uridecoded !== ""){
            found['uriencoded'] = uridecoded
        }
    }
    catch(err){}
    try{
        timestamp = new String(new Date(new Number(data)));
        found['timestamp'] = timestamp
    }
    catch(err){}
    return found;
}

var parseQuery = function(){
    var url = document.getElementById("url").value;
    var uparsed = new URL(url);
    var output = document.getElementById("output");
    output.textContent = "";
    uparsed.searchParams.forEach(function(value,name){
        var param = document.createElement("span");
        param.innerText = `${name}: ${value}\n`;
        let decodedParam = tryDecode(value);
        let decodedParamElm = document.createElement('ul')
        Object.keys(decodedParam).forEach((result) => {
            let decodedParamResultElm = document.createElement('li');
            decodedParamResultElm.textContent = `${result}: ${decodedParam[result]}`
            decodedParamElm.appendChild(decodedParamResultElm)
        })
        if(Object.keys(decodedParam).length > 0){
            param.appendChild(decodedParamElm)
        }
        output.appendChild(param);
    })
}

document.getElementById("url").onchange = parseQuery;