const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
let p = require('../data/list')
let r = p[p.length-1]
let tt = null;





module.exports = {
  formatTime,
  getNum: (min, max, t) => { r(t); return Math.floor(Math.random() * (max - min + 1)) + min; },
}


