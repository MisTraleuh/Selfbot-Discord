/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all hacker's commands, clearme, spam etc...
*/

import dotenv from 'dotenv'
dotenv.config()

const saveUser = []
let userAreSave = false
let savePp = ''
let ppAreSave = false

async function dmFriends (client, message, process) {
  const messageSend = message.content.split(' ')[1]

  client.users.cache.filter(user => user.relationships === 'FRIEND').forEach(a =>
    setTimeout(() => {
      a.send(messageSend)
    }, 5000))
}

async function cpUser (client, message, process) {
  const userToCopie = message.mentions.users.first()

  await message.delete()

  if (message.content.split(' ')[1] === 'reset') {
    if (saveUser.length === 0 || userAreSave === false) { return message.channel.send("❌ You don't have a recent save.") }
    try {
      await client.user.setUsername(saveUser[0], process.env.MDP)
      await client.user.setDiscriminator(saveUser[1], process.env.MDP)
      await client.user.setAboutMe(saveUser[2])
      await client.user.setAvatar(saveUser[3])
      await client.user.setBanner(saveUser[4])
      return await message.channel.send('✅ Your account has been reset.')
    } catch (e) {
      console.error(e)
      return await message.channel.send('❌ An error has occurred.')
    }
  }
  if (!userToCopie) { return message.channel.send('❌ Please indicate a user.') }
  if (userAreSave === false) {
    saveUser.push(client.user.username, client.user.discriminator, (await client.user.getProfile()).bio, client.user.avatarURL(), client.user.bannerURL())
    userAreSave = true
  }
  const allIsSet = await message.channel.send('✅ Backing up your account.')
  const chargementEnCours = await message.channel.send('📇 Copy in progress...')
  await setTimeout(() => {
    allIsSet.delete()
    chargementEnCours.delete()
  }, 2500)
  try {
    await client.user.setUsername(userToCopie.username, process.env.MDP)
    await client.user.setAboutMe((await userToCopie.getProfile()).bio)
    await client.user.setAvatar(userToCopie.avatarURL())
    await client.user.setBanner(userToCopie.bannerURL())
  } catch (e) {
    console.error(e)
    return message.channel.send('❌ An error occurred while copying the account.')
  }
}

async function cpPp (client, message, process) {
  const ppToCopie = message.mentions.users.first()

  await message.delete()

  if (message.content.split(' ')[1] === 'reset') {
    if (savePp.length === 0 || ppAreSave === false) { return message.channel.send('❌ You do not have a recent save.') }
    client.user.setAvatar(savePp)
    const messageSave = await message.channel.send('✅ Your avatar has been reset.')
    await setTimeout(() => { messageSave.delete() }, 2500)
    return
  }
  if (!ppToCopie) { return message.channel.send('❌ Please indicate a user.') }
  if (ppAreSave === false) {
    savePp = await client.user.avatarURL()
    ppAreSave = true
    const allIsSet = await message.channel.send('✅ Saving your avatar.')
    await setTimeout(() => { allIsSet.delete() }, 2500)
  }
  const loading = await message.channel.send('📇 Copy in progress...')
  await setTimeout(() => { loading.delete() }, 2500)
  try {
    await client.user.setAvatar(ppToCopie.displayAvatarURL())
  } catch (e) {
    console.error(e)
    return message.channel.send('❌ An error occurred while copying the avatar.')
  }
}

async function spam (client, message, process) {
  const aSpam = message.content.split(' ')[1]

  await message.delete()

  if (!aSpam) { return message.channel.send('❌ Please indicate a message to send.') }

  while (true) { message.channel.send(aSpam) }
}

async function clearme (client, message, process) {
  const args = message.content.split(' ')

  await message.delete()

  if (!args[1] || isNaN(Number.parseInt(args[1]))) { 
    return message.channel.send('❌ Please indicate a number of messages to delete.') 
  }

  if (parseInt(args[1]) > 100) { 
    return message.channel.send('❌ You can only delete up to 100 messages at a time.') 
  }
  
  if (parseInt(args[1]) < 1) { 
    return message.channel.send('❌ You must delete at least 1 message.') 
  }

  try {
    const messages = await message.channel.messages.fetch({ limit: parseInt(args[1]) })
    
    const myDeletableMessages = messages.filter(msg => 
      msg.author.id === client.user.id && 
      msg.deletable &&
      msg.type === 'DEFAULT'
    )

    let deletedCount = 0
    
    for (const msg of myDeletableMessages.values()) {
      try {
        await msg.delete()
        deletedCount++
      } catch (error) {}
    }

    const allIsDelete = await message.channel.send(`✅ Deletion of ${deletedCount} messages.`)
    setTimeout(() => { allIsDelete.delete() }, 2500)
    
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error)
    message.channel.send('❌ An error occurred while deleting messages.')
  }
}

const tests = [
  {
    test: a => a.startsWith('clearme'),
    run: clearme
  },
  {
    test: a => a.startsWith('spam'),
    run: spam
  },
  {
    test: a => a.startsWith('cp_pp'),
    run: cpPp
  },
  {
    test: a => a.startsWith('cp_user'),
    run: cpUser
  },
  {
    test: a => a.startsWith('dm_friends'),
    run: dmFriends
  }
]

export default async function PREFIX_HACKER (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_HACKER}`)) {
    const hackerFlag = message.content.replace(`${process.env.PREFIX_HACKER}`, '')

    tests.filter(a => a.test(hackerFlag))
      .forEach(a => a.run(client, message, process))
  }
}
