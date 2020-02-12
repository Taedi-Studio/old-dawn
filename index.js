const { Client, RichEmbed } = require('discord.js')
const { existsSync } = require('fs')
const path = require('path').resolve()
const fs = require('fs')
const ytdl = require('ytdl-core')
// const simple-youtube-api 

const dawn = new Client()
const prefix = 'hh!'
let settings; let chats = []

if (existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
else console.log('Warning! ./settings.json File is not exist')
const token = !settings ? process.env.dawnToken : settings.token

if (existsSync(path + '/chats.json')) chats = require(path + '/chats.json')
else console.log('Warning! ./chats.json File is not exist')

const activityCycles = ['봇 구동!', '테스트하는중', '다운봇 부활', '봇 개발하기 싫어', 'Prefix : hh!', 'hh!help으로 도움을 받을수 있어욘',
                        'hh!를 한영키 눌러서 친다면? (이것도 되요)', '아직 hh!help 명령어는 없습니다', '다운봇 죽음', '다운봇 심폐소생술',
                        '음악 봇 만드는 중',]

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
  if (msg.content === 'hh!join') {
    if (msg.member.voiceChannel) {
      msg.member.voiceChannel.join()
        .then(connection => {
          msg.reply(dawn.ping)
          connection.playStream(ytdl('https://www.youtube.com/watch?v=QH2-TGUlwu4'))
        }) 
        .catch(console.log)
    } else {
      msg.reply('Fail')
    }
  }

  if (msg.content === '스승님') {
    const emb = new RichEmbed()
      .setTitle('도와주세요!')
      .setDescription('<@527746745073926145> 님 구조요청!') // 뭐해요 // 기다리는데

      msg.reply(emb)
  }

  if (msg.author.bot || !msg.guild) return

  const query = chats.filter((v) => v['입력'] === msg.content)
  if (query.length > 0) msg.channel.send(query[query.length - 1]['출력'])
})

// 콘솔! 권한!
// 근데 저 잘껀데요?
//좀만하셔요 하나만 만들고ㅊㅇ
// 터미널뭐지
//?
//머하고시고 계실까(?)
