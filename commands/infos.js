/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all info's commands, like the help, the invite, etc...
*/

import BetterMarkdown from 'discord-bettermarkdown'

import dotenv from 'dotenv'
dotenv.config()

async function infoUser (client, message, process) {
  const user = message.mentions.users.first()

  if (!user) { return message.channel.send('You must mention a user') }

  const messageUser = new BetterMarkdown()

  messageUser.format('🔎 Informations to the user', 'UNDERLINE', 'RED', 'INDIGO', false)

  messageUser.format('', 'BOLD', 'RED', null, false)
  messageUser.format('\n\n📝 · Username : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.username, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('📝 · Discriminator : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.discriminator, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('📝 · ID : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.id, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageUser.format('📝 · Created at : ', 'BOLD', 'YELLOW', null, false)
  messageUser.format(user.createdAt.toLocaleString(), 'BOLD', 'BLUE', 'DARKBLUE', true)

  await message.channel.send(messageUser.toCodeblock())
}

async function infoServ (client, message, process) {
  const messageGuild = new BetterMarkdown()

  if (!message.guild) { return message.channel.send('This guild is not a guild server') }

  const server = message.guild

  const owner = client.users.cache.find(user => user.id === server.ownerId)

  messageGuild.format('🔎 Informations to the server', 'UNDERLINE', 'RED', 'INDIGO', false)

  messageGuild.format('', 'BOLD', 'RED', null, false)
  messageGuild.format('\n\n📝 · Name : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.name, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📄 · Description : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.description, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👑 · Owner : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(owner.username + '#' + owner.discriminator, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📍 · Region : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.region, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('📅 · Creation date : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.createdAt.toLocaleString(), 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👥 · Members : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.memberCount, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('🛖 · Channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.channels.cache.size, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('😜 · Roles : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.roles.cache.size, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('👥 · Emojis : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.emojis.cache.size, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('🔊 · Voice channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size, 'BOLD', 'BLUE', 'DARKBLUE', true)

  messageGuild.format('💬 · Text channels : ', 'BOLD', 'YELLOW', null, false)
  messageGuild.format(server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size, 'BOLD', 'BLUE', 'DARKBLUE', true)

  await message.channel.send(messageGuild.toCodeblock())
}

const tests = [
  {
    test: a => a.startsWith('infouser'),
    run: infoUser
  },
  {
    test: a => a.startsWith('infoserv'),
    run: infoServ
  }
]

export default async function PREFIX_INFOS (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_INFOS}`)) {
    const args = message.content.replace(`${process.env.PREFIX_INFOS}`, '')

    tests.filter(a => a.test(args))
      .forEach(a => a.run(client, message, process))
  }
}
