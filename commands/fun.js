/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all fun's commands, like the ping, etc...
*/

import axios from 'axios'
import dotoenv from 'dotenv'
dotoenv.config()

async function meme (client, message, process) {
  axios.get('https://some-random-api.ml/meme').then(reponse => {
    message.channel.send(reponse.data.image)
  })
}

async function dog (client, message, process) {
  axios.get('https://api.thedogapi.com/v1/images/search').then(reponse => {
    message.channel.send(reponse.data[0].url)
  })
}

async function cat (client, message, process) {
  axios.get('https://api.thecatapi.com/v1/images/search').then(reponse => {
    message.channel.send(reponse.data[0].url)
  })
}

async function pic (client, message, process) {
  const user = message.mentions.users.first()

  await message.delete()

  await message.channel.send(user ? user.displayAvatarURL() : "❌ I can't find this user")
}

async function ping (client, message, process) {
  const messageTestPing = await message.channel.send('🏓 Ping test...')

  await messageTestPing.edit(`✅ Latence: ${messageTestPing.createdTimestamp - message.createdTimestamp}ms.`)
}

async function banner (client, message, process) {
  const user = message.mentions.users.first()

  await message.delete()

  try {
    await message.channel.send(user ? user.bannerURL() : "❌ I can't find this user")
  } catch (error) {
    await message.channel.send('❌ An error has occured')
  }
}

const tests = [
  {
    test: a => a.startsWith('banner'),
    run: banner
  },
  {
    test: a => a === 'ping',
    run: ping
  },
  {
    test: a => a.startsWith('pic'),
    run: pic
  },
  {
    test: a => a === 'cat',
    run: cat
  },
  {
    test: a => a === 'dog',
    run: dog
  },
  {
    test: a => a === 'meme',
    run: meme
  }
]

export default async function PREFIX_FUN (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_FUN}`)) {
    const funFlag = message.content.replace(`${process.env.PREFIX_FUN}`, '')

    tests.filter(a => a.test(funFlag))
      .forEach(a => a.run(client, message, process))
  }
}
