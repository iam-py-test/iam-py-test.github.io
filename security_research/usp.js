const secure = document.getElementById("secure");
window.password = "";
secure.onkeydown = function(e){
    if(e.key === "backspace"){
        window.password = ""
    }
    if(e.key.length > 1){
        return;
    }
    window.password += e.key;
    secure.value += "*"
    e.preventDefault()
}
secure.onpaste = function(e){
    window.password += e.clipboardData.getData("text");
    e.preventDefault()
}
window.onkeyup = function(){
    document.getElementById("password").textContent = window.password;
}