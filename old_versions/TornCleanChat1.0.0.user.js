// ==UserScript==
// @name         Torn Clean Chat
// @version      1.0
// @description  Makes the chat in Torn more readable.
// @author       Pi77Bull
// @match        https://www.torn.com/*
// @grant        none
// @namespace    https://github.com/Pi77Bull
// ==/UserScript==

let color = "#CFCFCF";
let fontSize = 16;

let chatRoot = document.getElementById("chatRoot");
var config = {
  childList: true
};

let style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".newFont { font-size: " + fontSize + "px; }";
document.getElementsByTagName("head")[0].appendChild(style);

let chatButtons = [];
let chats = [];
let observers = [];

for (let i = chatRoot.children[0].childElementCount - 1; i > 4; i--) {
  let btn = chatRoot.children[0].children[i].children[0];
  chatButtons.push(btn);
  let cht;
  chats.push(cht);
}

for (let i = 0; i < chats.length; i++) {
  let obs = new MutationObserver(function() {
    if (!chats[i].children[chats[i].childElementCount - 3].getAttribute("style")) {
      chats[i].children[chats[i].childElementCount - 2].setAttribute("style", "background-color: " + color + ";");
    }
  });
  observers.push(obs);
  chatButtons[i].addEventListener("click", function() {
    setTimeout(function() {
      if (chatButtons[i].parentElement.className.includes("chat-active")) {
        chats[i] = chatButtons[i].parentElement.children[1].children[1].children[0];
        chats[i].classList.add("newFont");
        for (let j = 1; j < chats[i].childElementCount - 1; j++) {
          if (j % 2 == 1) {
            chats[i].children[j].setAttribute("style", "background-color: " + color + ";");
          }
        }
        chats[i].parentElement.scrollTop = chats[i].parentElement.scrollHeight;
        observers[i].observe(chats[i], config);
      } else {
        observers[i].disconnect();
      }
    }, 1);
  });
}

for (let i = 0; i < chats.length; i++) {
  setTimeout(function() {
    if (chatButtons[i].parentElement.className.includes("chat-active")) {
      chats[i] = chatButtons[i].parentElement.children[1].children[1].children[0];
      chats[i].classList.add("newFont");
      for (let j = 0; j < chats[i].childElementCount - 1; j++) {
        if (j % 2 == 1) {
          chats[i].children[j].setAttribute("style", "background-color: " + color + ";");
        }
      }
      chats[i].parentElement.scrollTop = chats[i].parentElement.scrollHeight;
      observers[i].observe(chats[i], config);
    } else {
      observers[i].disconnect();
    }
  }, 1);
}
