import fs from 'fs'

const sum = arr => arr.reduce((acc, cur) => acc + cur, 0)

const Shape = {
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS',
}

const Column1 = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
}

const Column2 = {
  X: Shape.ROCK,
  Y: Shape.PAPER,
  Z: Shape.SCISSORS,
}

const Outcome = {
  WIN: 'WIN',
  TIE: 'TIE',
  LOSE: 'LOSE'
}

const OutcomeDecider = {
  [Shape.ROCK]: {
    [Shape.ROCK]: Outcome.TIE,
    [Shape.PAPER]: Outcome.WIN,
    [Shape.SCISSORS]: Outcome.LOSE,
  },
  [Shape.PAPER]: {
    [Shape.ROCK]: Outcome.LOSE,
    [Shape.PAPER]: Outcome.TIE,
    [Shape.SCISSORS]: Outcome.WIN,
  },
  [Shape.SCISSORS]: {
    [Shape.ROCK]: Outcome.WIN,
    [Shape.PAPER]: Outcome.LOSE,
    [Shape.SCISSORS]: Outcome.TIE,
  }
}

const ShapeScore = {
  [Shape.ROCK]: 1,
  [Shape.PAPER]: 2,
  [Shape.SCISSORS]: 3,
}

const OutcomeScore = {
  [Outcome.WIN]: 6,
  [Outcome.TIE]: 3,
  [Outcome.LOSE]: 0,
}


const data = fs.readFileSync('data.txt', 'utf8')

const mapped = data.split('\n').map(round => round.split(' ')).map(([c1, c2]) => ([Column1[c1], Column2[c2]]))
const score = mapped.map(([c1, c2]) => OutcomeScore[OutcomeDecider[c1][c2]] + ShapeScore[c2])

console.log('Part 1:', sum(score))

const Column2Part2 = {
  X: Outcome.LOSE,
  Y: Outcome.TIE,
  Z: Outcome.WIN,
}

const RequiredShapeDecider = {
  [Shape.ROCK]: {
    [Outcome.WIN]: Shape.PAPER,
    [Outcome.TIE]: Shape.ROCK,
    [Outcome.LOSE]: Shape.SCISSORS,
  },
  [Shape.PAPER]: {
    [Outcome.WIN]: Shape.SCISSORS,
    [Outcome.TIE]: Shape.PAPER,
    [Outcome.LOSE]: Shape.ROCK,
  },
  [Shape.SCISSORS]: {
    [Outcome.WIN]: Shape.ROCK,
    [Outcome.TIE]: Shape.SCISSORS,
    [Outcome.LOSE]: Shape.PAPER,
  }
}

const mapped2 = data.split('\n').map(round => round.split(' ')).map(([c1, c2]) => ([Column1[c1], Column2Part2[c2]]))
const score2 = mapped2.map(([c1, c2]) => OutcomeScore[c2] + ShapeScore[RequiredShapeDecider[c1][c2]])

console.log('Part 2:', sum(score2))