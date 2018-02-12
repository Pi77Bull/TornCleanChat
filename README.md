# Torn Clean Chat 1.1.1

## Features
- higher contrast between messages*
- increased font size*
- play sound* when a keyword* is mentioned in faction chat 

_*can be set by the user (see **Usersettings/Information** section below)_

## Requirements
You will need a userscript manager to install this script. I recommend using Tampermonkey.

[Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)

[Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)

## Download

[Install Torn Clean Chat](https://github.com/Pi77Bull/TornCleanChat/raw/master/TornCleanChat.user.js)

## Screenshot

![Torn Clean Chat](https://s5.postimg.org/s9jnistqf/chat.png)

## Usersettings/Information

###### Color

At the top of the script look for the line that reads:
```javascript
let color = "#CFCFCF";
```
Change the hexadecimal color to your liking and save.

###### Font size

At the top of the script look for the line that reads:
```javascript
let fontSize = 16;
```
Change the number to your liking and save.

###### Keywords

At the top of the script look for the line that reads:
```javascript
let mentions = ["pi77bull", "pi77", "pb"];
```
Add the words you want to be notified about when mentioned in the faction chat (e.g. your name and abbreviations). Capitalization does **not** matter. **The chat must be open for this to work.**

###### Sound

At the top of the script look for the line that reads:
```javascript
mentionSound.src = "https://www.myinstants.com/media/sounds/you_were_poked_niMJJKH.mp3";
```
Change the URL to a sound of your liking. It is played when the keywords are mentioned in the faction chat. **The chat must be open for this to work.**

## Bugs, issues and ideas

**No known bugs**

If you find any issues, have questions or ideas send me a message on Torn: 
**[Pi77Bull [2082618]](https://www.torn.com/profiles.php?XID=2082618)**
