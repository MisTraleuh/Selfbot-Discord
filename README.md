<p align="center"> 
  <img src="assets_for_readme/selfbot.png" alt="selfbot.png" width="80px" height="80px">
</p>
<h1 align="center">
  👑 Selfbot-Discord !
</h1>

## ⚡️ Download | Install 

> [node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-fr) **(v16.14.0 or higher)**

```bash
# Clone this repository
$ git clone https://github.com/CatalanNathan/Selfbot-Discord

# Go into the repository
$ cd SelfbotDiscord

# Install the dependencies
$ npm install --save-dev

# Start the selfbot
$ sudo npm start
```

## 🛡️ TOS | Privacy Policy

> Small reminder, the use of a selfbot is **prohibited** by __discord__ themselves.

The question regarding "self bots" has come up here and there, and we'd like to make our stance clear:

Discord's API provides a separate type of user account dedicated to automation, called a bot account. Bot accounts can be created through the applications page, and are authenticated using a token (rather than a username and password). Unlike the normal OAuth2 flow, bot accounts have full access to all API routes without using bearer tokens, and can connect to the Real Time Gateway. Automating normal user accounts (generally called "self-bots") outside of the OAuth2/bot API is forbidden, and can result in an account termination if found.
To read more [click here](https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-)

## 📝 Utilisation | Usage
- Create a file called `.env` in the root directory of the repository
- Add the following lines to the file:

```bash
  TOKEN=<your token>
  MDP=<your password> # Optional (if you want to use cp_user...)
  PREFIX_NORMAL=+
  PREFIX_CRYPTO=!
  PREFIX_FUN=&
  PREFIX_HACKER=*
  PREFIX_EMOTES=$
  PREFIX_PERSO=%
  PREFIX_INFOS=?
  PREFIX_ADMIN=@
```
- To have your token connected to [discord.com](https://discord.com/) and paste this code into the console

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
```

Once this is done your **token** is copied into your __paper-press__.

## ✔️ Start

1. Linux :
  + `$ npm run start`

2. Windows : 
  + `$ npm run start`

#### You just have to do a "+help" to see all the orders!

| Type                                                                                     |                                  Description                                   |                            State                            |
|------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------:|:-----------------------------------------------------------:|
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> NitroSniper               |           Take a nitro anything it is drop                           |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> History               |                Saves all received messages, even if they are deleted                           |   <font style="font-size: 16px;">🔨</font>    |
| <img src="assets_for_readme/nice.png" width="16" vertical-align="middle"/> Crypto               |                  Allows to see in real time the prices of crypto currencies                  |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Ping               |                       Shows user latency and discord                       |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Pic               |                      Allows you to see a person's profile picture                       |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Cat               |                  Send a picture of random cat                  |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Dog               |                   Like cat but for dog                         |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Meme               |                         Like cat and dog but for meme                          |   <font style="font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> Clearme               |                     Delete your own posts from any channels                      |   <font style="font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> Spam               |                     Spam a message in a channel(s)                         |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> Cp_pp               |               Copy the pp of a person (a save of the current one is made)                |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> Cp_user               |            Copy all the information of a person (a save of you are made)             |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/nice.png" width="16" vertical-align="middle"/> Emotes               |               Lots of emotes are available!                   |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Avatar               |                     Change your avatar without the photo or gif                     |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> Bio               |                         Change your bio                         |    <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/nice.png" width="16" vertical-align="middle"/> Status               |                    Change your status                    |  <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/comic.png" width="16" vertical-align="middle"/> Aboutme               |                Change your aboutme                |   <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/good.png" width="16" vertical-align="middle"/> Info_user               |         Give some information to a user         |  <font style="color: green; font-size: 16px;">✓</font>    |
| <img src="assets_for_readme/nice.png" width="16" vertical-align="middle"/> Info_serv               |                           Give some information to a guild                           |   <font style="color: green; font-size: 16px;">✓</font>    |

# 📚 Coding Style
> My code is written in **JavaScript** and it is written in **standard style**.

###### If you have some idea send me a message : mistraleuh
<img src="assets_for_readme/banner_selfbot.png" widht="25px" height="25px">
