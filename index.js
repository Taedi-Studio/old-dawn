const { writeFileSync } = require('fs')
const path = require('path').resolve()
const discord = require('discord.js')
const dawn = new discord.Client()

const settings = require(path + '/settings.json')

dawn.login(settings.token)

dawn.on('ready', () => {
  dawn.user.setActivity('Testing', { type: 'LISTENING' })

  console.log('Dawn bot is online!')
  console.log('Invite Link: https://discordapp.com/api/oauth2/authorize?client_id=' + settings.client_id + '&permissions=0&scope=bot')
})