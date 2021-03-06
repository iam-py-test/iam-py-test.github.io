var main = async function(){
  fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/main/Alternative%20list%20formats/antimalware_domains.txt").then(async function(req){
    if(!new URL(location).searchParams.get("q")){
      document.getElementById("my-am").textContent = 'Invalid domain'
      return;
    }
    var text = await req.text()
    
    if(text.includes(new URL(location).searchParams.get("q"))){
      document.getElementById('my-am').textContent = "Detected"
    }
    else{
      document.getElementById('my-am').textContent = "Not detected"
    }
  })
  
  
  window.knowndomains = new Map([["google.com","Google"],["accounts.google.com","Google"],["google.org","Google"],["blog.google","Google"],["duckduckgo.com","DuckDuckGo"],["duck.com","DuckDuckGo"]])
  var domain = new URL(location).searchParams.get("q")
  console.log(window.knowndomains,domain)
  try{
  document.getElementById("known").textContent = (window.knowndomains.get(domain)||"Not known")
  }
  catch(err){
    console.log("Error:",err)
  }
  document.getElementById('norton').href = "https://safeweb.norton.com/report/show?url=" + encodeURIComponent(domain)
  
  var safedomains = ['google.com',"duck.com","duckduckgo.com","github.com"]
  
  if(document.getElementById('my-am').textContent === 'Detected'){
  document.getElementById('rate').innerText = "Mal"
  }
  else{
    if(safedomains.includes(domain) === true){
      document.getElementById('rate').innerText = "Safe"
    }
    else{
      if(domain.endsWith('.club') || domain.endsWith('.top')){
        document.getElementById('rate').innerText = 'Sus'
      }
      else{
        document.getElementById('rate').innerText = "Unknown"
      }
    }
  }
}
main().catch(console.error)
