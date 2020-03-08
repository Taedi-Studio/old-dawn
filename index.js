const { Client } = require('discord.js')
const { readdir, existsSync } = require('fs')
const path = require('path').resolve()

const dawn = new Client()
let settings; let chats = []; const disparts = {}

if (existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
else console.log('Warning! ./settings.json File is not exist')
const token = !settings ? process.env.dawnToken : settings.token

if (existsSync(path + '/chats.json')) chats = require(path + '/chats.json')
else console.log('Warning! ./chats.json File is not exist')

const activityCycles = ['봇 구동!', '테스트하는중', '다운봇 부활', '봇 개발하기 싫어', 'Prefix : hh!', 'hh!help으로 도움을 받을수있습니다',
  'hh!를 한영키 눌러서 친다면? (이것도 되요)', '아직 hh!help 명령어는 없습니다', '음악 봇 만드는 중']

const commands = []
readdir(path + '/commands/', (err, files) => {
  if (err) console.log(err)

  files.forEach((f) => {
    const s = f.replace('.js', '')
    const fnc = require('./commands/' + s)
    commands.push(fnc)
  })
})

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
  if (msg.author.bot || !msg.guild) return
  const cmd = msg.content.split(' ')[0]
  const query = commands.find((v) => v.alias.includes(cmd))
  if (query) return query.fnc(dawn, msg, disparts)

  const query2 = chats.filter((v) => v['입력'] === msg.content)
  if (query2.length > 0) msg.channel.send(query2[query2.length - 1]['출력'])
})
