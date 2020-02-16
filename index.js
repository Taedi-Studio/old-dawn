const { Client, RichEmbed } = require('discord.js')
const { existsSync } = require('fs')
const path = require('path').resolve()
const ytdl = require('ytdl-core')
const ytSearch = require('youtube-search')

const searchOption = { maxResults: 0, key: 'AIzaSyCm6DTMjC1UB190WPZtOjvChYwlMdfzpuU' }
const dawn = new Client()
let settings; let chats = []; const disparts = {}

if (existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
else console.log('Warning! ./settings.json File is not exist')
const token = !settings ? process.env.dawnToken : settings.token

if (existsSync(path + '/chats.json')) chats = require(path + '/chats.json')
else console.log('Warning! ./chats.json File is not exist')

const activityCycles = ['봇 구동!', '테스트하는중', '다운봇 부활', '봇 개발하기 싫어', 'Prefix : hh!', 'hh!help으로 도움을 받을수있습니다',
  'hh!를 한영키 눌러서 친다면? (이것도 되요)', '아직 hh!help 명령어는 없습니다', '음악 봇 만드는 중']

dawn.login(token)

dawn.on('ready', () => {
  // setInterval은 JS 내장 함수
  setInterval(() => { // 콜백함수 & 화살표 함수
    dawn.user.setActivity(activityCycles[Math.floor(Math.random() * activityCycles.length)]) // 렌덤 아이템 선택
  }, 5000) // 1000ms = 1초

  console.log('Dawn bot is now online!')
  dawn.generateInvite().then(console.log) // discord.js 자체에 초대 링크 생성기가 있음
})

dawn.on('message', (msg) => {
  switch (msg.content.split(' ')[0]) {
    case 'hh!join':
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
          .then(connection => {
            msg.reply(dawn.ping)
          })
          .catch(console.log)
      } else {
        msg.reply('Fail')
      }
      break

    case 'hh!play':
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
      break

    case 'hh!pause':
      if (!msg.member.voiceChannel) { msg.channel.send('No Connections!'); break }
      if (!disparts[msg.guild.id]) { msg.channel.send('No Musics'); break }
      if (disparts[msg.guild.id].paused) {
        disparts[msg.guild.id].resume()
        msg.channel.send('Playing')
      } else {
        disparts[msg.guild.id].pause()
        msg.channel.send('Paused')
      }
      break
  }

  if (msg.content === '스승님') {
    msg.reply('<@527746745073926145> 님 구조요청!')
  }

  if (msg.content === '어쩌라구요~') {
    if (!msg.member.voiceChannel) msg.channel.send('통화방에없어요!')
  }

  if (msg.author.bot || !msg.guild) return

  const query = chats.filter((v) => v['입력'] === msg.content)
  if (query.length > 0) msg.channel.send(query[query.length - 1]['출력'])
})
