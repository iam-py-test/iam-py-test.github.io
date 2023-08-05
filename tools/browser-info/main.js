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

const getElmById = document.getElementById.bind(document);
const createElm = document.createElement.bind(document)
const user_agent = getElmById("ua");
const user_agent_worker = getElmById("worker");
const user_agent_iframe = getElmById("iframe");
const ua_nav = navigator.userAgent;

user_agent.textContent = ua_nav;

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
        log(msg);
        var cmd = msg.data.cmd;
        var res = msg.data.msg;
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
