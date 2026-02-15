"use strict";

function is_link(text){
  try{
    let url_test = new URL(text);
    if(url_test.hostname != "" && text.includes("see also") == false && text.includes("(from ") == false && text.split(" and ").length === 1){
      return true;
    }
    else{
      return false;
    }
  }
  catch(err){
    return false;
  }
}

let current_url_parsed = new URL(location.href)
current_url_parsed.searchParams.append("no_redirector", "true")
let url_with_redirector_disabled = current_url_parsed.href;
document.getElementById("redirector_disabled").href = url_with_redirector_disabled;

var main = async function(){
  var domain = new URL(location).searchParams.get("q");

  document.getElementById('q').value = domain;

  let currently_listed = await (await fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/main/Alternative%20list%20formats/antimalware_domains.txt")).text();
  let lite_list = await (await fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/refs/heads/main/Alternative%20list%20formats/antimalware_lite_domains.txt")).text();

  fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/main/entry_data.json").then(async function(req){
    if(!domain){
      document.getElementById("my-am").textContent = 'Invalid domain'
      return;
    }
    var text = await req.json()
    document.getElementById('my-am').textContent = (currently_listed.includes(domain)) ? "Listed" : "Not listed"
    if(typeof text[domain] === "object"){
      console.log(text[domain])
      let first_date = new Date(text[domain]["first_seen"]).toString();
      document.getElementById("added").textContent = `${first_date}`
      if(text[domain]["removed"]){
        console.log(text[domain], text["last_updated"])
         document.getElementById("removed").textContent = `${new Date(text[domain]["removed_date"])}`
      }
      else{
        document.getElementById("removed").textContent = "Not removed"
      }
      document.getElementById("last_check").textContent = (text[domain]["last_checked"] || "Unknown");
      document.getElementById("check_status").textContent = (text[domain]["check_status"] === true) ? "Alive" : (text[domain]["check_status"] === false) ? "Dead" : "Not checked";
      document.getElementById("parking_status").textContent = (text[domain]["parked"] === true) ? "Parked" : (text[domain]["check_status"] === false) ? "Not parked" : "Not checked";
      document.getElementById("counter").textContent = text[domain]["check_counter"];
      document.getElementById("ips").textContent = (text[domain]["ips"] || []).join(", ");
      if(text[domain]["dead_since"]){
        document.getElementById("dead_since").textContent = new Date(text[domain]["dead_since"])
      }
      if(text[domain]["alive_on_creation"] != undefined){
        document.getElementById("alive_on_creation").textContent = text[domain]['alive_on_creation']
      }
      if(text[domain]["alive_on_removal"] != undefined){
        document.getElementById("alive_on_removal").textContent = text[domain]['alive_on_removal']
      }
      if(text[domain]["had_www_on_creation"] != undefined){
        document.getElementById("had_www_on_creation").textContent = text[domain]['had_www_on_creation']
      }
      if(text[domain]["had_www_on_check"] != undefined){
        document.getElementById("had_www_on_check").textContent = text[domain]['had_www_on_check']
      }
      if(text[domain]["ports_open"] != undefined){
        let ports_elm = document.getElementById("ports");
        let ports_list = document.createElement("ul");
        let ports = Object.keys(text[domain]["ports_open"]);
        for(let i = 0; i < ports.length; i++){
          let port = document.createElement('li');
          port.textContent = `${ports[i]}: ${text[domain]["ports_open"][ports[i]]}`
          ports_list.appendChild(port);
        }
        ports_elm.appendChild(ports_list)
      }
      if(text[domain]['whois'] != undefined){
        let whois_elm = document.getElementById("whois");
        whois_elm.innerText = text[domain]['whois'];
        document.getElementById("whois_present").textContent = "View WHOIS record"
      }
      if(text[domain]['last_commit']){
        document.getElementById("commit").href = text[domain]['last_commit'];
        document.getElementById("commit").textContent = text[domain]['last_commit'];
      }
      if(text[domain]["ip_whois"]){
        let ip_whois = document.getElementById("ipwhois");
        let ips = Object.keys(text[domain]['ip_whois']);
        ips.forEach((ip) => {
          let ip_whois_info_li = document.createElement('li');
          let ip_whois_details = document.createElement('details');
          ip_whois_info_li.appendChild(ip_whois_details);
          let ip_whois_summary = document.createElement("summary");
          ip_whois_summary.textContent = ip;
          ip_whois_details.appendChild(ip_whois_summary);
          let ip_whois_div = document.createElement("div");
          ip_whois_div.innerText = text[domain]['ip_whois'][ip];
          ip_whois_details.append(ip_whois_div);
          ip_whois.appendChild(ip_whois_info_li);
        })
      }
      if(typeof text[domain]['has_http_80'] === "boolean"){
        let has_http_80_elm = document.getElementById("has_http_80");
        has_http_80_elm.textContent = text[domain]['has_http_80']
      }
    }
    else{
      document.getElementById('my-am').textContent = "Not listed";
      document.getElementById("added").textContent = "Not listed"
    }
  })
  
  
  window.knowndomains = await (await fetch("https://raw.githubusercontent.com/iam-py-test/site-reports-001/main/ownership.json")).json()
  
  console.log(window.knowndomains,domain)
  try{
  document.getElementById("known").textContent = (window.knowndomains[domain]||"Not known")
  }
  catch(err){
    console.log("Error:",err)
  }

const allowlist = (await (await fetch("https://raw.githubusercontent.com/iam-py-test/allowlist/main/allowlist.txt")).text()).split("\n");
document.getElementById("allowlist").textContent = (allowlist.includes(domain)) ? "Yes" : "No"

fetch("https://raw.githubusercontent.com/hagezi/dns-blocklists/main/domains/tif.txt").then(async function(r){
  let domains = (await r.text()).split("\n");
  document.getElementById('tif').textContent = (domains.includes(domain)) ? "Listed" : "Not listed"
})

fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/main/Alternative%20list%20formats/antipup_domains.txt").then(async function(r){
  let domains = (await r.text()).split("\n");
  document.getElementById('pup').textContent = (domains.includes(domain)) ? "Listed" : "Not listed"
})

fetch("https://raw.githubusercontent.com/iam-py-test/uBlock-combo/main/domains_subdomains.txt").then(async function(r){
  let domains = (await r.text()).split("\n");
  document.getElementById('combo').textContent = (domains.includes(domain)) ? "Listed" : "Not listed"
})

if(lite_list.split("\n").includes(domain)){
  document.getElementById('lite').textContent = "Listed"
}
else{
  document.getElementById('lite').textContent = "Not listed"
}

fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/refs/heads/main/special_lists/domain_reasons.json").then(console.log)

let resp = await fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/refs/heads/main/domain_reasons.json")
console.log(resp)
let json_data = JSON.parse((await resp.text()));
let domain_data = json_data['domains'][domain];
if(domain_data != undefined){
  domain_data['comments'].forEach((comment) => {
    let is_comment_link = is_link(comment)
    let commentElm = null;
    console.log(is_comment_link, comment)
    if(is_comment_link == true){
      let comment_link_domain = new URL(comment).hostname;
      commentElm = document.createElement("a");
      if(location.href.includes("no_redirector") || window.knowndomains[comment_link_domain] != undefined || allowlist.includes(comment_link_domain) == true){
        commentElm.href = comment;
      }
      else{
        commentElm.href = "https://iam-py-test.github.io/iam-py-test-redirector/redirect.html?url=" + encodeURIComponent(comment);
      }
    }
    else{
      commentElm = document.createElement("span");
    }
    commentElm.textContent = comment;
    document.getElementById('comments').appendChild(commentElm);
    document.getElementById('comments').appendChild(document.createElement("br"));
  })
}

let dandelion_list = (await (await fetch("https://raw.githubusercontent.com/DandelionSprout/adfilt/refs/heads/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareDomains.txt")).text()).split("\n")
document.getElementById("dandelion").textContent = (dandelion_list.includes(domain)) ? "Listed" : "Not listed"

let light_dns = (await (await fetch("https://cdn.jsdelivr.net/gh/hagezi/dns-blocklists@latest/domains/light.txt")).text()).split("\n")
document.getElementById("light_dns").textContent = (light_dns.includes(domain)) ? "Listed" : "Not listed"

  if(text[domain]['last_commit_faked_1'] != undefined){
    document.getElementById("inaccurate_last_commit").innerHTML = "(this information may not be accurate; see <a href='https://infosec.exchange/@iampytest1/116072758422943054'>this Mastodon post for details</a>)"
  }

}
main().catch(console.error)
