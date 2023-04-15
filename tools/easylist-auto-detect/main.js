"use strict";
function pause(time){
    return new Promise((resolve,reject) => {
        window.setTimeout(resolve,time)
    })
}

document.getElementById("run").addEventListener("click",async () => {
const testingelm = document.getElementById("testingelm");
const dataset = await (await fetch("https://raw.githubusercontent.com/easylist/easylist/master/easylist/easylist_general_hide.txt")).text();
const datasetlines = dataset.split("\n");
let allids = [];
for(let i = 0; i < datasetlines.length;i++){
    if(datasetlines[i].startsWith("###") && datasetlines[i].includes(">") === false && datasetlines[i].includes("[") === false){
        var tmpid = datasetlines[i].split("###")[1].replace(/:not\(.*\)/,"");
        allids.push(tmpid);
        var tmpelm = document.createElement("div");
        tmpelm.textContent = "Didn't filter " + tmpid;
        tmpelm.id = tmpid;
        testingelm.appendChild(tmpelm);
    }
};
await pause(10);
var totaldetected = 0;
for(let i2 = 0; i2 < allids.length;i2++){
    var currenttestid = allids[i2];
    var currentelm = document.getElementById(currenttestid);
    if(window.getComputedStyle(currentelm).display === "none"){
        totaldetected += 1;
    }
}
document.getElementById("result").textContent = `${totaldetected} elements were hidden by a content blocker. ${(totaldetected/allids.length)*100}% likelyhood of EasyList generic cosmetic filtering`
})
