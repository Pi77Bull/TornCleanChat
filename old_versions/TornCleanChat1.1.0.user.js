// ==UserScript==
// @name         Torn Clean Chat
// @version      1.1
// @description  Makes the chat in Torn more readable.
// @author       Pi77Bull
// @match        https://www.torn.com/*
// @grant        none
// @namespace    https://github.com/Pi77Bull
// ==/UserScript==

let color = "#CFCFCF"; // Color for contrast goes here
let fontSize = 16; // Font size goes here
let mentions = ["pi77bull", "pi77", "pb"]; // All the names your faction members call you go here

let mentionSound = document.createElement("audio");
mentionSound.src = "https://www.myinstants.com/media/sounds/you_were_poked_niMJJKH.mp3"; // Sound that plays when a faction member mentions you goes here
player.preload = "auto";

let chatRoot = document.getElementById("chatRoot");
var config = {
  childList: true
};

let style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".newFont { font-size: " + fontSize + "px; }";
document.getElementsByTagName("head")[0].appendChild(style);

let chatcount = chatRoot.children[0].childElementCount;
let chatButtons = [];
let chats = [];
let observers = [];

for (let i = chatRoot.children[0].childElementCount - 1; i > 0; i--) {
  if (!chatRoot.children[0].children[i].className.includes("settings") && !chatRoot.children[0].children[i].tagName.includes("AUDIO")) {
    addChat(i);
  }
}

for (let i = 0; i < chats.length; i++) {
  addObserver(i);
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

let mainChatTab = chatRoot.children[0];

function callback() {
  if (mainChatTab.childElementCount > chatcount) {
    chatcount++;
    addChat(chatRoot.children[0].childElementCount - 1);
    addObserver(chats.length - 1);
  } else {
    chatcount--;
  }
}
let chatcountObserver = new MutationObserver(callback);
chatcountObserver.observe(mainChatTab, config);

function addChat(index) {
  let btn = chatRoot.children[0].children[index].children[0];
  chatButtons.push(btn);
  let cht;
  chats.push(cht);
}

function addObserver(index) {
  let obs = new MutationObserver(function() {
    if (!chats[index].children[chats[index].childElementCount - 3].getAttribute("style")) {
      chats[index].children[chats[index].childElementCount - 2].setAttribute("style", "background-color: " + color + ";");
    }
    if (chatButtons[index].children[0].getAttribute("title") == "Faction") {
      let words = [];
      words = chats[index].children[chats[index].childElementCount - 2].children[1].innerText.toLowerCase().split(" ");
      for (let mention of mentions) {
        for (let word of words) {
          if (word.includes(mention)) {
            mentionSound.play();
            break;
          }
        }
      }
    }
  });
  observers.push(obs);
  chatButtons[index].addEventListener("click", function() {
    setTimeout(function() {
      if (chatButtons[index].parentElement.className.includes("chat-active")) {
        chats[index] = chatButtons[index].parentElement.children[1].children[1].children[0];
        chats[index].classList.add("newFont");
        for (let j = 1; j < chats[index].childElementCount - 1; j++) {
          if (j % 2 == 1) {
            chats[index].children[j].setAttribute("style", "background-color: " + color + ";");
          }
        }
        chats[index].parentElement.scrollTop = chats[index].parentElement.scrollHeight;
        observers[index].observe(chats[index], config);
      } else {
        observers[index].disconnect();
      }
    }, 1);
  });
}