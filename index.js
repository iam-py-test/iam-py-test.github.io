"use strict";

// https://krausefx.com/blog/ios-privacy-instagram-and-facebook-can-track-anything-you-do-on-any-website-in-their-in-app-browser
const originalEventListener = document.addEventListener
document.addEventListener = function(a, b) {
    if (b.toString().indexOf("messageHandlers.fb_getSelection") > -1) {
        return null;
    }
    return originalEventListener.apply(this, arguments);
}