console.log("Background script loaded");

function checkForSelectedText() {
  console.log("Checking for selected text");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    console.log("Sending message to content script");
    chrome.tabs.sendMessage(activeTab.id, { action: 'getSelectedText' }, (response) => {
      console.log("Received response:", response);
      if (response && response.selectedText) {
        console.log(`Selected Text: ${response.selectedText}`);
      } else {
        console.log('No text selected.');
      }
    });
  });
}

chrome.browserAction.onClicked.addListener((tab) => {
  checkForSelectedText();
});
