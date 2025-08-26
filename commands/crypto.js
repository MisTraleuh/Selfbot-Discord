/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all crypto's commands, like the prize of bitcoin or the price of ethereum, etc...
*/

import axios from 'axios'
import { WebEmbed } from 'discord.js-selfbot-v13'

import dotenv from 'dotenv'
dotenv.config()

const monnaie = ['USD', 'EUR', 'GBP', 'CHF', 'AUD', 'RUB']

async function ada (client, message) {
  const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ADA&tsyms=${monnaie.join(',')}`)

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('💷 Cardano price 💷')
    .setImage('https://images.squarespace-cdn.com/content/v1/551ddcb9e4b0d9e1728a296d/1536878221362-67ZF87XNBI0WW37QFCED/cardano_logo_zoom3.gif')
    .setDescription(`
📊 · Current price of Cardano in USD: ${response.data.USD}$
💶 · Current price of Cardano in EUR: ${response.data.EUR}€
💷 · Current price of Cardano in GBP: ${response.data.GBP}£
💴 · Current price of Cardano in CHF: ${response.data.CHF}CHF
💵 · Current price of Cardano in AUD: ${response.data.AUD}A$
💸 · Current price of Cardano in RUB: ${response.data.RUB}₽
`)
    .setColor('#FF69B4')

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function xrp (client, message) {
  const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=${monnaie.join(',')}`)

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('💶 XRP price 💶')
    .setImage('https://cdn.dribbble.com/userupload/42018633/file/original-d74c4e973cca28bee31b68a05b096cb7.gif')
    .setDescription(`
📊 · Current price of XRP in USD: ${response.data.USD}$
💶 · Current price of XRP in EUR: ${response.data.EUR}€
💷 · Current price of XRP in GBP: ${response.data.GBP}£
💴 · Current price of XRP in CHF: ${response.data.CHF}CHF
💵 · Current price of XRP in AUD: ${response.data.AUD}A$
💸 · Current price of XRP in RUB: ${response.data.RUB}₽
`)
    .setColor('#FF69B4')

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function ltc (client, message) {
  const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=${monnaie.join(',')}`)

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('💵 Litecoin price 💵')
    .setImage('https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyb2VhbzNxeWt2N3RzMXVvbTltNDZtYTdwa3U5NnFycThneno3YWVzdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xULW8imgOopU62dFkc/200w.gif')
    .setDescription(`
📊 · Current price of Litecoin in USD: ${response.data.USD}$
💶 · Current price of Litecoin in EUR: ${response.data.EUR}€
💷 · Current price of Litecoin in GBP: ${response.data.GBP}£
💴 · Current price of Litecoin in CHF: ${response.data.CHF}CHF
💵 · Current price of Litecoin in AUD: ${response.data.AUD}A$
💸 · Current price of Litecoin in RUB: ${response.data.RUB}₽
`)
    .setColor('#FF69B4')

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function eth (client, message) {
  const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${monnaie.join(',')}`)

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('💴 Ethereum price 💴')
    .setImage('https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyZTE5MmQ1NXdidGVsYTkxcGxmd213MmU3MjFja2t4cWZwMGNjaGdiZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/L59aKIC2MFyfUfrz3n/200w.gif')
    .setDescription(`
📊 · Current price of Ethereum in USD: ${response.data.USD}$
💶 · Current price of Ethereum in EUR: ${response.data.EUR}€
💷 · Current price of Ethereum in GBP: ${response.data.GBP}£
💴 · Current price of Ethereum in CHF: ${response.data.CHF}CHF
💵 · Current price of Ethereum in AUD: ${response.data.AUD}A$
💸 · Current price of Ethereum in RUB: ${response.data.RUB}₽
`)
    .setColor('#FF69B4')

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

async function btc (client, message) {

  const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${monnaie.join(',')}`);

  const embed = new WebEmbed()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() }) 
    .setTitle('🪙 Bitcoin price 🪙')
    .setImage('https://c.tenor.com/y0SIaspW0E8AAAAd/cyberhornet-nest.gif')
    .setDescription(`
📊 · Current price of Bitcoin in USD: ${response.data.USD}$
💶 · Current price of Bitcoin in EUR: ${response.data.EUR}€
💷 · Current price of Bitcoin in GBP: ${response.data.GBP}£
💴 · Current price of Bitcoin in CHF: ${response.data.CHF}CHF
💵 · Current price of Bitcoin in AUD: ${response.data.AUD}A$
💸 · Current price of Bitcoin in RUB: ${response.data.RUB}₽
`)
    .setColor('#FF69B4')

  message.channel.send({
    content: `${WebEmbed.hiddenEmbed}${embed}`,
  })
}

const crypto = {
  btc,
  eth,
  ltc,
  xrp,
  ada
}

export default async function PREFIX_CRYPTO (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_CRYPTO}`)) {
    const flagCrypto = message.content.slice(process.env.PREFIX_CRYPTO.length).trim().toLowerCase()

    const command = crypto[flagCrypto]
    if (command) {
      await command(client, message)
      await message.delete()
    }
  }
}
