/*
This is the main script file for /dev/null

*/
"use strict";
window.listenEnter = true
var inputElement = document.getElementById("input")
var outputElement = document.getElementById("output")

//if the framework doesn't load
if(typeof window.framework !== "object"){
alert("Warning: The framework has not loaded\nThe terminal will be unusable")
window.framework = {cmd:{parseCommand:function(){return {suppressCommandEcho:false,output:"Error: Framework not loaded\n"}}}}
}

window.framework.cmd.outputElement = outputElement
inputElement.addEventListener("keydown",function(event){

//toLowerCase may be needed if browsers don't agree on case
  if(event.key.toLowerCase() === "enter"){
  event.preventDefault()
  var output = window.framework.cmd.parseCommand(inputElement.innerText)
  if(output.suppressCommandEcho === false){
  outputElement.innerText += "$ " + inputElement.innerText + "\n"
  }
  inputElement.innerText = ``
  
  outputElement.innerText += output.output
  }
})
var inputLine = document.getElementById('input_line')
inputLine.onclick = function(){
//I'm not sure if this is accessable
inputElement.focus()
}
