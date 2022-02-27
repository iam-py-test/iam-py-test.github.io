"use strict";
var template = document.createElement("template")
var inputHTML = document.getElementById('input')
var statusElement = document.getElementById("status")
var outputElement = document.getElementById('HTML')
template.hidden = true

var pause = function(time){
return new Promise(function(res,rej){
window.setTimeout(res,time)
})
}

var parse = async function(e){
statusElement.innerText = "Parsing HTML..."
var html = inputHTML.value
console.log(html)
template.innerHTML = html
await pause(5)
console.log(template.content,template.innerHTML)
outputElement.textContent = `Nodes:`
var header = document.createElement("p")

var listElement = document.createElement("ul")
//window.c = template.content
template.content.childNodes.forEach(async function(elem){
if(document.getElementById('hidetextnodes').checked === true){
if(elem.nodeName === '#text' || elem.nodeName === '#comment'){return}
}
var elmData = document.createElement("li")
console.log(elem)
elmData.textContent = elem.nodeName
elmData.elementContext = elem
listElement.appendChild(elmData)
elmData.title = (elem.outerHTML||elem.textContent)
if(elmData.title.length > 150 & document.getElementById('cutOuterHTML').checked === true){
//long titles make it hard to read
elmData.title = elmData.title.slice(0,150) + "..."
}
})
outputElement.appendChild(listElement)
statusElement.textContent = 'Parsed'

}

inputHTML.onkeyup = parse
inputHTML.onchange = parse
inputHTML.onpaste = parse
var settingsElems = document.getElementsByClassName("updateonchange")
//we need the Array.from as getElementsByClassName returns an object
Array.from(settingsElems).forEach(function(elemt){
//when we change settings, update the screen
elemt.onchange = window.parse
})


//update status
console.log("Loaded")
statusElement.innerText = "Loaded"
