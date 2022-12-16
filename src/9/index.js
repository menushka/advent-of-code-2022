import fs from 'fs';

const data = fs.readFileSync('data.txt', 'utf8')

const instructions = data.split('\n').map(line => line.split(' ').map((c, i) => i === 1 ? Number(c) : c))

const bound = (value, min = -1, max = 1) => Math.min(max, Math.max(min, value))

const computeKnots = (n) => {
  const knots = new Array(n).fill(0).map(() => new Array(2).fill(0))
  const tailPositions = new Set()

  const moveTowardsHead = (tail, head) => {
    const xOffset = head[0] - tail[0]
    const yOffset = head[1] - tail[1]
    const xAbsOffset = Math.abs(xOffset)
    const yAbsOffset = Math.abs(yOffset)
    if (xAbsOffset > 1 && yAbsOffset > 0 || xAbsOffset > 0 && yAbsOffset > 1) {
      tail[0] = tail[0] + bound(xOffset)
      tail[1] = tail[1] + bound(yOffset)
    } else if (xAbsOffset > 1 && yAbsOffset >= 0) {
      tail[0] = tail[0] + bound(xOffset)
    } else if (yAbsOffset > 1 && xAbsOffset >= 0) {
      tail[1] = tail[1] + bound(yOffset)
    }
  }

  for (const instruction of instructions) {
    const [direction, steps] = instruction
    for (let i = 0; i < steps; i++) {
      switch (direction) {
        case 'L':
          knots[0][0] -= 1
          break;
        case 'R':
          knots[0][0] += 1
          break;
        case 'U':
          knots[0][1] += 1
          break;
        case 'D':
          knots[0][1] -= 1
          break;
      }
      for (let j = 1; j < n; j++) {
        moveTowardsHead(knots[j], knots[j - 1])
      }
      tailPositions.add(knots[knots.length - 1].join())
    }
  }

  return tailPositions.size
}

console.log('Part 1:', computeKnots(2))
console.log('Part 2:', computeKnots(10))