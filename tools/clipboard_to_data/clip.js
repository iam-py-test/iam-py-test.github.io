window.onpaste = (e) => {
    let file = e.clipboardData.files[0];
    if(!file){return};
    const reader = new FileReader();
    reader.addEventListener("load", function(){
        document.getElementById("out").textContent = reader.result;
        navigator.clipboard.writeText(reader.result).catch(console.warn);
    })
    reader.readAsDataURL(file);
}