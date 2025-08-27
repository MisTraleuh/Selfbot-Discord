/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all info's commands, like the help, the invite, etc...
*/

import BetterMarkdown from 'discord-bettermarkdown'
import Discord from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

async function infoUser (client, message, process) {
  const user = message.mentions.users.first()
  
  if (!user) { return message.channel.send('You must mention a user') }

  await message.delete()

  const messageUser = new BetterMarkdown()

  messageUser.format('🔎 Informations to the user', 'UNDERLINE', 'RED', 'GRAY', false)

  messageUser.format('', 'BOLD', 'RED', null, false)
  messageUser.format('\n\n📝 · Username : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.username, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('📝 · Discriminator : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.discriminator, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('📝 · ID : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.id, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('📝 · Created at : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.createdAt.toLocaleString(), 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('🫂 · Mutual Guild : ', 'BOLD', 'YELLOW', null, true)

  await client.guilds.cache.filter(guild => guild.members.cache.has(user.id)).forEach(guild => {
    messageUser.format('    ' + guild.name, 'BOLD', 'BLUE', 'DARKBLUE', true)
  })
  await message.channel.send(messageUser.toCodeblock())
}

async function infoServ (client, message, process) {
  if (!message.guild) {
    return message.channel.send('This guild is not a guild server')
  }
  
  await message.delete();

  const messageGuild = new BetterMarkdown()
  const server = message.guild;
  const owner = await client.users.fetch(server.ownerId).catch(() => null);
  const serverName = server.name ? server.name : 'Unknow';
  const serverDescription = server.description ? server.description : 'No description' + '\n';
  const serverOwnerName = owner ? `${owner.username}#${owner.discriminator}` : 'Unknow#0000\n';
  const serverRegion = server.region ? server.region : 'Unknow';
  const serverCreationDate = server.createdAt.toLocaleString();
  const serverMembers = server.memberCount;
  const serverChannelsNumber = server.channels.cache.size;
  const serverRolesNumber = server.roles.cache.size;
  const serverEmojisNumber = server.emojis.cache.size;
  const serverGuildVoiceChannelsNumber = server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
  const serverGuildTextChannelsNumber = server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size

  messageGuild.format('🔎 Informations to the server', 'UNDERLINE', 'RED', 'INDIGO', false)

  messageGuild.format('', 'BOLD', 'RED', null, false)
  messageGuild.format('\n\n📝 · Name : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverName, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📄 · Description : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverDescription, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👑 · Owner : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverOwnerName, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📍 · Region : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverRegion, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📅 · Creation date : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverCreationDate, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👥 · Members : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverMembers, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('🛖 · Channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverChannelsNumber, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('😜 · Roles : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverRolesNumber, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👥 · Emojis : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverEmojisNumber, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('🔊 · Voice channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverGuildVoiceChannelsNumber, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('💬 · Text channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverGuildTextChannelsNumber, 'BOLD', 'BLUE', 'DARKBLUE', true)

  const messageToSend = messageGuild.toCodeblock()

  if (messageToSend.length > 2000) {
    const buffer = Buffer.from(messageToSend, 'utf-8');
    const attachment = new Discord.MessageAttachment(buffer, 'channels.txt');
    await message.channel.send({ files: [attachment] });
    return;
  }

  await message.channel.send(messageToSend)
}

async function infoServAll (client, message, process) {
  if (!message.guild) {
    return message.channel.send('This guild is not a guild server')
  }

  await message.delete();

  const messageGuild = new BetterMarkdown()
  const server = message.guild;
  const owner = await client.users.fetch(server.ownerId).catch(() => null);
  const serverDescription = server.description ? server.description : 'No description' + '\n';
  const ownerName = owner ? `${owner.username}#${owner.discriminator}` : 'Unknow#0000\n';
  const serverRegion = server.region ? server.region : 'Unknow';
  const serverCreationDate = server.createdAt.toLocaleString();
  const serverMembers = server.memberCount;
  const serverChannelsAll = "\n" + server.channels.cache.map(channel => `ID: ${channel.id} | Nom: ${channel.name} | Type: ${channel.type}`).join('\n');
  const serverRolesAll = "\n" + server.roles.cache.map(role => `ID: ${role.id} | Nom: ${role.name} | Couleur: ${role.hexColor}`).join('\n');
  const serverEmojisAll = "\n" + server.emojis.cache.map(emoji => `ID: ${emoji.id} | Nom: ${emoji.name} | Animé: ${emoji.animated}`).join('\n');

  messageGuild.format('🔎 Informations to the server', 'UNDERLINE', 'RED', 'INDIGO', false)

  messageGuild.format('📄 · Description : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverDescription, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👑 · Owner : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(ownerName, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📍 · Region : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverRegion, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📅 · Creation date : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverCreationDate, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👥 · Members : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverMembers, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('🛖 · Channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverChannelsAll, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('😜 · Roles : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverRolesAll, 'BOLD', 'BLUE', 'DARKBLUE', true)
 
  messageGuild.format('👥 · Emojis : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(serverEmojisAll, 'BOLD', 'BLUE', 'DARKBLUE', true)

  const messageToSend = messageGuild.toCodeblock()

  if (messageToSend.length > 2000) {
    const buffer = Buffer.from(messageToSend, 'utf-8');
    const attachment = new Discord.MessageAttachment(buffer, 'channels.txt');
    await message.channel.send({ files: [attachment] });
    return;
  }

  await message.channel.send(messageToSend)
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
      .forEach(a => a.run(client, message, process))
  }
}
