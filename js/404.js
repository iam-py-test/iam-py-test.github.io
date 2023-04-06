"use strict";
// get the referrer and create a link back to it
if(document.referrer !== '' & (document.referrer||"").toLowerCase() !== location.href.toLowerCase()){
    var a = document.createElement('a')
    a.href = document.referrer.toLowerCase()
	a.textContent = "Back";
	document.getElementById('back').appendChild(a);
	document.getElementById('back').hidden = false;
	if(new URL(document.referrer.toLowerCase()).hostname === 'iam-py-test.github.io'){
		//it is my fault the link is broken - inform the user
		document.getElementById('myfault').textContent = "My bad! It looks like I deleted or moved this page and forgot to update a link."
	}
}