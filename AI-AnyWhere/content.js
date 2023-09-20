function captureText() {
    const bodyText = document.body.innerText;
    return bodyText;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureText") {
      const text = captureText();
      sendResponse({ text });
    }
  });

  function captureSelectedText() {
    const selectedText = window.getSelection().toString();
    return selectedText;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureSelectedText") {
      const text = captureSelectedText();
      sendResponse({ text });
    }
  });

let focusedElement = null;
document.addEventListener("focusin", function() {
  focusedElement = document.activeElement;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateText") {
    if (focusedElement && focusedElement.tagName === "INPUT" || focusedElement.tagName === "TEXTAREA") {
      const currentText = focusedElement.value;
      sendResponse({ currentText });
    } else {
      sendResponse({ error: "No text box is focused." });
    }
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertText") {
      const generatedText = request.generatedText;
      if (focusedElement && (focusedElement.tagName === "INPUT" || focusedElement.tagName === "TEXTAREA")) {
        focusedElement.value += generatedText;
      }
    }
  });

