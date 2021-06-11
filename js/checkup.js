var main = async function(){
  fetch("https://raw.githubusercontent.com/iam-py-test/my_filters_001/main/Alternative%20list%20formats/antimalware_domains.txt").then(async function(req){
    if(!new URL(location).searchParams.get("q")){
      document.getElementById("my-am").textContent = 'Invalid domain'
      return;
    }
    var text = await req.text().split("\n")
    if(text.includes(new URL(location).searchParams.get("q"))){
      document.getElementById('my-am').textContent = "Detected"
    }
    else{
      document.getElementById('my-am').textContent = "Not detected"
    }
  })
}
main().catch(console.error)
