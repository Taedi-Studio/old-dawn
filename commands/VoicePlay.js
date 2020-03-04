const ytdl = require('ytdl-core')
const ytSearch = require('youtube-search')

const alias = ['hh!play']
function fnc (dawn, msg, disparts) {
    if (!msg.member.voiceChannel) { msg.channel.send('No Connections!'); break }
    ytSearch(msg.content.split(' ').slice(1).join(' '), searchOption, (err, res) => {
      if (err) console.log(err)
      else {
        msg.member.voiceChannel.join()
          .then(connection => {
            disparts[msg.guild.id] = connection.playStream(ytdl(res[0].link))
            disparts[msg.guild.id].on('end', () => {
              const emb = new RichEmbed()
                .setColor(0xff0000)
                .setImage(res[0].thumbnails.default.url)
                .setTitle('Ended: ' + res[0].title)
              msg.channel.send(emb)

              disparts[msg.guild.id] = undefined
            })
            const emb = new RichEmbed()
              .setColor(0x00ff00)
              .setImage(res[0].thumbnails.default.url)
              .setTitle(res[0].title)
            msg.channel.send(emb)
          })
      }
    })
}

module.exports = { fnc, alias }