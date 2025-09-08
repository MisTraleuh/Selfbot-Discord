/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** root of the project, allows to process the received command and to send it to the right function
*/

import { Client } from 'discord.js-selfbot-v13'
import dotenv from 'dotenv'
import PresenceDatabase from './database.js'

import allHelps from './commands/help.js'
import PREFIX_CRYPTO from './commands/crypto.js'
import PREFIX_FUN from './commands/fun.js'
import PREFIX_HACKER from './commands/hacker.js'
import PREFIX_EMOTES from './commands/emotes.js'
import PREFIX_PERSO from './commands/perso.js'
import PREFIX_INFOS from './commands/infos.js'
import PREFIX_ADMIN from './commands/admin.js'

dotenv.config()
const client = new Client()
const presenceDB = new PresenceDatabase()

client.on('ready', async () => {
  await presenceDB.init()

  console.log('\x1b[33m%s\x1b[0m', '                      ╔═════════════════════╗')
  console.log('\x1b[33m                      ║\x1b[0m', '\x1b[32m╔╦╗╦╔═╗╔╦╗╦═╗╔═╗╦ ╦\x1b[0m', '\x1b[33m║\x1b[0m')
  console.log('\x1b[33m                      ║\x1b[0m', '\x1b[32m║║║║╚═╗ ║ ╠╦╝║ ║║ ║\x1b[0m', '\x1b[33m║\x1b[0m')
  console.log('\x1b[33m                      ║\x1b[0m', '\x1b[32m╩ ╩╩╚═╝ ╩ ╩╚═╚═╝╚═╝\x1b[0m', '\x1b[33m║\x1b[0m')
  console.log('\x1b[33m%s\x1b[0m', '                      ╚═════════════════════╝')
  console.log('                   Connecté à', `\x1b[36m${client.user.tag}\x1b[0m`)
  console.log('               ID de', `\x1b[35m${client.user.tag}\x1b[0m`, ':', `\x1b[31m${client.user.id}\x1b[0m`)
  console.log('       Avatar de', `\x1b[33m${client.user.tag}\x1b[0m`, ':', `\x1b[34m${client.user.avatar}\x1b[36m`)
})

client.on('messageCreate', async message => {
  PREFIX_ADMIN(client, message, process)
  if (message.author.id !== client.user.id) return
  allHelps(client, message, process)
  PREFIX_CRYPTO(client, message, process)
  PREFIX_FUN(client, message, process)
  PREFIX_HACKER(client, message, process)
  PREFIX_EMOTES(client, message, process)
  PREFIX_PERSO(client, message, process)
  PREFIX_INFOS(client, message, process, presenceDB)
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  if (!newPresence?.user) return
  
  if (oldPresence && oldPresence.status === newPresence.status) {
    return
  }

  console.log(`🔄 Changement de présence pour ${newPresence.user.username}`)

  const userData = {
    userId: newPresence.user.id,
    username: newPresence.user.username,
    status: newPresence.status,
    timestamp: new Date(),
    guildId: newPresence.guild?.id || null,
    activities: newPresence.activities.map(activity => ({
      name: activity.name,
      type: activity.type,
      details: activity.details,
      state: activity.state
    }))
  }

  try {
    await presenceDB.savePresenceChange(userData, oldPresence)
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde en DB:', error)
  }
});

process.on('SIGINT', async () => {
  console.log('\n🔄 Arrêt en cours...')
  await presenceDB.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🔄 Arrêt en cours...')
  await presenceDB.close()
  process.exit(0)
})

client.login(process.env.TOKEN)
