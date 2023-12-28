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

function get_canvas(){
    try{
        let canvas = document.createElement("canvas");
        if(!canvas.getContext){
            return "nogetContext";
        }
        let context = canvas.getContext("2d");
        context.fillText(0,0,"Test");
        context.fill()
        if(!canvas.toDataURL){
            return "notoDataURL";
        }
        return canvas.toDataURL()
    }
    catch(err){
        return new String(err)
    }
}

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
    if(event.data.cmd === "get_canvas"){
        res = get_canvas()
    }
    log(res)
    window.top.postMessage({"cmd": event.data.cmd, "res": res});
};
