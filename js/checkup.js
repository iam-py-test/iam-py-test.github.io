"use strict";
var main = async function(){
  var domain = new URL(location).searchParams.get("q");

  document.getElementById('q').value = domain;

  let currently_listed = await (await fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/main/Alternative%20list%20formats/antimalware_domains.txt")).text();

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
        let ips = Object.keys(text[domain['ip_whois']]);
        ips.forEach((ip) => {
          let ip_whois_info_li = document.createElement('li');
          let ip_whois_details = document.getElementById('details');
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

}
main().catch(console.error)
