"use strict";
const PAUSE_TIME = 3600;
const EASYLIST_URL = "https://raw.githubusercontent.com/easylist/easylist/master/easylist/easylist_general_hide.txt";

function pause(time){
    return new Promise((resolve,reject) => {
        window.setTimeout(resolve,time)
    })
}

document.getElementById("run").addEventListener("click",async () => {
    const testingelm = document.getElementById("testingelm");
    const resultelm = document.getElementById("result");
    try{
        var dataset = await (await fetch(EASYLIST_URL)).text();
    }
    catch(err){
        resultelm.textContent = "Failed to load EasyList list: " + err
        return;
    }
    const datasetlines = dataset.split("\n");
    let allids = [];
    testingelm.textContent = "";
    for(let i = 0; i < datasetlines.length;i++){
        if(datasetlines[i].startsWith("###") && datasetlines[i].includes(">") === false && datasetlines[i].includes("[") === false && datasetlines[i].includes(".") === false){
            var tmpid = datasetlines[i].split("###")[1].replace(/:not\(.*\)/,"");
            allids.push(tmpid);
            var tmpelm = document.createElement("div");
            tmpelm.textContent = "Didn't filter " + tmpid;
            tmpelm.id = tmpid;
            testingelm.appendChild(tmpelm);
        }
    };
    // longer time may be needed to allow for content blockers to have time to hide all the elements - this prevents you from sometimes getting low detection even when EasyList is on 
    await pause(PAUSE_TIME);
    var totaldetected = 0;
    for(let i2 = 0; i2 < allids.length;i2++){
        var currenttestid = allids[i2];
        var currentelm = document.getElementById(currenttestid);
        if(window.getComputedStyle(currentelm).display === "none"){
            totaldetected += 1;
        }
    }
    resultelm.textContent = `${totaldetected} elements were hidden by a content blocker. ${(totaldetected/allids.length)*100}% likelyhood of EasyList generic cosmetic filtering`
})
