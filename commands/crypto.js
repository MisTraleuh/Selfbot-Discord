/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all crypto's commands, like the prize of bitcoin or the price of ethereum, etc...
*/

import BetterMarkdown from 'discord-bettermarkdown'
import axios from 'axios'

import dotenv from 'dotenv'
dotenv.config()

let valueBtc = 0
let valueEth = 0
let valueLtc = 0
let valueXrp = 0
let valueAda = 0
const monnaie = ['USD', 'EUR', 'GBP', 'CHF', 'AUD', 'RUB']

async function ada (client, message, process) {
  const markdownAda = new BetterMarkdown()

  await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ADA&tsyms=${monnaie.join(',')}`).then(r => {
    const color = valueAda <= r.data.USD ? 'GREEN' : 'RED'

    valueAda = valueAda <= r.data.USD ? r.data.USD : valueAda

    monnaie.forEach(crypto => {
      markdownAda.format(`${color === 'GREEN' ? '📈' : '📉'} Price of Cardano in ${crypto}: ${r.data[crypto]}$`, 'BOLD', color, 'DARKBLUE', true)
    })
  })
  await message.channel.send('https://images.squarespace-cdn.com/content/v1/551ddcb9e4b0d9e1728a296d/1536878221362-67ZF87XNBI0WW37QFCED/cardano_logo_zoom3.gif')
  await message.channel.send(markdownAda.toCodeblock())
}

async function xrp (client, message, process) {
  const markdownXrp = new BetterMarkdown()

  await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=${crypto.join(',')}`).then(r => {
    const color = valueXrp <= r.data.USD ? 'GREEN' : 'RED'

    valueXrp = valueXrp <= r.data.USD ? r.data.USD : valueXrp

    monnaie.forEach(crypto => {
      markdownXrp.format(`${color === 'GREEN' ? '📈' : '📉'} Price of XRP in ${crypto}: ${r.data[crypto]}$`, 'BOLD', color, 'DARKBLUE', true)
    })
  })
  await message.channel.send('https://i0.wp.com/www.xrparcade.com/wp-content/uploads/2020/06/xrptransfer-img.gif?resize=300%2C300&ssl=1')
  await message.channel.send(markdownXrp.toCodeblock())
}

async function ltc (client, message, process) {
  const markdownLtc = new BetterMarkdown()

  await axios.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD,EUR,GBP,CHF,AUD,RUB').then(r => {
    const color = valueLtc <= r.data.USD ? 'GREEN' : 'RED'

    valueLtc = valueLtc <= r.data.USD ? r.data.USD : valueLtc

    monnaie.forEach(crypto => {
      markdownLtc.format(`${color === 'GREEN' ? '📈' : '📉'} Price of Litecoin in ${crypto}: ${r.data[crypto]}$`, 'BOLD', color, 'DARKBLUE', true)
    })
  })
  await message.channel.send('https://discover.luno.com/wp-content/uploads/BLOG_LTC_ANNOUNCE.gif')
  await message.channel.send(markdownLtc.toCodeblock())
}

async function eth (client, message, process) {
  const markdownEth = new BetterMarkdown()

  await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,GBP,CHF,AUD,RUB').then(r => {
    const color = valueEth <= r.data.USD ? 'GREEN' : 'RED'

    valueEth = valueEth <= r.data.USD ? r.data.USD : valueEth

    monnaie.forEach(crypto => {
      markdownEth.format(`${color === 'GREEN' ? '📈' : '📉'} Price of Ethereum in ${crypto}: ${r.data[crypto]}$`, 'BOLD', color, 'DARKBLUE', true)
    })
  })
  await message.channel.send('https://c.tenor.com/Q5e7EFiLLVMAAAAC/ethereum.gif')
  await message.channel.send(markdownEth.toCodeblock())
}

async function btc (client, message, process) {
  const markdownBtc = new BetterMarkdown()

  await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR,GBP,CHF,AUD,RUB').then(r => {
    const color = valueBtc <= r.data.USD ? 'GREEN' : 'RED'

    valueBtc = valueBtc <= r.data.USD ? r.data.USD : valueBtc

    monnaie.forEach(crypto => {
      markdownBtc.format(`${color === 'GREEN' ? '📈' : '📉'} Price of Bitcoin in ${crypto}: ${r.data[crypto]}$`, 'BOLD', color, 'DARKBLUE', true)
    })
  })
  await message.channel.send('https://c.tenor.com/y0SIaspW0E8AAAAd/cyberhornet-nest.gif')
  await message.channel.send(markdownBtc.toCodeblock())
}

const crypto = {
  btc,
  eth,
  ltc,
  xrp,
  ada
}

export default async function PREFIX_CRYPTO (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_CRYPTO}crypto`)) {
    const flagCrypto = message.content.split(' ')[1]

    const command = crypto[flagCrypto]
    if (command) {
      await command(client, message, process)
      await message.delete()
    }
  }
}
