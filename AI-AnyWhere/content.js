let isMenuBeingShown = false;  

document.addEventListener("mousedown", function(event) {
  const selectedText = getSelectedText();
  if (selectedText) {
    console.log(`Selected Text: ${selectedText}`);
    const rect = getSelectionRect();
    if (rect) {

      const iconWidth = 20; 
      showIcon(rect.right - iconWidth, rect.bottom);
    }
  } else {
    removeIcon();
    removeMenu();
  }
});

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
  icon.style.transform = "scale(0.5)";

  icon.addEventListener("click", function(event) {
    event.stopPropagation();
    isMenuBeingShown = true;
    showMenu();
  });

  document.body.appendChild(icon);
}

function showMenu() {
  removeMenu();
  const icon = document.getElementById("my-icon");
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
    item.addEventListener("click", function() {
      console.log(`Clicked on ${option}`);
    });
    menu.appendChild(item);
  });

  document.body.appendChild(menu);
  document.addEventListener('mousedown', handleOutsideClick);
}

function handleOutsideClick(event) {
  if (isMenuBeingShown) {
    isMenuBeingShown = false;
    return;
  }

  const menu = document.getElementById("my-menu");
  if (menu && !menu.contains(event.target)) {
    removeMenu();
  }
}

function removeMenu() {
  const existingMenu = document.getElementById("my-menu");
  if (existingMenu) {
    existingMenu.remove();
  }
  document.removeEventListener('mousedown', handleOutsideClick);
}

function removeIcon() {
  const existingIcon = document.getElementById("my-icon");
  if (existingIcon) {
    existingIcon.remove();
  }
}
