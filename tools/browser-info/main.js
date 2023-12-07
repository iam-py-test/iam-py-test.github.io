"use strict";
const log = (...msg) => {
    let context = "main";
    if(typeof window === "undefined"){
        context = "worker";
    }
    else{
        if(window.top !== window.self){
            context = "iframe";
        }
    }
    console.log.call(console,`[${context || "main"}]`, ...msg);
}

const FUNC_TO_TEST = ["alert", "print", "open", "close", "atob"];

var getElmById = document.getElementById.bind(document);
var createElm = document.createElement.bind(document)
var user_agent = getElmById("ua");
var user_agent_worker = getElmById("ua_worker");
var user_agent_iframe = getElmById("ua_iframe");
var ua_nav = navigator.userAgent;
var toStringE = getElmById("tostring");

user_agent.textContent = ua_nav;
toStringE.textContent = (alert.toString().includes("\n")) ? "Firefox" : "Chromium"

for(let i = 0; i < FUNC_TO_TEST.length; i++){
    let cfunc = FUNC_TO_TEST[i];
    let functestelm = document.getElementById("functostr");
    let funcelm = document.createElement("p");
    try{
        let funcstr = undefined;
        if(window[cfunc]){
            funcstr = new String(window[cfunc]).replaceAll(" ","").replaceAll("\n","").replaceAll("\t","");
        }
        let should_funcstr = `function${cfunc}(){[nativecode]}`
        funcelm.textContent = `${cfunc}: ${(funcstr === should_funcstr) ? "OK" : "Altered"}`;
    }
    catch(err){
        funcelm.textContent = `${cfunc}: Error accessing`
    }
    functestelm.appendChild(funcelm);
}

// get user agent from iframe
var iframe = createElm("iframe");
iframe.src = "iframe.html";
iframe.hidden = true;
window.onmessage = function(event){
    log(event);
    user_agent_iframe.textContent = event.data.res
}
document.body.appendChild(iframe);
iframe.contentWindow.addEventListener("load", () => {
    iframe.contentWindow.postMessage({"cmd": "get_ua"})
})

// get user agent from worker
try{
    var worker = new Worker("worker.js");
        worker.onmessage = (msg) => {
        //log(msg);
        var cmd = msg.data.cmd;
        var res = msg.data.res;
        console.log(cmd, res)
        if(cmd === "get_ua"){
            user_agent_worker.textContent = res;
        };
        if(cmd === "get_lang"){
            
        }
    }
    worker.postMessage({"cmd": "get_ua"});
}
catch(err){
    log(err);
    user_agent_worker.textContent = "Could not load worker!"
    user_agent_worker.style.color = "red";
}
