const alias = ['hh!pause']
function fnc (dawn, msg, disparts) {
  if (!msg.member.voiceChannel) { msg.channel.send('No Connections!') }
  if (!disparts[msg.guild.id]) { msg.channel.send('No Musics') }
  if (disparts[msg.guild.id].paused) {
    disparts[msg.guild.id].resume()
    msg.channel.send('Playing')
  } else {
    disparts[msg.guild.id].pause()
    msg.channel.send('Paused')
  }
}

module.exports = { fnc, alias }
