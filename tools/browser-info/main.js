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

async function getHash(str, algo){
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#examples
    let textEnc = new TextEncoder();
    let encoded = textEnc.encode(str);
    console.log(encoded, algo)
    let hash_arr = await crypto.subtle.digest(algo, encoded);
    let hash_byte_arr = Array.from(new Uint8Array(hash_arr));
    let hash_hex = hash_byte_arr
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
    return hash_hex;
}

/* used in real anti-blocker */
function isProxy(item){
    try{
        return item.caller || true
    }
    catch(err){
        return err.toString().includes("get caller method called on incompatible Proxy")
    }
}

const FUNC_TO_TEST = ["alert", "print", "open", "close", "atob", "btoa", "prompt"];
const ERROR_TO_TEST = ["InternalError", "SyntaxError", "RangeError", "ReferenceError", "TypeError", "URIError", "Error", "DOMException", "EvalError", "AggregateError"];

(async function(){
    let error_hash_elm = document.getElementById("error_hashes");
    ERROR_TO_TEST.forEach(async (err_name) => {
        if(!window[err_name]){
            let errordata_elm = document.createElement("p");
            errordata_elm.textContent = `${err_name}: Error not supported`
            error_hash_elm.appendChild(errordata_elm);
            return;
        }
        try{
            throw new window[err_name]("Browsers hid the facts");
        }
        catch(error_data){
            if(error_data instanceof window[err_name] === false){
                let errordata_elm = document.createElement("p");
                errordata_elm.textContent = `${err_name}: Failed to check`
                error_hash_elm.appendChild(errordata_elm);
                return;
            };
            let errdata_hash = await getHash(new String(error_data), "SHA-256");
            let errordata_elm = document.createElement("p");
            errordata_elm.textContent = `${err_name}: ${errdata_hash}`
            error_hash_elm.appendChild(errordata_elm);
        }
    })
})()

var getElmById = document.getElementById.bind(document);
var createElm = document.createElement.bind(document)
var user_agent = getElmById("ua");
var user_agent_worker = getElmById("ua_worker");
var user_agent_iframe = getElmById("ua_iframe");
var ua_nav = navigator.userAgent;
var toStringE = getElmById("tostring");

try{
    user_agent.textContent = ua_nav;
    toStringE.textContent = ((String.toString).toString().includes("\n")) ? "Firefox" : "Chromium"
}
catch(err){}


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
        let is_proxy = isProxy[window[cfunc]]
        funcelm.textContent = `${cfunc}: ${(funcstr === should_funcstr) ? "OK" : "Altered"}` + (is_proxy) ? " (proxied)" : "";
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
    if(event.data.cmd == "get_ua"){
        user_agent_iframe.textContent = event.data.res
    }
    if(event.data.cmd == "get_canvas"){
        window.iframe_canvas = event.data.res;
        document.getElementById("iframe_canvas_img").src = window.iframe_canvas;
        window.main_canvas = get_canvas();
        document.getElementById("main_canvas_img").src = window.main_canvas;
        if(window.main_canvas === window.iframe_canvas){
            document.getElementById("diff_canvas").textContent = "Identical"
        }
        else{
            document.getElementById("diff_canvas").textContent = "No match"
        }
    }
}
document.body.appendChild(iframe);
iframe.contentWindow.addEventListener("load", () => {
    iframe.contentWindow.postMessage({"cmd": "get_ua"});
    iframe.contentWindow.postMessage({"cmd": "get_canvas"})
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



