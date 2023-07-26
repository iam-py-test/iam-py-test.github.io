"use strict";
const ALLOWED_PROTOCOLS = ["http:","https:"];
const FIND_URLS_IN_PATH = /https?:%2F%2[^\/]*/;

function returnBase64if(text){
    try{
        const decoded = atob(text);
        if(decoded){
            return decoded;
        }
        return null;
    }
    catch(err){
        return null;
    }
}

function isURIencoded(text){
    try{
        const decoded = decodeURIComponent(text);
        return (decoded && decoded !== text);
    }
    catch(err){
        return false;
    }
}

function isvalidURL(url){
    try{
        let parsedURL = new URL(url);
        if(parsedURL instanceof URL === false){
            return false;
        }
        if(ALLOWED_PROTOCOLS.includes(parsedURL.protocol) === false){
            return false;
        }
        if(parsedURL.hostname === ""){
            return false;
        }
        return true;
    }
    catch(err){
        return false;
    }
}

function extractFromPath(path){
    let foundurls = [];
    let possibleurls = FIND_URLS_IN_PATH.exec(path);
    if(!possibleurls){
        return [];
    }
    possibleurls.forEach(function (maybeURL){
        if(isURIencoded(maybeURL)){
            let decoded = decodeURIComponent(maybeURL);
            if(isvalidURL(decoded) === true){
                foundurls.push(decoded);
            }
        }
    });
    return foundurls;
}

function extractURLs(){
    var url = document.getElementById("url").value;
    var parsedURL = new URL(url);
    var done = false;
    var foundurls = [];
    var paramKeys = parsedURL.searchParams.keys();
    while(done === false){
        let c = paramKeys.next();
        done = c.done;
        let cUrl = parsedURL.searchParams.get(c.value);
        if(isvalidURL(cUrl)){
            foundurls.push(cUrl);
        }
        let uridecoded = isURIencoded(cUrl);
        if(uridecoded !== false && isvalidURL(uridecoded)){
            foundurls.push(uridecoded);
        }
        let base64decoded = returnBase64if(cUrl);
        if(base64decoded !== null && isvalidURL(base64decoded)){
            foundurls.push(base64decoded);
        }
    };
    foundurls.concat(extractFromPath(url));
    const allurls_output = document.getElementById("allurls");
    foundurls.forEach(function(url){
        let link = document.createElement("a");
        link.href = url;
        link.textContent = url;
        link.rel = "noopener"
        allurls_output.appendChild(link);
        allurls_output.appendChild(document.createElement("br"));
    })
}

document.getElementById("extract").addEventListener("click",extractURLs)
