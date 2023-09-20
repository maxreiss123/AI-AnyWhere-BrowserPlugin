// TODO - replace all strings with vars.

  document.getElementById('setApiKey').addEventListener('click', function() {
    const apiKey = document.getElementById('apiKeyInput').value;
    if (apiKey) {
      chrome.storage.local.set({ "openai_api_key": apiKey }, function() {
        alert("API key set successfully.");
      });
    } else {
      alert("Please enter a valid API key.");
    }
  });

  
  document.getElementById("translate").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "captureSelectedText" }, function(response) {
        const text = response.text;
        chrome.runtime.sendMessage({ action: "translateText", text });
      });
    });
  });
  

  document.getElementById("summarize").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "captureText" }, function(response) {
        const text = response.text;
        chrome.runtime.sendMessage({ action: "summarizeText", text });
      });
    });
  });
  
  document.getElementById("generate").addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "generateText" }, function(response) {
        if (response.error) {
          alert(response.error);
          return;
        }
        const currentText = response.currentText;
        chrome.runtime.sendMessage({ action: "generateTextAPI", currentText });
      });
    });
  });

  document.getElementById("queryButton").addEventListener("click", function() {
    const userQuery = document.getElementById("userQuery").value;
    chrome.runtime.sendMessage({ action: "userQuery", userQuery });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "displayResponse") {
      const queryResponse = request.queryResponse;
      document.getElementById("queryResponse").innerText = queryResponse;
    }
  });
  