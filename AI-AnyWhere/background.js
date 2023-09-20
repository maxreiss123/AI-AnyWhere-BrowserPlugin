function authenticateOpenAI() {
    chrome.storage.local.get("openai_api_key", function(data) {
      const apiKey = data.openai_api_key;
  
      if (!apiKey) {
        console.error("API key not found.");
        return;
      }
  
      // Sample endpoint for demonstration; replace with an actual OpenAI API endpoint
      const openAIEndpoint = "";
  
      const payload = {
        prompt: "",
        max_tokens: 60
      };

      fetch(openAIEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      })

      .then(response => {
        if (response.status === 401) {
          console.error("Invalid OpenAI API key.");
          return null;
        }
        return response.json(); 
      })
      .then(data => {
        if (data) {
          console.log("Authenticated successfully:", data);
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
    });
}
authenticateOpenAI();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarizeText") {
    const text = request.text;

    // Fetch API key from local storage
    chrome.storage.local.get("openai_api_key", function(data) {
      const apiKey = data.openai_api_key;

      // Call OpenAI API to summarize text
      fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: `Summarize: ${text}`, max_tokens: 100 })
      })
      .then(response => response.json())
      .then(data => {
        const summary = data.choices[0].text;
      });
    });
  }
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "translateText") {
    const text = request.text;

    // Here we might can use google or the openAPI as well
    chrome.storage.local.get("google_translate_api_key", function(data) {
      const apiKey = data.google_translate_api_key;

      // 
      fetch(`https://translation.googleapis.com/language/translate/v2?target=es&key=${apiKey}&q=${text}`, {
        method: "POST"
      })
      .then(response => response.json())
      .then(data => {
        const translation = data.data.translations[0].translatedText;
      });
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateTextAPI") {
    const currentText = request.currentText;

    // Fetch API key from local storage
    chrome.storage.local.get("openai_api_key", function(data) {
      const apiKey = data.openai_api_key;

      // Call OpenAI API to generate text
      fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: currentText, max_tokens: 50 })
      })
      .then(response => response.json())
      .then(data => {
        const generatedText = data.choices[0].text;
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "insertText", generatedText });
        });
      });
    });
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "userQuery") {
    const userQuery = request.userQuery;

    // Fetch API key from local storage
    chrome.storage.local.get("openai_api_key", function(data) {
      const apiKey = data.openai_api_key;

      // Call OpenAI API to respond to the query
      fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: userQuery, max_tokens: 100 })
      })
      .then(response => response.json())
      .then(data => {
        const queryResponse = data.choices[0].text;
        chrome.runtime.sendMessage({ action: "displayResponse", queryResponse });
      });
    });
  }
});
