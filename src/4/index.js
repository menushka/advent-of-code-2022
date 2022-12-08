import fs from 'fs'

import { sum } from '../utils/math.js'

const isContained = ([[a, b], [c, d]]) =>
  (a <= c && a <= d && b >= c && b >= d) ||
  (c <= a && c <= b && d >= a && d >= b)

const anyOverlap = ([[a, b], [c, d]]) =>
  (a >= c && a <= d) ||
  (b >= c && b <= d) ||
  (c >= a && c <= b) ||
  (d >= a && d <= b)

const data = fs.readFileSync('data.txt', 'utf8')
const groups = data.split('\n').map(line => line.split(',').map(startAndEnd => startAndEnd.split('-').map(Number)))

const contained = groups.map(isContained)
const overlap = groups.map(anyOverlap)

console.log('Part 1', sum(contained))
console.log('Part 2', sum(overlap))
