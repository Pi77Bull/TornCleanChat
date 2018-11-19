// ==UserScript==
// @name         Torn Clean Chat
// @version      2.0.0
// @namespace    https://github.com/Pi77Bull
// @description  Makes the chat in Torn more readable.
// @author       Pi77Bull
// @match        https://www.torn.com/*
// @grant        GM_addStyle
// ==/UserScript==

let settings = JSON.parse(localStorage.getItem("tccSettings"));

if (!settings) {
    settings = {
        "fontsize": "16",
        "color": "#dadada",
        "fontfamily": "Segoe UI",
        "keywords": ["help", "911"],
        "sound": "https://www.myinstants.com/media/sounds/tethys.mp3"
    };
}

let mentionSound = document.createElement("audio");
mentionSound.src = settings.sound;
player.preload = "auto";

GM_addStyle(`
.tcc_option {
height: 30px;
font-size: 12px;
line-height: 30px;
display: inline-block;
box-sizing: border-box;
padding: 0 8px;
width: 50%;
}

.tcc_input {
width: 75%;
height: 20px;
float: right;
margin-top: 4px;
border: 1px solid #cccccc;
font-size: 12px;
padding: 0 2px;
}

.tcc_footer {
padding: 5px 8px;
}

.tcc_status {
display: none;
}

.tcc_status-saved {
display: inline-block;
font-size: 24px;
line-height: 16px;
margin-left: 18px;
animation-name: tccStatusSaved;
animation-duration: 4s;
}

@keyframes tccStatusSaved {
0% {color: #008000ff;}
50% {color: #008000ff;}
100% {color: #00800000;}
}

@media screen and (max-width:1000px) {
.tcc_option {
width: 100%;
}
`)

if (window.location.pathname == "/preferences.php") {
    $(".content-wrapper").append(`
<div id="tcc_settings" class="m-top10">
<div class="cont-gray border-round">
<div class="title-black top-round">Torn Clean Chat Settings</div>
<div>

<div class="tcc_option">
Font size: <input id="fontsize" class="tcc_input" type="text" placeholder="16">
</div><div class="tcc_option">
Color: <input id="color" class="tcc_input" type="text" placeholder="#dadada OR rgb(218,218,218)">
</div><div class="tcc_option">
Font family: <input id="fontfamily" class="tcc_input" type="text" placeholder="Segoe UI (must be installed)">
</div><div class="tcc_option">
Keywords: <input id="keywords" class="tcc_input" type="text" placeholder="pi77bull,help,911">
</div><div class="tcc_option">
Sound: <input id="sound" class="tcc_input" type="text" placeholder="www.example.com/sound.mp3">
</div>

</div>
<div class="tcc_footer">
<input id="tccSave" value="Save Settings" class="torn-btn" type="submit">
<input id="tccDelete" value="Delete Settings" class="torn-btn" type="submit">
<span id="tccStatus" class="tcc_status">✔</span>
</div></div></div>
`);


    if (settings) {
        for (let setting in settings) {
            $(`#${setting}`).val(settings[setting]);
        }
    }

    $("#tccSave").on("click", function () {
        settings = {
            "fontsize": $("#tcc_settings #fontsize").val(),
            "color": $("#tcc_settings #color").val(),
            "fontfamily": $("#tcc_settings #fontfamily").val(),
            "keywords": $("#tcc_settings #keywords").val().split(",").map(item => item.trim().toLowerCase()),
            "sound": $("#tcc_settings #sound").val()
        };
        localStorage.setItem("tccSettings", JSON.stringify(settings));

        $("#tccStatus").removeClass().addClass("tcc_status-saved");
        setTimeout(function () {
            $("#tccStatus").removeClass().addClass("tcc_status");
        }, 4000);
    });

    $("#tccDelete").on("click", function () {
        localStorage.removeItem("tccSettings");
    });
}


if (settings) {
    GM_addStyle(`
.message_oP8oM {
font-size: ${settings.fontsize}px;
font-family: ${settings.fontfamily};
}

.chat-box-content_2C5UJ .message_oP8oM {
height: auto;
padding-bottom: 2px;
line-height: ${Number(settings.fontsize) + 2}px;
}

.even .message_oP8oM:nth-child(even),
.odd .message_oP8oM:nth-child(odd) {
background-color: ${settings.color};
}
`);
}



function addMessageObserver(j) {
    var messageObserver = new MutationObserver(function(mutations) {
        //console.log($(mutations[0].addedNodes[0]).find("#changedSpan").text());

        for (let keyword of settings.keywords) {
            if ($(mutations[0].addedNodes[0]).find("#changedSpan").text().toLowerCase().includes(keyword)) {
                mentionSound.play();
                break;
            }
        }

        $(j).find(".overview_1MoPG").toggleClass("even odd");
    });
    messageObserver.observe($(j).find(".overview_1MoPG")[0], { childList: true });
    $(j).find(".overview_1MoPG").addClass("even");
    $(j).find(".viewport_1F0WI")[0].scrollTop = $(j).find(".viewport_1F0WI")[0].scrollHeight;
    console.log(`Observing ${$(j).find(".name_3A6VH").text()}`);
}

function addChatboxObserver(j) {
    var chatboxObserver = new MutationObserver(function(mutations) {
        //console.log(mutations);
        if (mutations[0].attributeName == "class" && $(j).hasClass("chat-active_1Sufk")) {
            addMessageObserver(j);
        }
    });
    chatboxObserver.observe(j, { attributes: true });

    if ($(j).hasClass("chat-active_1Sufk")) {
        addMessageObserver(j);
    }
}


$(".chat-box_Wjbn9:not(.chat-box-settings_Ogzjk)").each(function(i, j) {
    addChatboxObserver(j);
});

var newchatObserver = new MutationObserver(function(mutations) {
    if (mutations[0].addedNodes.length == 1) {
        addChatboxObserver(mutations[0].addedNodes[0]);
    }
});

newchatObserver.observe($("#chatRoot >")[0], { childList: true });