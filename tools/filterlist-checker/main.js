"use strict";
const checkbutton = document.getElementById("check");
const filterlisttextarea = document.getElementById("filterlist");
const output = document.getElementById("redundant");

function checklist(flist){
    let flistlines = flist.split("\n");
    let found = [];
    let donefilters = [];
    let globalfilters = [];
    let log = ""
    for(let i = 0; i < flistlines.length;i++){
        let cline = flistlines[i];
        if(donefilters.includes(cline)){
            log += `${cline} already appears\n`
        }
        donefilters.push(cline)
    }
    return log
}

checkbutton.addEventListener("click",function(){
    let flist = filterlisttextarea.value;
    let result = checklist(flist);
    output.textContent = result;
})