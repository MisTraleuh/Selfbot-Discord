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
  if (message.content === `${process.env.PREFIX_NORMAL}help`) {

    await message.delete()

    const embed = new WebEmbed()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
      .setTitle('🤖 Mistrou Selfbot - Help Commands 🤖')
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
    .setColor('#FF69B4')
    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpCrypto (client, message, process) {
  if (message.content === `${process.env.PREFIX_CRYPTO}help`) {

    await message.delete()

    const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🤖 Mistrou Selfbot - Cryptos Commands 🤖')
    .setDescription(`
🪙 · [${process.env.PREFIX_CRYPTO}]crypto btc : Get the current price of btc
💴 · [${process.env.PREFIX_CRYPTO}]crypto eth : Get the current price of eth
💵 · [${process.env.PREFIX_CRYPTO}]crypto ltc : Get the current price of ltc
💶 · [${process.env.PREFIX_CRYPTO}]crypto xrp : Get the current price of xrp
💷 · [${process.env.PREFIX_CRYPTO}]crypto ada : Get the current price of ada
`)
    .setColor('#FF69B4')

    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpFun (client, message, process) {
  if (message.content === `${process.env.PREFIX_FUN}help`) {

    const embed = new WebEmbed()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
      .setTitle('🤖 Mistrou Selfbot - Funs Commands 🤖')
      .setDescription(`
🏓 · [${process.env.PREFIX_FUN}]ping : check latency
📷 · [${process.env.PREFIX_FUN}]pic <mention> : send the profile picture of the mentionned user
😺 · [${process.env.PREFIX_FUN}]cat : send a random cat
🐶 · [${process.env.PREFIX_FUN}]dog : send a random dog
😜 · [${process.env.PREFIX_FUN}]meme : send a random meme
`)
      .setColor('#FF69B4')

    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpHacker (client, message, process) {
  if (message.content === `${process.env.PREFIX_HACKER}help`) {

    await message.delete()

    const embed = new WebEmbed()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
      .setTitle('🤖 Mistrou Selfbot - Hackers Commands 🤖')
      .setDescription(`
🧹 · [${process.env.PREFIX_HACKER}]clearme <number> : deletes your messages
📨 · [${process.env.PREFIX_HACKER}]spam <message> : spam the message
📝 · [${process.env.PREFIX_HACKER}]cp_pp <mention> : copy the profile picture of mentionned user
📚 · [${process.env.PREFIX_HACKER}]cp_user <mention> : copy all informations of mentionned user
📤 · [${process.env.PREFIX_HACKER}]dm_friends <message> : send the message to all your friends
`)
      .setColor('#FF69B4')

    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpEmotes (client, message, process) {
  if (message.content === `${process.env.PREFIX_EMOTES}help`) {

    await message.delete()

    const embed = new WebEmbed()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
      .setTitle('🤖 Mistrou Selfbot - Emotes Commands 🤖')
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
      .setColor('#FF69B4')

    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpPerso (client, message, process) {
  if (message.content === `${process.env.PREFIX_PERSO}help`) {

    await message.delete()

    const embed = new WebEmbed()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
      .setTitle('🤖 Mistrou Selfbot - Personnal Commands 🤖')
      .setDescription(`
🖼️ · [${process.env.PREFIX_PERSO}]avatar <url> : replace your pdp with url
📄 · [${process.env.PREFIX_PERSO}]bio <message> : replace your bio
📊 · [${process.env.PREFIX_PERSO}]status <AVAILABLE/IDLE/DND/INVISBLE>
🖊️ · [${process.env.PREFIX_PERSO}]activity <playing/streaming/watching>
`)
      .setColor('#FF69B4')

    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpInfos (client, message, process) {
  if (message.content === `${process.env.PREFIX_INFOS}help`) {

    await message.delete()

    const embed = new WebEmbed()
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
      .setTitle('🤖 Mistrou Selfbot - Infos Commands 🤖')
      .setDescription(`
💁🏻 · [${process.env.PREFIX_INFOS}]infouser <mention> : send informations about mentionned user
ℹ️ · [${process.env.PREFIX_INFOS}]infoserv : send informations about the server
`)
      .setColor('#FF69B4')

    message.channel.send({
      content: `${WebEmbed.hiddenEmbed}${embed}`,
    })
  }
}

async function helpAdmin (client, message, process) {
  if (message.content === `${process.env.PREFIX_ADMIN}help`) {

    await message.delete()

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
}

export default async function allHelps (client, message, process) {
  helpNormal(client, message, process)
  helpCrypto(client, message, process)
  helpFun(client, message, process)
  helpHacker(client, message, process)
  helpEmotes(client, message, process)
  helpPerso(client, message, process)
  helpInfos(client, message, process)
  helpAdmin(client, message, process)
}
