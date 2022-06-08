/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** all emotes commands, like the mdr, etc...
*/
import dotenv from 'dotenv'
dotenv.config()

async function tg (message, flag) {
  message.channel.send('https://tenor.com/view/potatoz-netflix-meme-ta-gueule-tg-gif-17392380 ')
}

async function perfect (message, flag) {
  message.channel.send('https://tenor.com/view/mr-bean-thank-you-perfect-superbe-g%C3%A9nial-gif-16654157')
}

async function feur (message, flag) {
  message.channel.send('https://tenor.com/view/feur-theobabac-quoi-gif-24294658')
}

async function cringe (message, flag) {
  message.channel.send('https://tenor.com/view/academy-awards-oscars-chrissy-teigen-cringe-yuck-gif-5134244')
}

async function pff (message, flag) {
  message.channel.send('https://tenor.com/view/no-way-pfff-gaga-lol-gif-18633881')
}

async function wtf (message, flag) {
  message.channel.send('https://tenor.com/view/wtf-is-going-on-here-confused-reading-it-cant-be-shocked-gif-17571504')
}

async function ntm (message, flag) {
  message.channel.send('https://tenor.com/view/ntm-nique-ta-mere-fuck-your-mother-doctor-fate-parody-gif-16289013')
}

async function love (message, flag) {
  message.channel.send('https://tenor.com/view/baby-yoda-cute-love-gif-24697410')
}

async function oups (message, flag) {
  message.channel.send('https://tenor.com/view/go-away-oops-awkward-big-eyes-gif-16408506')
}

async function lol (message, flag) {
  message.channel.send('https://tenor.com/view/wow-damn-ok-jesus-relax-gif-15745880')
}

async function mdr (message, flag) {
  message.channel.send('https://tenor.com/view/spit-take-laugh-lmao-gif-9271200')
}

const emotes = {
  mdr,
  lol,
  oups,
  love,
  ntm,
  wtf,
  pff,
  cringe,
  feur,
  perfect,
  tg
}

export default async function PREFIX_EMOTES (client, message, process) {
  if (message.content.startsWith(`${process.env.PREFIX_EMOTES}`)) {
    const emotesFlag = message.content.slice(`${process.env.PREFIX_EMOTES}`.length).replace(/^\s+/gm, '')

    const emote = emotes[emotesFlag]

    if (emote) {
      await message.delete()
      await emote(message, process)
    }
  }
}
