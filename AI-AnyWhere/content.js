let shouldRemoveMenu = true;

document.addEventListener("mouseup", function(event) {
  const selectedText = getSelectedText();
  if (selectedText) {
    console.log(`Selected Text: ${selectedText}`);
    const rect = getSelectionRect();
    if (rect) {
      showIcon(rect.right, rect.bottom);
    }
  } else {
    if (shouldRemoveMenu) {
      removeIcon();
      removeMenu();
    }
    shouldRemoveMenu = true;  // Reset the flag
  }
});

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  }
  return '';
}

function getSelectionRect() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return null;
  return selection.getRangeAt(0).getBoundingClientRect();
}

function showIcon(x, y) {
  removeIcon();
  removeMenu();  
  const icon = document.createElement("img");
  icon.id = "my-icon";
  icon.src = chrome.runtime.getURL("assets/bookmark.png");  
  icon.style.position = "fixed";
  icon.style.left = `${x}px`;
  icon.style.top = `${y}px`;
  icon.style.zIndex = 1000;
  icon.style.transform = "scale(0.3)";
  icon.style.pointerEvents = "auto";
  
  function handleMouseDown(event) {
    event.stopPropagation();
    shouldRemoveMenu = false;  // Set the flag to prevent menu removal
    showMenu(icon);
    icon.removeEventListener("mouseup", handleMouseDown);
  }
  
  icon.addEventListener("mouseup", handleMouseDown);
  document.body.appendChild(icon);
}

function removeIcon() {
  const existingIcon = document.getElementById("my-icon");
  if (existingIcon) {
    existingIcon.remove();
  }
}

function removeMenu() {
  const existingMenu = document.getElementById("my-menu");
  if (existingMenu) {
    existingMenu.remove();
  }
}

function showMenu(icon) {
  const rect = icon.getBoundingClientRect();
  const x = rect.left;
  const y = rect.bottom;
  const menu = document.createElement("div");
  
  menu.id = "my-menu";
  menu.style.position = "fixed";
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;  
  menu.style.zIndex = 1001;  
  menu.style.backgroundColor = "#fff";
  menu.style.border = "1px solid #ccc";

  const options = ["summarize", "translate", "rephrase"];
  options.forEach(option => {
    const item = document.createElement("div");
    item.textContent = option;
    item.style.padding = "8px";
    item.addEventListener("click", function(event) {
      event.stopPropagation();
      shouldRemoveMenu = false;  // Set the flag to prevent menu removal
      console.log(`Clicked on ${option}`);
    });
    menu.appendChild(item);
  });
  
  document.body.appendChild(menu);
}
