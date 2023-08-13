const find_removeparam = new RegExp("removeparam=[^/,]*");
const find_domain = new RegExp("domain=[^/,]*");

function gen_rules(l){
    let rules = {
        "global": [],
        "specific": {}
    }
    for(let i = 0; i < l.length; i++){
        let crule = l[i];
        if(!crule.includes("removeparam") || crule.startsWith("!") || crule.startsWith("@@")){
            continue;
        }
        let matches = find_removeparam.exec(crule);
        if(matches === null){continue};
        if(matches.length === 0){continue};
        let regex_f = matches[0].slice(12);
        console.log(regex_f, crule);
        let scope = "";
        if(crule.startsWith("$removeparam=")){
            if(crule.includes("domain=") && crule.startsWith("||") === false){
                let found_domains = find_domain.exec(crule);
                if(found_domains == null){continue};
                if(found_domains.length === 0){
                    rules.global.push(regex_f);
                    continue;
                }
                let alldomains = found_domains.join("").slice(7).split("|");
                console.log(alldomains)
                alldomains.forEach(function(domain){
                    if(Object.keys(rules.specific).includes(domain) === false){
                        rules.specific[domain] = [];
                    }
                })
            }
            else{
                rules.specific.push(regex_f)
            }
        }
    }
}

(async () => {
    var l = await (await fetch("https://raw.githubusercontent.com/DandelionSprout/adfilt/master/LegitimateURLShortener.txt")).text()
    gen_rules(l.split("\n"))
})()
