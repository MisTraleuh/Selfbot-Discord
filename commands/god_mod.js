/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** root of the project, allows to process the received command and to send it to the right function
*/

import dotenv from 'dotenv'
dotenv.config()

let nitroSniper = false
let history = false

async function checkNitroSniper (client, message, process) {
  if (message.author.id !== client.user.id) return

  const arg = message.content.split(' ')[1]
  if (arg === 'on') {
    if (nitroSniper) {
      await message.channel.send('❌ Nitro Sniper already activated')
      return
    }
    nitroSniper = true
    await message.channel.send('✅ Nitro Sniper actived')
    return
  }
  if (arg === 'off') {
    if (!nitroSniper) {
      await message.channel.send('❌ Nitro Sniper already disabled')
      return
    }
    nitroSniper = false
    await message.channel.send('✅ Nitro Sniper disabled')
  }
  await message.channel.send('Syntaxe : !??? ?? <on|off>')
}

async function checkhistory (client, message, process) {
  if (message.author.id !== client.user.id) return

  const arg = message.content.split(' ')[1]
  if (arg === 'on') {
    if (history) {
      await message.channel.send('❌ History already actived')
      return
    }
    history = true
    await message.channel.send('✅ History actived')
    return
  }
  if (arg === 'off') {
    if (!history) {
      await message.channel.send('❌ History already disabled')
      return
    }
    history = false
    await message.channel.send('✅ History disabled')
  }
  await message.channel.send('Syntaxe : !??? ?? <on|off>')
}

export default async function PREFIX_ADMIN (client, message, process) {
  if (message.content.startsWith('https://discord.gift/') && nitroSniper) {
    await message.channel.send(`<@${client.user.id}}>`)
  }

  if (message.content.startsWith(process.env.PREFIX_ADMIN)) {
    const flagAdmin = message.content.replace(process.env.PREFIX_ADMIN, '')

    if (flagAdmin.startsWith('nitrosniper')) {
      await checkNitroSniper(client, message, process)
    }

    if (flagAdmin.startsWith('history')) {
      await checkhistory(client, message, process)
    }
  }
}
