/*a javascript framework for doing stuff*/
"use strict";
window.framework = {
randomChoice:function(array){
//this is based on the Python random.choice
var pos = Math.round(Math.random()*array.length)
return (array[pos]||array[0])
},
  createElement:function(elementType,appendTo){
    const elm = document.createElement(elementType)
    appendTo.appendChild(elm)
    return elm
  },
  cmd:{
  fs:{
  "/":{
  "parent":"/",
  "files":{
  "hello.txt":"Hello world!"
  },
  "dirs":[
  "home",
  "dev",
  "tmp",
  "etc",
  "nope"
  ]
  },
  "/etc":{
  "parent":"/",
  "files":{
  "hosts":"127.0.0.1       localhost\n# something secret here\n192.168.0.32 secret.local\n# The following lines are desirable for IPv6 capable hosts\n::1     localhost ip6-localhost ip6-loopback\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters"
  },
  dirs:[]
  },
  "/home":{
  "parent":"/",
  "files":{
  },
  "dirs":[
  "iam-py-test",
  "nul"
  ]
  },
  "/home/iam-py-test":{
  "parent":"/home",
  "dirs":["Desktop"],
  "files":{
  "hi.txt":"Hi!",
    "tea":"Tea, Earl gray. Hot\nhttps://xkcd.com/2570/",
    "dir":"/hidden"
  }
  },
  "/home/iam-py-test/Desktop":{
  "parent":"/home/iam-py-test",
  "files":{
  "random.bat":"echo %RANDOM%",
  "notwindows.txt":"This isn't Windows, so .bat files don't work"
  }
  },
  "/home/nul":{
  "parent":"/home",
  "dirs":[],
  "files":
  {
  }
  },
  "/dev":{
  "parent":"/",
  "files":{
  "null":"Welcome to the main attraction! This is called /dev/null after all\nWhat is this???\nThis is all a tiny easter-egg as part of my website.\nYou are using a 'fake' Linux sh-style command line, running entirly in your browser\nAs this isn't a real Linux environment, it lacks a lot of functionality (including the ability to connect to the internet) and has a lot of bugs\nHowever, there are some files hidden in here which you can find",
  "random":"[[RANDOMCHOICE]]"
  },
  "dirs":["input"]
  },
  "/dev/input":{
  "parent":"/dev",
  "files":{
  },
  "dirs":[]
  },
  "/tmp":{
  "parent":"/",
  "dirs":[],
  "files":{
"update.zip":"Not a zip file",
"log.txt":""
}

},
"/hidden":{
"parent":"/",
"files":{
"hidden.txt":"You found it :)"
},

},
"/hidden/flag":{
"parent":"/hidden",
"files":{
"flag":"FLAG(notactf)",
"ctfs_are_great":"CTFs are great!!!",
"ctfs_are_bad":"CTFs are horrible",
"you":"Which do you agree with???"
}
}
  },
  alias:{},
  user:"root",
  currentDir:"/",
  suppressCmdEcho:false,
    parseArgs:function(args){
      if(typeof args != "string"){
        //can't parse something that isn't a string
        return []
      }
      var args_split = args.split(" ")
      return args_split
    },
    getAlias:function(name){
    if(this.alias[name] != undefined){
    return this.alias[name]
    }
    return name
    },
    parseDir:function(dirn){
    var dir = dirn
    if(dir === "."){
    return this.currentDir
    }
    if(dir === "../"){
    try{
    if(this.fs[this.currentDir].parent !== undefined){
    dir = this.fs[this.currentDir].parent
    }
    }
    catch(err){
    } 
    }
    if(dir === '..'){
    try{
    if(this.fs[this.currentDir].parent !== undefined){
    dir = this.fs[this.currentDir].parent
    }
    
    }
    catch(err){
    }
    }
    if(dir.startsWith("/") != true & dir.startsWith(".") != true){
    if(this.currentDir.endsWith("/") != true){this.currentDir += "/"}
    dir = this.currentDir + dir
    if(dir.endsWith("/") === true){
    dir = dir.slice(0,-1)
    }
    }
    return dir
    },
    getCmdOutput:function(program,args){
    if(program === ''){return ''}
    if(program === "whoami"){
    return this.user + "\n"
    }
    if(program === "echo"){
    return args.join(" ") + "\n"
    }
    if(program === "pwd"){
    return this.currentDir + "\n"
    }
    
    try{
    if(program === "mkdir"){
    dir = args.join(" ")
    dir = this.parseDir(dir)
    cDir = this.currentDir
    console.log(dir,dir.split("/"),cDir,this.currentDir)
   
    this.fs[dir] = {"parent":this.currentDir,"files":{},"dirs":[]}
    this.fs[this.currentDir].dirs.push(dir.split("/")[dir.split("/").length-1])
    return ""
    }
    }
    catch(err){
    console.log(err)
    }
    
    
    try{
    if(program === 'rmdir'){
    oDir = args.join(' ')
    dir = this.parseDir(args.join(' '))
    delete this.fs[dir]
    for(var t = 0;t < this.fs[this.currentDir].dirs.length;t++){
    console.log(dir.split("/")[dir.split("/").length-1])
    if(this.fs[this.currentDir].dirs[t] === dir.split("/")[dir.split("/").length-1]){
    console.log(this.fs[this.currentDir].dirs[t],t)
 console.log("rl",this.fs[this.currentDir].dirs.splice(t,1))
    
    }
    }
    return ''
    }
    }
    catch(err){console.trace(err)}
    
    try{
    }
    catch(err){
    }
    
    if(program === "cd"){
    var dir = args.join(' ')
    
    try{
    if(this.fs[this.parseDir(dir)] === undefined){return "Directory " + dir + " not found\n"}
    }
    catch(err){
    return "Directory " + dir + " not found\n"
    }
    this.currentDir = this.parseDir(dir)
    return ""
    }
    if(program === "ls" & args.length === 0){
    try{
    var entries = Object.keys(this.fs[this.currentDir]["files"])
    entries = entries.concat(this.fs[this.currentDir]["dirs"])
    return entries.join("\n") + "\n"
    }
    catch(err){
    return "Directory " + this.currentDir + " not found\n"
    }
    }
    
    if(program === "ls" & args.length > 0){
    try{
    dir = this.parseDir(args.join(" "))
    var entries = Object.keys(this.fs[dir]["files"])
    entries = entries.concat(this.fs[dir]["dirs"])
    return entries.join("\n") + "\n"
    }
    catch(err){
    console.log(err,args)
    return "Directory " + args.join(" ") + " not found\n"
    }
    }
    
    if(program == "clear"){
    this.outputElement.textContent = ''
    this.suppressCmdEcho = true
    return ''
    }
    if(program == "cat"){
    try{
    var contents = this.fs[this.currentDir]["files"][args.join(" ")]
    if(args.join(" ") === "random" & this.currentDir == "/dev"){
    contents = contents.replace("[[RANDOMCHOICE]]",window.framework.randomChoice(["Welcome to random!","Wait, did the output just change?","Randomness is beauty - Nobody knows","Welcome to /dev/random","Meow - the cat command","Once apon a time, there was a Linux distro...","Hello world"]))
    }
    return contents + "\n"
    }
    catch(err){
    return "File " + args.join(" ") + " not found\n"
    }
    }
    
    if(program === "uname"){
    if(args.length === 0){
    return "Linux\n"
    }
    if(args[0] === "-a"){
    return "Linux devnull 6.12.0-devnull-amd64 Debian 6.12.0-null (2090-12-11) x86_64 GNU/Linux\n"
    }
    }
    
    this.suppressCmdEcho = false
    return "sh: " + program + " not found\n"
    },
    parseCommand:function(cmd){
    this.suppressCmdEcho = false
    var args = this.parseArgs(cmd)
    var cmdName = this.getAlias(args[0])
    console.log(cmdName,args)
    args.shift(0)
    console.log(args)
    //we must get the output before returning
    var output = this.getCmdOutput(cmdName,args)
    return {suppressCommandEcho: this.suppressCmdEcho, output:output}
    }
  }
}
