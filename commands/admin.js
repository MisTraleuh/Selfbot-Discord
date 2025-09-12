/*
** MISTROU PROJECT, 2022
** SELFBOT DISCORD
** File description:
** root of the project, allows to process the received command and to send it to the right function
*/

import dotenv from 'dotenv'
import fetch from 'node-fetch';
dotenv.config()

let nitroSniper = false
let history = false

async function findArguments(client, message, args) {
  if (!process.env.GROQ_API_KEY) {
    return message.channel.send('❌ Groq API key not found')
  }
  args = message.content.split(' ')

  async function callGroq(prompt) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    return await response.json();
  }

  function parseDiscordLink(link) {
    const dmRegex = /https:\/\/discord\.com\/channels\/@me\/(\d+)\/(\d+)/;
    const serverRegex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
    
    const dmMatch = link.match(dmRegex);
    const serverMatch = link.match(serverRegex);
    
    if (dmMatch) {
      return {
        type: 'dm',
        channelId: dmMatch[1],
        messageId: dmMatch[2]
      };
    } else if (serverMatch) {
      return {
        type: 'server',
        guildId: serverMatch[1],
        channelId: serverMatch[2], 
        messageId: serverMatch[3]
      };
    }
    return null;
  }

  try {
    const discordLink = args[1];
    if (!discordLink) {
      return message.channel.send('Please provide a Discord message link!');
    }

    const parsedLink = parseDiscordLink(discordLink);
    if (!parsedLink) {
      return message.channel.send('Invalid Discord message link format!');
    }

    const targetChannel = await client.channels.fetch(parsedLink.channelId);
    if (!targetChannel) {
      return message.channel.send('Channel not found!');
    }

    const targetMessage = await targetChannel.messages.fetch(parsedLink.messageId);
    if (!targetMessage) {
      return message.channel.send('Message not found!');
    }

    const recentMessages = await targetChannel.messages.fetch({ 
      limit: 50,
      after: parsedLink.messageId
    });
    
    console.log(`Found ${recentMessages.size} messages after the target message`);
    
    let context = "Conversation from the target message onwards:\n";
    
    const messagesArray = Array.from(recentMessages.values()).reverse();
    
    context += `${targetMessage.author.username}: ${targetMessage.content}\n`;
    
    messagesArray.forEach(msg => {
      if (msg.content && !msg.author.bot) {
        context += `${msg.author.username}: ${msg.content}\n`;
      }
    });
    
    const prompt = `${context}

    Tu es chargé de rédiger une RÉPONSE prête à être envoyée par "${client.user.username}" dans cette discussion.  
    IMPORTANT : la réponse doit sembler 100% écrite par un humain, en s'adaptant exactement à la manière dont "${client.user.username}" écrit et s'exprime. On ne doit absolument pas avoir l'impression que c'est un texte généré par une IA.  
    
    Instructions :
    - Analyse la conversation et la manière d'écrire de "${client.user.username}" (langue, niveau, vocabulaire, ponctuation, fautes éventuelles, tournures, ton, familiarité, etc.)  
    - Rédige un message qui DEFEND et SOUTIENT sa position de façon crédible et naturelle.  
    - Trouve 3 à 5 arguments ou contre-arguments solides, mais pas exagérés ni trop parfaits (reste réaliste et humain).  
    - Le message doit paraître spontané et adapté au contexte de la discussion.  
    - Utilise la même langue que la conversation (français, anglais, etc.) et le même style (familier, soutenu, avec ou sans abréviations, etc.).  
    - Le texte final doit être court, fluide et prêt à être copié-collé tel quel par "${client.user.username}".  
    - Pas de notes, pas de listes numérotées visibles, pas de formatage spécial : écris comme un vrai message de discussion.  
    
    Ta sortie finale doit être UNIQUEMENT le message que "${client.user.username}" pourrait envoyer, rien d'autre.`;

    const aiResponse = await callGroq(prompt);
    
    if (aiResponse.choices && aiResponse.choices[0]) {
      const argumentsResponse = aiResponse.choices[0].message.content;
      
      const truncatedResponse = argumentsResponse.length > 2000 
        ? argumentsResponse.substring(0, 1997) + "..." 
        : argumentsResponse;
        
      await targetChannel.send(truncatedResponse);
      
      await message.channel.send(`✅ Argument sent to conversation`);
    }

  } catch (error) {
    console.error('Error in findArguments:', error);
    await message.channel.send('An error occurred while analyzing the message.');
  }
}

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
    await message.channel.send(`<@${client.user.id}>`)
  }

  if (message.content.startsWith(process.env.PREFIX_ADMIN) && message.content !== `${process.env.PREFIX_ADMIN}help`) {
    const flagAdmin = message.content.replace(process.env.PREFIX_ADMIN, '')
    await message.delete()

    if (flagAdmin.startsWith('nitrosniper')) {
      await checkNitroSniper(client, message, process)
    }

    if (flagAdmin.startsWith('history')) {
      await checkhistory(client, message, process)
    }

    if (flagAdmin.startsWith('findarguments')) {
      await findArguments(client, message, process)
    }
  }
}
