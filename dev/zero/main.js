"use strict";
var texts = ["Get:1 http://kali.download/kali kali-rolling InRelease [30.6 kB]","Listing contents of /boot...\nboot.conf\nfqwtq3qg.boot","Fetched 119 MB in 35s (3,373 kB/s)  \nReading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done","Connecting to 192.168.0.32","SSH connection to 192.168.0.32 established","Connecting to admin@192.168.0.54","Disconnected from 192.168.0.28","Running port scan...","1 IP address (1 host up) scanned in 0.07 seconds","Scanning local network","Verifying system intergity","Warning: nmap is out of date. Please upgrade to 7.91","Reply from 192.168.0.55","Unable to scan host: access denied","Running scan for XSS","Trying SSH with username root and password root","Listing directory contents","Connecting to remote host","Connection to rounter.local timed out","File /root/sysini.conf not found","Connected","Unknown Error"]
window.setInterval(function(){
document.getElementById('output').innerText +=  texts[Math.round(Math.random()*(texts.length-1))] + "\n"
window.scrollBy(0,55);
},800)

document.getElementById('input_line').onclick = function(){document.getElementById('input').focus()
}
document.body.ondblclick = function(){document.getElementById('input').focus()
}
document.getElementById('input_line').onkeypress = function(e){
if(e.key.toLowerCase() === "enter" || e.key.toLowerCase() === "return"){
if(document.getElementById('input').textContent === 'clear'){document.getElementById('output').textContent = ''}
if(document.getElementById('input').textContent === 'pwd'){document.getElementById('output').innerText += '/bin\n'}
if(document.getElementById('input').textContent.startsWith("ping ")){document.getElementById('output').innerText += 'Pinging ' + document.getElementById('input').textContent.split(' ')[1] + '\n'}
document.getElementById('input').textContent = ''
e.preventDefault();
return false
}
}