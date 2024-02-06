window.onpaste = (e) => {
    let file = e.clipboardData.files[0];
    if(!file){return};
    const reader = new FileReader();
    reader.addEventListener(function(){
        document.getElementById("out").textContent = reader.re
    })
    reader.readAsDataURL(file);
}