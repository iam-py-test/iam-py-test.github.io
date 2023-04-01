"use strict";
var undefang = function(url){
    /*
    this function takes in a defanged URL (hxxpx[://]example[.]com) or defanged domain (example[.]com) and returns an undefanged URL

    */
    var endresult = url
    .replace("[.]",".")
    .replace(/\[\:\/\/\]/g,"://")
    .replace("[:]//","://")
    .replace("hxxpx:/","https:/")
    .replace("hxxp:/","http:/")
   
   console.log(url,endresult);
   return endresult;

}

var processurls = function(){
    var end = [];
    var allurls = document.getElementById("urls").value.split("\n");
    for(let i = 0; i < allurls.length;i++){
        end.push(undefang(allurls[i]));
    }
    console.log(end,allurls);
    document.getElementById("o").innerText = end.join("\n");
}
document.getElementById("urls").addEventListener("change",processurls);
