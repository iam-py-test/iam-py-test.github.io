fetch("1.json").then(async (r) => {
    console.log(r);
    console.log(await r.json())
    console.log(await r.text())
})
var x = new XMLHttpRequest()
x.open("GET", "1.json")
x.onload = (r) => console.log(r)
x.send()
