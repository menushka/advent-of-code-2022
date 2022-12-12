import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8')

const trees = data.split('\n').map(line => line.split('').map(Number))

let totalVisible = trees.length * 2 + trees[0].length * 2 - 4
let highestScore = 0
for (let y = 1; y < trees.length - 1; y++) {
  for (let x = 1; x < trees[y].length - 1; x++) {
    const currentTree = trees[y][x]

    const lx = trees[y].slice(0, x).reverse()
    const rx = trees[y].slice(x + 1)
    const uy = trees.map(row => row[x]).slice(0, y).reverse()
    const dy = trees.map(row => row[x]).slice(y + 1)
    
    const checkIfAnyTaller = height => height >= currentTree
    const allHidden = [lx, rx, uy, dy].map(trees => trees.some(checkIfAnyTaller)).every(x => x)
    
    const fathest = [lx, rx, uy, dy]
      .map(trees => {
        const dis = trees.findIndex(checkIfAnyTaller)
        return dis === -1 ? trees.length : dis + 1
      })
    const score = fathest[0] * fathest[1] * fathest[2] * fathest[3]

    if (!allHidden) totalVisible += 1
    if (score > highestScore) highestScore = score
  }
}

console.log('Part 1:', totalVisible)
console.log('Part 2:', highestScore)

