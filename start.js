/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** root of the project, allows to process the received command and to send it to the right function
*/

import { Client } from 'discord.js-selfbot-v13'
import dotenv from 'dotenv'

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

client.on('ready', async () => {
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
  PREFIX_INFOS(client, message, process)
})

client.login(process.env.TOKEN)
