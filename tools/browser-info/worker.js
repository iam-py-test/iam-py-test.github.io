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

addEventListener("message", (event) => {
    //log(event);
    if(event.origin != window.origin){
        console.warn(`Possible spoofed message from ${event.origin}`);
        return;
    }
    if(typeof(event.data) !== "object"){
        log("Wanted object, got ", event.data)
        return
    }
    var res = "";
    var cmd = event.data.cmd;
    if(cmd === "get_ua"){
        res = navigator.userAgent;
    };
    if(cmd === "get_lang"){
        res = navigator.language;
    }
    //log(res)
    postMessage({"cmd": cmd, "res": res});
});
