import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8')

const findMarker = (code, num) => {
  for (let i = num; i < code.length; i++) {
    const str = code.slice(i - num, i)
    if ([...new Set(str)].length === num) {
      return i
    }
  }
}

console.log('Part 1:', findMarker(data, 4))
console.log('Part 2:', findMarker(data, 14))