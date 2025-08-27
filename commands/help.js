/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all helps commands, for commands explications
*/

import { WebEmbed } from 'discord.js-selfbot-v13'

import dotenv from 'dotenv'
dotenv.config()

async function helpNormal (client, message, process) {

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Help Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
Here the avaible command:
🤖 · [${process.env.PREFIX_NORMAL}]help : displays the current prefixes
💷 · [${process.env.PREFIX_CRYPTO}]help : displays all crypto commands
😂 · [${process.env.PREFIX_FUN}]help : displays all fun commands
🥷 · [${process.env.PREFIX_HACKER}]help : displays all hacker commands
😃 · [${process.env.PREFIX_EMOTES}]help : displays all emotes commands
🫂 · [${process.env.PREFIX_PERSO}]help : displays all perso commands
🚀 · [${process.env.PREFIX_INFOS}]help : displays all infos commands
  `)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpCrypto (client, message, process) {
  
  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Cryptos Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
🪙 · [${process.env.PREFIX_CRYPTO}]btc : Get the current price of btc
💴 · [${process.env.PREFIX_CRYPTO}]eth : Get the current price of eth
💵 · [${process.env.PREFIX_CRYPTO}]ltc : Get the current price of ltc
💶 · [${process.env.PREFIX_CRYPTO}]xrp : Get the current price of xrp
💷 · [${process.env.PREFIX_CRYPTO}]ada : Get the current price of ada
`)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpFun (client, message, process) {

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Funs Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
🏓 · [${process.env.PREFIX_FUN}]ping : check latency
📷 · [${process.env.PREFIX_FUN}]pic <mention> : send the profile picture of the mentionned user
😺 · [${process.env.PREFIX_FUN}]cat : send a random cat
🐶 · [${process.env.PREFIX_FUN}]dog : send a random dog
😜 · [${process.env.PREFIX_FUN}]meme : send a random meme
`)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpHacker (client, message, process) {
  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Hackers Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
🧹 · [${process.env.PREFIX_HACKER}]clearme <number> : deletes your messages
📨 · [${process.env.PREFIX_HACKER}]spam <message> : spam the message
📝 · [${process.env.PREFIX_HACKER}]cp_pp <mention> : copy the profile picture of mentionned user
📚 · [${process.env.PREFIX_HACKER}]cp_user <mention> : copy all informations of mentionned user
📤 · [${process.env.PREFIX_HACKER}]dm_friends <message> : send the message to all your friends
`)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpEmotes (client, message, process) {

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Emotes Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
🤣 · [${process.env.PREFIX_EMOTES}]mdr
😂 · [${process.env.PREFIX_EMOTES}]lol
🤭 · [${process.env.PREFIX_EMOTES}]oups
💗 · [${process.env.PREFIX_EMOTES}]love
💩 · [${process.env.PREFIX_EMOTES}]ntm
🤔 · [${process.env.PREFIX_EMOTES}]wtf
🤯 · [${process.env.PREFIX_EMOTES}]pff
🤮 · [${process.env.PREFIX_EMOTES}]cringe
💈 · [${process.env.PREFIX_EMOTES}]feur
💯 · [${process.env.PREFIX_EMOTES}]perfect
🤫 · [${process.env.PREFIX_EMOTES}]tg
`)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpPerso (client, message, process) {

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Personnal Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
🖼️ · [${process.env.PREFIX_PERSO}]avatar <url> : replace your pdp with url
📄 · [${process.env.PREFIX_PERSO}]bio <message> : replace your bio
📊 · [${process.env.PREFIX_PERSO}]status <AVAILABLE/IDLE/DND/INVISBLE>
🖊️ · [${process.env.PREFIX_PERSO}]activity <playing/streaming/watching>
`)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpInfos (client, message, process) {

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Infos Commands 🤖')
    .setColor('#FF69B4')
    .setDescription(`
💁🏻 · [${process.env.PREFIX_INFOS}]infouser <mention> : send informations about mentionned user
ℹ️ · [${process.env.PREFIX_INFOS}]infoserv : send informations about the server
`)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function helpAdmin (client, message, process) {
  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Privates Commands 🤖')
    .setDescription(`
🪄 · [${process.env.PREFIX_ADMIN}]nitrosniper <on/off> : take the nitro when droped in any chat
🧐 · [${process.env.PREFIX_ADMIN}]history <on/off> : save message sended (even those deleted)
🧐 · [${process.env.PREFIX_ADMIN}]view <id/mention> : view all message sended by the id/mention (even those deleted, ONLY IF HISTORY IS ENABLED)

`)
    .setColor('#FF69B4')

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

const tests = [
  {
    test: a => a == `${process.env.PREFIX_NORMAL}help`,
    run: helpNormal,
  },
  {
    test: a => a == `${process.env.PREFIX_CRYPTO}help`,
    run: helpCrypto,
  },
  {
    test: a => a == `${process.env.PREFIX_FUN}help`,
    run: helpFun,
  },
  {
    test: a => a == `${process.env.PREFIX_HACKER}help`,
    run: helpHacker,
  },
  {
    test: a => a == `${process.env.PREFIX_EMOTES}help`,
    run: helpEmotes,
  },
  {
    test: a => a == `${process.env.PREFIX_PERSO}help`,
    run: helpPerso,
  },
  {
    test: a => a == `${process.env.PREFIX_INFOS}help`,
    run: helpInfos,
  },
]

export default async function allHelps (client, message, process) {
  tests.filter(a => a.test(message.content))
    .forEach(async (a) => {
      await message.delete()
      await a.run(client, message, process)
    });
}
