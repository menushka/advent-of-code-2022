import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8')

const [cratesList, stepsList] = data.split('\n\n').map(lines => lines.split('\n'))
const cratesSplit = new Array(Math.ceil(cratesList[0].length / 4)).fill(0).map((_, i) => cratesList.slice(0, cratesList.length - 1).map(line => line.slice(1 + i * 4, 2 + i * 4)).filter(c => c !== ' '))

const regex = /move (\d+) from (\d+) to (\d+)/g
const steps = stepsList.map(line => line.matchAll(regex).next().value.slice(1, 4).map(Number))

const arrange = (cratesOriginal, steps, reverse) => {
  const crates = [...cratesOriginal.map(line => [...line])]
  for (const step of steps) {
    const [count, from, to] = step
    const items = crates[from - 1].splice(0, count)
    const newItems = reverse ? items.reverse() : items
    crates[to - 1] = newItems.concat(crates[to - 1])
  }
  return crates
}


const topOfEach = arrange(cratesSplit, steps, true).map(list => list[0]).join('')
const topOfEach2 = arrange(cratesSplit, steps, false).map(list => list[0]).join('')

console.log('Part 1:', topOfEach)
console.log('Part 2:', topOfEach2)