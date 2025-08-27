/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all info's commands, like the help, the invite, etc...
*/

import { WebEmbed } from 'discord.js-selfbot-v13'
import Discord from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

async function infoUser (client, message, process) {
  const user = message.mentions.users.first()
  
  if (!user) { return message.channel.send('You must mention a user') }

  const username = user.username
  const discriminator = user.discriminator
  const id = user.id
  const createdAt = user.createdAt.toLocaleString()
  const mutualGuilds = client.guilds.cache.filter(guild => guild.members.cache.has(user.id)).map(guild => guild.name).join(', ')

  let messageToSend = `
📝 · Username : ${username}
📝 · Discriminator : ${discriminator}
📝 · ID : ${id}
📝 · Created at : ${createdAt}
🫂 · Mutual Guild : ${mutualGuilds ? mutualGuilds : 'None'}
    `

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🔎 Informations about the user 🔎')
    .setColor('#FF69B4')
    .setDescription(messageToSend)

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function infoServ (client, message, process) {
  if (!message.guild) {
    return message.channel.send('This guild is not a guild server')
  }

  const server = message.guild;
  const owner = await client.users.fetch(server.ownerId).catch(() => null);
  const serverName = server.name ? server.name : 'Unknow';
  const serverDescription = server.description ? server.description : 'N/A';
  const serverOwnerName = owner ? `${owner.username}#${owner.discriminator}` : 'Unknow#0000';
  const serverRegion = server.region ? server.region : 'Unknow';
  const serverCreationDate = server.createdAt.toLocaleString();
  const serverMembers = server.memberCount;
  const serverChannelsNumber = server.channels.cache.size;
  const serverRolesNumber = server.roles.cache.size;
  const serverEmojisNumber = server.emojis.cache.size;
  const serverGuildVoiceChannelsNumber = server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
  const serverGuildTextChannelsNumber = server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size

  let messageToSend = `
📝 · Name : ${serverName}
📄 · Description : ${serverDescription}
👑 · Owner : ${serverOwnerName}
📍 · Region : ${serverRegion}
📅 · Creation date : ${serverCreationDate}
👥 · Members : ${serverMembers}
🛖 · Channels : ${serverChannelsNumber}
😜 · Roles : ${serverRolesNumber}
👥 · Emojis : ${serverEmojisNumber}
🔊 · Voice channels : ${serverGuildVoiceChannelsNumber}
💬 · Text channels : ${serverGuildTextChannelsNumber}
    `

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🔎 Informations about the server 🔎')
    .setColor('#FF69B4')
    .setDescription(messageToSend)

    
    if (messageToSend.length > 2000) {
      const buffer = Buffer.from(messageToSend, 'utf-8');
      const attachment = new Discord.MessageAttachment(buffer, 'channels.txt');
      await message.channel.send({ files: [attachment] });
      return;
    } else {
      message.channel.send({
        content: `${WebEmbed.hiddenEmbed}${embed}`,
      })
    }
}

async function infoServAll (client, message, process) {
  if (!message.guild) {
    return message.channel.send('This guild is not a guild server')
  }

  const server = message.guild;
  const owner = await client.users.fetch(server.ownerId).catch(() => null);
  const serverName = server.name ? server.name : 'Unknow';
  const serverDescription = server.description ? server.description : 'No description' + '\n';
  const ownerName = owner ? `${owner.username}#${owner.discriminator}` : 'Unknow#0000\n';
  const serverRegion = server.region ? server.region : 'Unknow';
  const serverCreationDate = server.createdAt.toLocaleString();
  const serverMembers = server.memberCount;
  const serverChannelsAll = "\n" + server.channels.cache.map(channel => `ID: ${channel.id} | Nom: ${channel.name} | Type: ${channel.type}`).join('\n');
  const serverRolesAll = "\n" + server.roles.cache.map(role => `ID: ${role.id} | Nom: ${role.name} | Couleur: ${role.hexColor}`).join('\n');
  const serverEmojisAll = "\n" + server.emojis.cache.map(emoji => `ID: ${emoji.id} | Nom: ${emoji.name} | Animé: ${emoji.animated}`).join('\n');

  let messageToSend = `
🔎 All Informations about the server 🔎
📝 · Name : ${serverName}
📄 · Description : ${serverDescription}
👑 · Owner : ${ownerName}
📍 · Region : ${serverRegion}
📅 · Creation date : ${serverCreationDate}
👥 · Members : ${serverMembers}
🛖 · Channels :
${serverChannelsAll}
😜 · Roles :
${serverRolesAll}
👥 · Emojis :
${serverEmojisAll}
    `

  const buffer = Buffer.from(messageToSend, 'utf-8');
  const attachment = new Discord.MessageAttachment(buffer, 'channels.txt');
  await message.channel.send({ files: [attachment] });

}

const tests = [
  {
    test: a => a.startsWith('infouser'),
    run: infoUser
  },
  {
    test: a => a == 'infoserv',
    run: infoServ
  },
  {
    test: a => a == 'infoservall',
    run: infoServAll
  }
]

export default async function PREFIX_INFOS (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_INFOS}`)) {
    const args = message.content.replace(`${process.env.PREFIX_INFOS}`, '')

    tests.filter(a => a.test(args))
      .forEach(async (a) => {
        await message.delete()
        await a.run(client, message, process);
      })
  }
}
