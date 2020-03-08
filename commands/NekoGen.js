const { RichEmbed } = require('discord.js')
const superagent = require('superagent')

const alias = ['hh!neko']
function fnc (dawn, msg) {
  superagent('https://nekos.life/api/v2/img/neko')
    .then((res) => {
      const emb = new RichEmbed()
        .setImage(res.body.url)
        .setTitle('Testing...')
      msg.channel.send(emb)
    })
}

module.exports = { fnc, alias }
