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
  "network":{
  "192.168.0.98":{"root":{"username":"root","uid":"0","gid":"0","name":"root","home":"/root","loginshell":"/usr/bin/sh","password":"root"},"ssh":true,"ping":true,"fs":{
  "/":{parent:"/","files":{"ssh.txt":"You SSHed into this device!!!!"}}
  }},
   "192.168.0.32":{"root":{"username":"root","uid":"0","gid":"0","name":"root","home":"/root","loginshell":"/usr/bin/sh","password":"root"},"ssh":true,"ping":true,"fs":{
  "/":{parent:"/","files":{"ssh.txt":"You SSHed into this device!!!!"}}
  }}
  },
  users:{
  "root":{"username":"root","uid":"0","gid":"0","name":"root","home":"/root","loginshell":"/usr/bin/sh","password":"root"},
  "iam-py-test":{"username":"iam-py-test","uid":"21","gid":"139","name":"iam-py-test","home":"/home/iam-py-test","loginshell":"/usr/bin/sh"
  }
  },
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
  "usr",
  "root",
  "nope"
  ]
  },
  "/etc":{
  "parent":"/",
  "files":{
  "hosts":"127.0.0.1       localhost\n# something secret here\n192.168.0.32 secret.local\n# The following lines are desirable for IPv6 capable hosts\n::1     localhost ip6-localhost ip6-loopback\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters",
  "passwd":"Error in loading users"
  },
  dirs:[]
  },
  "/root":{
  "parent":"/",
  "files":{
  },
  "dirs":[]
  },
  "/usr":{
  "parent":"/",
  files:{},
  dirs:["bin"]
  },
  "/usr/bin":{
  "parent":"/usr",
  files:{"sh":{"program":true}},
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
  pid:Math.round(Math.random()*900000).toString().padStart(6,"0"),
  uid: Math.round(Math.random()*1001),
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
    resolveWithHOSTs:function(domain){
    if(this.fs['/etc']['files']['hosts'] === undefined){
    this.outputElement.innerText += 'HOSTs file not found. Please repair your install of Linux\n'
    return domain
    } 
    var entries = this.fs["/etc"]["files"]["hosts"].split("\n")
    for(var t = 0;t < entries.length;t++){
    if(entries[t].startsWith("#")){continue}
    if(entries[t].split(" ")[1] === domain){
    return entries[t].split(" ")[0]
    }
    }
    return domain
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
    if(this.currentDir.endsWith("/") != true){dir = "/" + dir}
    dir = this.currentDir + dir
    if(dir.endsWith("/") === true){
    dir = dir.slice(0,-1)
    }
    }
    return dir
    },
    
    genPID:function(){
    return Math.round(Math.random()*900000).toString().padStart(6,"0")
    },
    
    getCmdOutput:function(program,args){
    var currentPID = this.genPID()
    if(program === ''){return ''}
    if(program === "whoami"){
    return this.user + "\n"
    }
    if(program === "echo"){
    if(args.includes(">")){
    var f = args.join(" ").split(" > ")[1]
    this.fs[this.currentDir].files[f] = args.join(" ").split(" > ")[0]
    return ''
    }
    return args.join(" ") + "\n"
    }
    if(program === "pwd"){
    return this.currentDir + "\n"
    }
    
    if(program === 'ps' & args.length === 0){
    return `PID     TTY     TIME   CMD
 ${this.pid}    pts/1    00:00:00 sh
 ${currentPID}  pts/1    00:00:00 ps
 `
    }

    if(program === "id"){
      return `uid=${this.uid}(${this.user}) gid=${this.uid}(${this.user}) groups=${this.uid}(${this.user})
`
    }
    
    try{
    if(program === "mkdir"){
    var dir = args.join(" ")
    dir = this.parseDir(dir)
    var cDir = this.currentDir
    console.log(dir,dir.split("/"),cDir,this.currentDir)
   console.log(this.currentDir, this.fs[this.currentDir])
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
      var oDir = args.join(' ')
      var dir = this.parseDir(args.join(' '))
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
    if(this.fs[this.parseDir(dir)] === undefined){
    return "Directory " + dir + " not found\n"
    }
    }
    catch(err){
    console.log(err)
    return "Directory " + dir + " not found\n"
    }
    this.currentDir = (this.parseDir(dir)||this.currentDir)
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
    console.log(args.join(" "))
    if(args.join(" ") === 'passwd' & this.currentDir === '/etc'){
    var users = ''
    var ul = Object.keys(this.users)
    for(var t=0;t<ul.length;t++){
    console.log(ul[t],this.users[ul[t]])
    users += ul[t] + ":x:" + this.users[ul[t]].uid + ":" + this.users[ul[t]].gid + ":" + this.users[ul[t]].name + ":" + this.users[ul[t]].home + ":" + this.users[ul[t]].loginshell + "\n"
    }
    return users 
    }
    if(contents === undefined){return "File " + args.join(' ') + " not found"}
    if((contents||{}).program === true){return "File " + args.join(' ') + " is a program"}
    return contents + "\n"
    }
    catch(err){
    console.log(err)
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
    
    if(program === "ping"){
    try{
    var addr = args.join(" ")
    var res = this.resolveWithHOSTs(addr)
    console.log(addr,res)
    if(res === "127.0.0.1"){return "Attempting to ping "+addr + "...\nResponse from 127.0.0.1\n"}
    if(this.network[res] !== undefined & typeof this.network[res] === "object"){
    var log = "Attempting to ping " + addr + "...\n" 
    if(this.network[res].ping === true){
    log += "Response from " + res + "\n"
    return log
    }
    else{
    log += res + " is not responding to pings"
    }
    }
    else{
    return "Failed to connect to " + res + "\n"
    }
    }
    catch(err){
    console.log(err)
    }
    }
    
    if(program === 'rm'){
    delete this.fs[this.currentDir]["files"][args.join(' ')]
    if(args.join(" ") === '*'){
    this.fs[this.currentDir]["files"] = []
    }
    return ""
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
