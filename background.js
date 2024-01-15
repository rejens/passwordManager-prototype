chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
      chrome.tabs.executeScript(tabId, { file: "inject.js" });
   }
});
