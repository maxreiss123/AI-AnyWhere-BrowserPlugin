//Function for retr. the open key from the chrome.storage.local.get 
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
  
  // Authenticate
  authenticateOpenAI();
  
  