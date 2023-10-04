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
      let first_date = new Date(text[domain]["first_seen"]).toString();
      document.getElementById("added").textContent = `Added ${first_date}`
      if(text[domain]["removed"]){
        console.log(text[domain], text["last_updated"])
         document.getElementById("removed").textContent = `Removed ${new Date(text[domain]["removed_date"])}`
      }
      else{
        document.getElementById("removed").textContent = "Not removed"
      }
      document.getElementById("last_check").textContent = (text[domain]["last_checked"] || "Unknown");
      document.getElementById("check_status").textContent = (text[domain]["check_status"] === true) ? "Alive" : (text[domain]["check_status"] === false) ? "Dead" : "Not checked";
      document.getElementById("counter").textContent = text[domain]["check_counter"];
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
