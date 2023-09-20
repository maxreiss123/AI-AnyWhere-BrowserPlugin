// TODO - replace all strings with vars.

document.getElementById('summarize').addEventListener('click', function() {
    // Placeholder for code - summarize
    chrome.tabs.executeScript({
      code: '/* interaction with api - template for summarize*/'
    });
  });
  
  document.getElementById('translate').addEventListener('click', function() {
     // Placeholder for code - translate
    chrome.tabs.executeScript({
      code: '/* interaction with api - template translate  */'
    });
  });

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
  