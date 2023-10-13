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
};

window.onmessage = function(event){
    log(event)
    if(typeof event.data !== "object"){
        return
    };
    var res = "";
    if(event.data.cmd === "get_ua"){
        res = navigator.userAgent;
    }
    if(event.data.cmd === "get_lang"){
        res = navigator.language;
    }
    log(res)
    window.top.postMessage({"cmd": event.data.cmd, "res": res});
};
