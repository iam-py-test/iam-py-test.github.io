"use strict";

/* helper functions */
function safeJSONparse(data,defaultdata={}){
    try{
        var parseddata = JSON.parse(data);
        if(typeof parseddata != "object" || parseddata == null){
            return defaultdata;
        }
        return parseddata;
    }
    catch {
        return defaultdata;
    }
}

var inputTextarea = document.getElementById("in");
var outoutTextarea = document.getElementById("out");
var optionsBox = document.getElementById("optionsbox");
var defaultdomain = document.getElementById("defdomain");
var convertbutton = document.getElementById("convertbutton");
convertbutton.addEventListener("click",function(e){
    var inputtext = inputTextarea.value;
    var selectedparsetype = optionsBox.value;
    var outputtext = "";
    if(selectedparsetype === "JSON"){
        var parsedasJSON = safeJSONparse(inputtext,[]);
        console.log(parsedasJSON);
        for(let i = 0; i < parsedasJSON.length;i++){
            outputtext += `${defaultdomain.value}$removeparam=${parsedasJSON[i]}\n`
        }
    }
    if(selectedparsetype === "newline"){
        var parsednewline = inputtext.split("\n");
        for(let i = 0; i < parsednewline.length;i++){
            outputtext += `${defaultdomain.value}$removeparam=${parsednewline[i]}\n`
        }
    }
    if(selectedparsetype === "comma_newline"){
        var parsednewline = inputtext.split("\n");
        let currentline = "";
        for(let i = 0; i < parsednewline.length;i++){
            currentline = parsednewline[i];
            if(currentline.endsWith(",")){
                currentline = currentline.replaceAll(",","")
            }
            outputtext += `${defaultdomain.value}$removeparam=${currentline}\n`
        }
    }
    outoutTextarea.value = outputtext;
})