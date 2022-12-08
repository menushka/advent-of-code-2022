import fs from 'fs'

import { sum } from '../utils/math.js'

const findSimilar = ([p1, p2, p3]) => {
  for (const letter1 of p1.split('')) {
    for (const letter2 of p2.split('')) {
      if (p3) {
        for (const letter3 of p3.split('')) {
          if (letter1 === letter2 && letter2 === letter3) {
            return letter1
          }
        }
      } else {
        if (letter1 === letter2) {
          return letter1
        }
      }
    }
  }
  return null
}

const toNumber = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .split('')
  .reduce((acc, cur, index) => ({ ...acc, [cur]: index + 1 }), {})

const data = fs.readFileSync('data.txt', 'utf8')
const split = data.split('\n').map(line => ([line.slice(0, line.length / 2), line.slice(line.length / 2)]))
const similar = split.map(findSimilar)
const prioritizes = similar.map(letter => toNumber[letter])

const split2 = data.split('\n').map((line, index, array) => index % 3 === 0 ? [line, array[index + 1], array[index + 2]] : null).filter(Boolean)
const similar2 = split2.map(findSimilar)
const prioritizes2 = similar2.map(letter => toNumber[letter])

console.log('Part 1', sum(prioritizes))
console.log('Part 2', sum(prioritizes2))
