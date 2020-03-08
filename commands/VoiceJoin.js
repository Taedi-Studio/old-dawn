const alias = ['hh!join']
function fnc (dawn, msg) {
  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join()
      .then((connection) => {
        msg.reply(dawn.ping)
      })
      .catch(console.log)
  } else {
    msg.reply('Fail')
  }
}

module.exports = { fnc, alias }
