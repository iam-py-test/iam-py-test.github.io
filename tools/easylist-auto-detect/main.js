"use strict";
const PAUSE_TIME = 3600;
const FILTERLIST_URLS = {
EasyList: "https://raw.githubusercontent.com/easylist/easylist/master/easylist/easylist_general_hide.txt",
EasyPrivacy: "https://ublockorigin.github.io/uAssets/thirdparties/easyprivacy.txt",
uBo: "https://ublockorigin.github.io/uAssets/filters/filters.txt",
EasyList_chat: "https://ublockorigin.github.io/uAssets/thirdparties/easylist-chat.txt",
AdGuard_Mobile: "https://filters.adtidy.org/extension/ublock/filters/11.txt",
AdGuard_Base: "https://filters.adtidy.org/extension/ublock/filters/2_without_easylist.txt",
EasyList_Cookie: "https://ublockorigin.github.io/uAssets/thirdparties/easylist-cookies.txt",
adblock_list_for_finland: "https://raw.githubusercontent.com/finnish-easylist-addition/finnish-easylist-addition/gh-pages/Finland_adb.txt",
EasyList_Notifications: "https://ublockorigin.github.io/uAssets/thirdparties/easylist-notifications.txt"
}
const ELM_NAME_REGEX = /^##[a-zA-Z\-]*$/;


function pause(time){
	return new Promise((resolve,reject) => {
		window.setTimeout(resolve,time)
	})
}

const filterlist_keys = Object.keys(FILTERLIST_URLS);
const test_for = document.getElementById("test_for");
for(let i = 0; i < filterlist_keys.length; i++){
	let filterlist_line = document.createElement("p");
	let filterlist_checkbox = document.createElement("input");
	filterlist_line.textContent = filterlist_keys[i] + ": ";
	filterlist_checkbox.id = filterlist_keys[i];
	filterlist_checkbox.checked = true;
	filterlist_checkbox.type = "checkbox";
	filterlist_line.appendChild(filterlist_checkbox)
	test_for.appendChild(filterlist_line)
}

function get_enabled_lists(){
	let keys = Object.keys(FILTERLIST_URLS);
	let enabled = [];
	for(let i = 0; i < keys.length; i++){
		try{
			let elm = document.getElementById(keys[i]);
			if(elm.checked){
				enabled.push(keys[i])
			}
		}
		catch(err){}
	}
	return enabled;
}

document.getElementById("run").addEventListener("click",async () => {
	console.log("running test")
	const testingelm = document.getElementById("testingelm");
	const resultelm = document.getElementById("result");
	const keys = get_enabled_lists();
	window.total_filters = {};
	for(let i = 0; i < keys.length; i++){
		let curl = FILTERLIST_URLS[keys[i]];
		let cresult = document.createElement("p");
		try{
			var dataset = await (await fetch(curl)).text();
		}
		catch(err){
			resultelm.textContent = `Failed to load ${keys[i]} list: ${err}`
			return;
		}
		const datasetlines = dataset.replace("\r\n","\n").split("\n");
		window.allids = [];
		cresult.textContent = "";
		for(let i = 0; i < datasetlines.length;i++){
			try{
				let cline = datasetlines[i].replace("\r", "");
				if(cline.startsWith("##") === false){
					continue
				}
				if((cline.startsWith("###") || cline.startsWith("*###")) && cline.includes(">") === false && cline.includes("[") === false && cline.includes(".") === false){
					var tmpid = cline.split("###")[1].replace(/:not\(.*\)/,"");
					allids.push("#"+tmpid);
					var tmpelm = document.createElement("div");
					tmpelm.textContent = "Didn't filter " + tmpid;
					tmpelm.id = tmpid;
					testingelm.appendChild(tmpelm);
					continue
				}
				if(cline.startsWith("##.") && cline.includes("###") === false && cline.includes("[") === false && cline.split(".").length < 3 && cline.includes(" ") === false){
					var tmpid = cline.split("##.")[1].replace(/:not\(.*\)/,"");
					var tmpelm = document.createElement("div");
					tmpelm.textContent = "Didn't filter " + tmpid;
					tmpelm.classList.add(tmpid);
					testingelm.appendChild(tmpelm);
					allids.push("."+tmpid);
					continue
				}
				console.log(cline, ELM_NAME_REGEX.test(datasetlines[i]))
				if(ELM_NAME_REGEX.test(cline)){
					let tmpid = cline.split("##")[1];
					console.log("elmname:",tmpid)
					var tmpelm = document.createElement(tmpid);
					allids.push(tmpid);
					tmpelm.textContent = "Didn't filter " + tmpid;
					testingelm.appendChild(tmpelm)
				}
			}
			catch(err){
				console.log(err);
			}
			
		};
		window.total_filters[keys[i]] = allids.length
		// longer time may be needed to allow for content blockers to have time to hide all the elements - this prevents you from sometimes getting low detection even when EasyList is on 
		await pause(PAUSE_TIME);
		var totaldetected = 0;
		for(let i2 = 0; i2 < allids.length;i2++){
			var currenttestid = allids[i2];
			var currentelm = document.querySelector(currenttestid);
			if(!currentelm){
				continue;
			}
			if(window.getComputedStyle(currentelm).display === "none"){
				totaldetected += 1;
			}
			if(currentelm.id){
				currentelm.id = "DISABLED_" + Math.round(Math.random()*1000) + "_" + currentelm.id; // prevent problems if an ID reappears
			}
		}
		cresult.textContent = `${totaldetected} elements were hidden by ${keys[i]} (out of ${total_filters[keys[i]]}). ${(totaldetected/allids.length)*100}% likelyhood of ${keys[i]} generic cosmetic filtering`
		resultelm.appendChild(cresult);

	}
})