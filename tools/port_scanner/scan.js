"use strict";

const DEFAULT_PORT = 200;
const MIN_PORT = 1; // change to something higher if you want to scan ports only above a number, i.e. 2000

const portsdetectedelm = document.getElementById("portsdetected");
const portsscannedelm = document.getElementById("numports");

var log = function(m,ok){
    var e = document.createElement("span")
    e.innerText = m
    if(ok === true){
        e.style.color = "green"
    }
    else{
        e.style.color = "red"
    }
    document.getElementById("log").appendChild(e)
    document.getElementById("log").appendChild(document.createElement("br"))
}

var test = async function(port){
    var det = false
    try{
        await fetch("http://localhost:" + port,{mode:"no-cors"})
        window.detectedon.push(port)
        console.log("Detected on port " + port, false)
        log(`Detected on ${port}`,false)
        det = true
    }
    catch(err){
        console.log("Not detected on port " + port,true)
        log(`Not detected on ${port}`,true)
        det = false
    }
    window.total[port] = det
    window.total.length += 1
    window.totalscanned += 1
    portsdetectedelm.textContent = window.detectedon.join(" , ");
    portsscannedelm.textContent = window.totalscanned;
}

function getMaxNumber(){
    try{
        var inputtednumber = new Number(document.getElementById("max").value);
        if(inputtednumber === null || Number.isNaN(inputtednumber+0)){
            return DEFAULT_PORT
        }
        else{
            return inputtednumber
        }
    }
    catch(err){ /*if it isn't a valid number, return the default value*/
    return DEFAULT_PORT
    }
}

document.getElementById("start").onclick = async function(){
    window.detectedon = []
    window.total = {}
    window.total.length = 0
    window.resp = false
    window.totalscanned = 0;
    for(window.p = MIN_PORT; window.p <= getMaxNumber(); window.p ++){
        try{
            test(p);
        }
        catch(err){
            console.log("Error in running test: ",err)
        }

    }
}
