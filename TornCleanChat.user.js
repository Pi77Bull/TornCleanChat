// ==UserScript==
// @name         Torn Clean Chat
// @namespace    https://github.com/Pi77Bull
// @match        https://www.torn.com/*
// @grant        GM_addStyle
// @version      3.0.0
// @author       Pi77Bull [2082618]
// @description  Makes the chat in Torn more readable.
// @run-at       document-start
// ==/UserScript==

GM_addStyle(`
.message_oP8oM[name$="0"],
.message_oP8oM[name$="2"],
.message_oP8oM[name$="4"],
.message_oP8oM[name$="6"],
.message_oP8oM[name$="8"] {
  background-color: #dfdfdf;
}

.message_oP8oM {
  font-size: 1.4em !important;
  line-height: 1.1em !important;
  padding: 4px;
}

.online_7-IbA .icon_39DmK,
.offline_yq0LQ .icon_39DmK,
.away_3bps2 .icon_39DmK {
  transform: scale(2);
  z-index: 1;
  margin-right: 5px;
}

.viewport_1F0WI {
  scrollbar-width: thin;
  scrollbar-color: #7e8182 #dfdfdf;
}
`);
