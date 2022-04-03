let webPagesToRunOn = /gerrit\.[a-zA-Z]+\.com\/\#\/c\/([^\/]+\/){2}[0-9]+($|\/$)/;

let tabs = [];
let ctxMenuItemId = "get-review-cmd-ctx-menu";

// create context menu item
chrome.contextMenus.create({
    id: ctxMenuItemId,
    title: chrome.i18n.getMessage("getReviewCmdCtxMenuItemTxt"),
    contexts: ["all"],
    enabled: false,
}, () => console.log(chrome.runtime.lastError ? `Context menu tem creation failed. Error: ${chrome.runtime.lastError}` : 'Context menu item created.'));

// connect with the content script
chrome.runtime.onConnect.addListener(port => {
    switch (port.name) {
        case "port-from-get-review-cmd-js":
            console.log("Connected with port 'port-from-get-review-cmd-js'.");

            tabs[port.sender.tab.id] = {port: port};

            port.onMessage.addListener(msg => {
                console.log('Listening message.');
                switch(msg.action){
                    case "set-focus-on-this-tab":
                    case "hover-this-tab":
                        console.log(`Tab ${msg.tabId} got focused / mouseover.`);
                        // set the 'Get the !review command' context menu item to be enabled / disabled according to the URL
                        chrome.contextMenus.update(ctxMenuItemId, 
                            { enabled: webPagesToRunOn.test(msg.url) },
                            () => console.log(chrome.runtime.lastError ? `Context menu item update failed. Error: ${chrome.runtime.lastError}` : 'Context menu item updated.'));
                        break;
                }
            });

            break;
    }
});

// inform reviewCmdGetter.js to generate the review cmd
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case ctxMenuItemId:
            console.log('Generate the code review command and place it into the clipboard.');
            tabs[tab.id].port.postMessage({action: "get-review-cmd"});
            break;
    }
})
