// ==UserScript==
// @name         Torn Clean Chat
// @version      1.2.0
// @description  Makes the chat in Torn more readable.
// @author       Pi77Bull
// @match        https://www.torn.com/*
// @grant        none
// @namespace    https://github.com/Pi77Bull
// ==/UserScript==

let color = localStorage.getItem("tcc_color") ? localStorage.getItem("tcc_color") : "#CFCFCF";
let fontSize = localStorage.getItem("tcc_fontsize") ? localStorage.getItem("tcc_fontsize") : "16";
let mentions = (localStorage.getItem("tcc_keywords") ? localStorage.getItem("tcc_keywords") : "pi77bull,pi77,pb").split(",");

let mentionSound = document.createElement("audio");
mentionSound.src = localStorage.getItem("tcc_sound") ? localStorage.getItem("tcc_sound") : "https://www.myinstants.com/media/sounds/tethys.mp3";
player.preload = "auto";

let chatRoot = document.getElementById("chatRoot");
var config = {
  childList: true
};

let style_font = document.createElement("style");
style_font.type = "text/css";
style_font.innerHTML = ".tccNewFont { font-size: " + fontSize + "px; }";
document.getElementsByTagName("head")[0].appendChild(style_font);

if (window.location.pathname == "/preferences.php") {
  window.onload = function() {
    let style_settings = document.createElement("style");
    style_settings.type = "text/css";
    style_settings.innerHTML = ".tccSettings { width: 100%; height: auto; background-color: #F2F2F2; border-radius: 6px; padding: 0px 16px 8px 16px; box-sizing: border-box; }";
    document.getElementsByTagName("head")[0].appendChild(style_settings);

    let style_divLine = document.createElement("style");
    style_divLine.type = "text/css";
    style_divLine.innerHTML = ".tccDivLine { width: 100%; height: 16px; padding-top: 6px; padding-bottom: 6px; }";
    document.getElementsByTagName("head")[0].appendChild(style_divLine);

    let style_span = document.createElement("style");
    style_span.type = "text/css";
    style_span.innerHTML = ".tccLabel { font-size: 14px; }";
    document.getElementsByTagName("head")[0].appendChild(style_span);

    let style_textInput = document.createElement("style");
    style_textInput.type = "text/css";
    style_textInput.innerHTML = ".tccTextInput { -webkit-appearance: none; width: 88%; float: right; height: 16px; border: 1px solid #999999; padding-left: 8px; }";
    document.getElementsByTagName("head")[0].appendChild(style_textInput);

    let style_header = document.createElement("style");
    style_header.type = "text/css";
    style_header.innerHTML = ".tccHeader { width: 100%; height: 18px; padding: 6px 0px 6px 0px; font-size: 18px; font-weight: bold; color: #555555; }";
    document.getElementsByTagName("head")[0].appendChild(style_header);

    let style_seperator = document.createElement("style");
    style_seperator.type = "text/css";
    style_seperator.innerHTML = ".tccSeperator { display: block; height: 1px; border: 0; border-top: 1px solid #CCCCCC; margin: 1em 0; padding 0; }";
    document.getElementsByTagName("head")[0].appendChild(style_seperator);

    let style_divbutton = document.createElement("style");
    style_divbutton.type = "text/css";
    style_divbutton.innerHTML = ".tccDivButton { width: 100%; height: 16px; padding-top: 6px; padding-bottom: 6px; display: flex; align-items: center; justify-content: center; }";
    document.getElementsByTagName("head")[0].appendChild(style_divbutton);

    let style_button = document.createElement("style");
    style_button.type = "text/css";
    style_button.innerHTML = ".tccButton { width: 128px; background: #D5D5D5; padding: 4px 0px 4px 0px; margin: 2px 2px 0px 2px; border: 2px solid #999999; }";
    document.getElementsByTagName("head")[0].appendChild(style_button);

    let cw = document.getElementById("mainContainer").children[0];
    let clear = document.createElement("div");
    clear.className = "clear";
    let settings = document.createElement("div");
    settings.className = "tccSettings";

    let div_header = document.createElement("div");
    div_header.className = "tccHeader";
    let span_header = document.createElement("span");
    span_header.innerText = "Torn Clean Chat Settings";
    div_header.appendChild(span_header);
    settings.appendChild(div_header);

    let hr_seperator = document.createElement("hr");
    hr_seperator.className = "tccSeperator";
    settings.appendChild(hr_seperator);

    let div_fontSize = document.createElement("div");
    div_fontSize.className = "tccDivLine";
    let span_fontSize = document.createElement("span");
    span_fontSize.className = "tccLabel";
    span_fontSize.innerText = "Font size:";
    let text_fontSize = document.createElement("input");
    text_fontSize.type = "text";
    text_fontSize.value = localStorage.getItem("tcc_fontsize") ? localStorage.getItem("tcc_fontsize") : "16";
    text_fontSize.className = "tccTextInput";
    text_fontSize.id = "txt_fontsize";
    div_fontSize.appendChild(span_fontSize);
    div_fontSize.appendChild(text_fontSize);
    settings.appendChild(div_fontSize);

    let div_color = document.createElement("div");
    div_color.className = "tccDivLine";
    let span_color = document.createElement("span");
    span_color.className = "tccLabel";
    span_color.innerText = "Color:";
    let text_color = document.createElement("input");
    text_color.type = "text";
    text_color.value = localStorage.getItem("tcc_color") ? localStorage.getItem("tcc_color") : "#CFCFCF";
    text_color.className = "tccTextInput";
    text_color.id = "txt_color";
    div_color.appendChild(span_color);
    div_color.appendChild(text_color);
    settings.appendChild(div_color);

    let div_mentions = document.createElement("div");
    div_mentions.className = "tccDivLine";
    let span_mentions = document.createElement("span");
    span_mentions.className = "tccLabel";
    span_mentions.innerText = "Keywords:";
    let text_mentions = document.createElement("input");
    text_mentions.type = "text";
    text_mentions.value = localStorage.getItem("tcc_keywords") ? localStorage.getItem("tcc_keywords") : "pi77bull,pi77,pb";
    text_mentions.className = "tccTextInput";
    text_mentions.id = "txt_mentions";
    div_mentions.appendChild(span_mentions);
    div_mentions.appendChild(text_mentions);
    settings.appendChild(div_mentions);

    let div_sound = document.createElement("div");
    div_sound.className = "tccDivLine";
    let span_sound = document.createElement("span");
    span_sound.className = "tccLabel";
    span_sound.innerText = "Sound:";
    let text_sound = document.createElement("input");
    text_sound.type = "text";
    text_sound.value = localStorage.getItem("tcc_sound") ? localStorage.getItem("tcc_sound") : "https://www.myinstants.com/media/sounds/tethys.mp3";
    text_sound.className = "tccTextInput";
    text_sound.id = "txt_sound";
    div_sound.appendChild(span_sound);
    div_sound.appendChild(text_sound);
    settings.appendChild(div_sound);

    let div_save = document.createElement("div");
    div_save.className = "tccDivButton";
    let button_save = document.createElement("button");
    button_save.type = "button";
    button_save.innerText = "Save";
    button_save.className = "tccButton";
    button_save.id = "btn_save";
    let button_reset = document.createElement("button");
    button_reset.type = "button";
    button_reset.innerText = "Reset";
    button_reset.className = "tccButton";
    button_reset.id = "btn_reset";
    div_save.appendChild(button_save);
    div_save.appendChild(button_reset);
    settings.appendChild(div_save);

    cw.appendChild(clear);
    cw.appendChild(settings);


    document.getElementById("btn_save").addEventListener("click", function() {
      let fs = document.getElementById("txt_fontsize");
      let col = document.getElementById("txt_color");
      let kws = document.getElementById("txt_mentions");
      let snd = document.getElementById("txt_sound");

      localStorage.setItem("tcc_fontsize", fs.value);
      localStorage.setItem("tcc_color", col.value);
      localStorage.setItem("tcc_keywords", kws.value);
      localStorage.setItem("tcc_sound", snd.value);
    });

    document.getElementById("btn_reset").addEventListener("click", function() {
      localStorage.removeItem("tcc_fontsize");
      localStorage.removeItem("tcc_color");
      localStorage.removeItem("tcc_keywords");
      localStorage.removeItem("tcc_sound");
    });
  };
}

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
      chats[i].classList.add("tccNewFont");
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
          if (word.includes(mention.toLowerCase())) {
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
        chats[index].classList.add("tccNewFont");
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