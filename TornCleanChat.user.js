// ==UserScript==
// @name         Torn Clean Chat
// @version      1.3.0
// @namespace    https://github.com/Pi77Bull
// @description  Makes the chat in Torn more readable.
// @author       Pi77Bull
// @match        https://www.torn.com/*
// @require      https://raw.githubusercontent.com/marcj/css-element-queries/master/src/ResizeSensor.js
// @require      https://raw.githubusercontent.com/marcj/css-element-queries/master/src/ElementQueries.js
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
.tcc_option {
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 8px;
}

.tcc_option-l {
    width: 50%;
}

.tcc_option-sm {
    width: 100%;
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
`)

let settings = JSON.parse(localStorage.getItem("tccSettings"));

if (window.location.pathname == "/preferences.php") {
    $(".content-wrapper").append(`
<div class="m-top10">
<div class="cont-gray border-round">
<div class="title-black top-round">Torn Clean Chat Settings</div>
<div>

<div class="tcc_option">
Font size: <input class="tcc_input" type="text">
</div><div class="tcc_option">
Color: <input class="tcc_input" type="text">
</div><div class="tcc_option">
Font family: <input class="tcc_input" type="text">
</div><div class="tcc_option">
Keywords: <input class="tcc_input" type="text">
</div><div class="tcc_option">
Sound: <input class="tcc_input" type="text">
</div>

</div>
<div class="tcc_footer">
<input id="tccSave" value="Save Settings" class="torn-btn" type="submit">
<input id="tccDelete" value="Delete Settings" class="torn-btn" type="submit">
<span id="tccStatus" class="tcc_status">✔</span>
</div></div></div>
`);

    function sizeToFit() {
        if ($(".content-wrapper").width() >= 784) { //desktop
            $(".tcc_option").removeClass().addClass("tcc_option tcc_option-l");
        } else if ($(".content-wrapper").width() >= 386) { //tablet
            $(".tcc_option").removeClass().addClass("tcc_option tcc_option-sm");
        } else if ($(".content-wrapper").width() >= 320) { //phone
            $(".tcc_option").removeClass().addClass("tcc_option tcc_option-sm");
        }
    }

    sizeToFit();
    new ResizeSensor($(".content-wrapper"), function () {
        sizeToFit();
    });

    if (settings) {
        $.each(settings, function (i, j) {
            $(".tcc_option").eq(i).children().val(j);
        });
    }

    $("#tccSave").on("click", function () {
        let arr = [];
        $(".tcc_option").each(function () {
            arr.push($(this).eq(0).children().val());
        });
        localStorage.setItem("tccSettings", JSON.stringify(arr));
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
.chat-box-content_2C5UJ {
    font-size: ${settings[0]}px;
    font-family: ${settings[2]};
}

.chat-box-content_2C5UJ .message_oP8oM {
    height: auto;
    padding-bottom: 2px;
    line-height: ${Number(settings[0]) + 2}px;
}

.message_oP8oM:nth-child(2n+0) {
    background-color: ${settings[1]};
}
`);

    $(".viewport_1F0WI").each(function () {
        $(this)[0].scrollTop = $(this)[0].scrollHeight;
    });
}




var obs = new MutationObserver(function (mutations, observer) {
    $.each(mutations, function (i, mutation) {
        console.log(mutation);
    });
});

var canvasElement = $(".chat-box-wrap_20_R_")[0];
obs.observe(canvasElement, {
    childList: true,
    subtree: false
});