let myPort = chrome.runtime.connect({name:"port-from-get-review-cmd-js"});

// get the review cmd when the user clicks the 'Get the !review command' context menu item
myPort.onMessage.addListener(function(msg){
    switch(msg.action){
        case "get-review-cmd":
            getReviewCmd();
            console.log('Generated the code review command and placed it into your clipboard.');
            break;
    }
});

// inform ctxMenuItemHandler.js that the tab is being focused or hovered, or the URL changed,
// to toggle the availability (enabled / disabled) of the 'Get the !review command' context menu item
$(window).on('focus', function(){
    console.log('This tab got the focus.');
    myPort?.postMessage({action: "set-focus-on-this-tab", url: window.location.href});
});
$(window).on('mousemove', function(){ // mousemove is used instead of mouseover for a better detection
    console.log('Hovering this tab.');
    myPort?.postMessage({action: "hover-this-tab", url: window.location.href});
}); 
// 'click' + 'keydown' instead of 'popstate' to also handle scenarios like going back to the previous page
$(window).on('click', function(event){
    console.log('Possibly the URL was changed.');
    myPort?.postMessage({action: "possibly-changed-url", url: window.location.href});
});
$(window).on('keydown', function(event){
    console.log('Possibly the URL was changed.');
    myPort?.postMessage({action: "possibly-changed-url", url: window.location.href});
});

// generate the review command and place it into the clipboard
function getReviewCmd(){
    let currentChangesetID = window.location.href.match(/\d+(?=\/\d+\/?$)|\d+(?=\/?$)/)[0];
    let reviewCommand = Array.from(document.querySelectorAll('[role="tabpanel"] .com-google-gerrit-client-change-RelatedChanges-RelatedChangesCss-row'))
        .filter(row => row.lastChild.title.toLowerCase() != 'merged')
        .map(row => row.querySelector('.com-google-gerrit-client-change-RelatedChanges-RelatedChangesCss-subject a').href)
        .map(href => href.match(/\d+(?=\/\d+\/?$)/)[0])
        .filter(changesetID => changesetID != currentChangesetID)
        .reduce((reviewCommand, changesetID) => `${reviewCommand} ${changesetID}`, `!review ${currentChangesetID}`);

    copyToClipboard(reviewCommand);
}

function copyToClipboard(text) {
   const elem = document.createElement('textarea');
   elem.value = text;
   document.body.appendChild(elem);
   elem.select();
   document.execCommand('copy');
   document.body.removeChild(elem);
}
