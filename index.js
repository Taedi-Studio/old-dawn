const { existsSync } = require('fs')
const path = require('path').resolve()
const { Client } = require('discord.js')

const dawn = new Client()
let settings

if (existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
else console.log('Warning! ./settings.json File is not exist')
const token = !settings ? process.env.dawnToken : settings.token

const activityCycles = ['하나', '두울', '세엣']

dawn.login(token)

dawn.on('ready', () => {
  // setInterval은 JS 내장 함수
  setInterval(() => { // 콜백함수 & 화살표 함수
    dawn.user.setActivity(activityCycles[Math.floor(Math.random() * activityCycles.length)]) // 렌덤 아이템 선택
  }, 1000) // 1000ms = 1초

  console.log('Dawn bot is now online!')
  dawn.generateInvite().then(console.log) // discord.js 자체에 초대 링크 생성기가 있음
})

dawn.on('message', (msg) => {
  if (msg.content === '안녕') { // 매우 비추천
    msg.channel.send('안녕!')
  }
})
