import fs from 'fs';
import { sum } from '../utils/math.js';

const data = fs.readFileSync('data.txt', 'utf8')

const dirs = {
  '/': {}
}
const workingDir = ['/']

const steps = data.split('\n')

for (let i = 0; i < steps.length; i++) {
  const workingDirFolder = workingDir.reduce((acc, cur) => acc[cur], dirs)
  const step = steps[i]
  if (step.startsWith('$ cd')) {
    const dir = step.slice(5)
    if (dir === '/') {
      workingDir.splice(0, workingDir.length, dir)
    } else if (dir === '..') {
      workingDir.splice(workingDir.length - 1, 1)
    } else {
      workingDir.push(dir)
    }
  } else if (step.startsWith('$ ls')) {
    while (true) {
      i += 1
      const line = steps[i]
      if (line === undefined || line.startsWith('$')) {
        i -= 1
        break
      }
  
      const [dirOrSize, name] = line.split(' ')
      if (dirOrSize === 'dir') {
        workingDirFolder[name] = {}
      } else {
        workingDirFolder[name] = Number(dirOrSize)
      }
    }
  }
}


const sizes = {}
const getFolderSizes = (directory, folder = '/') => {
  let size = 0
  for (const dirOrFile of Object.keys(directory)) {
    if (typeof directory[dirOrFile] === 'object') {
      size += getFolderSizes(directory[dirOrFile], folder + dirOrFile)
    } else {
      size += directory[dirOrFile]
    }
  }
  sizes[folder] = size
  return size
}

getFolderSizes(dirs['/'], '/')

const sizesInLimit = Object.values(sizes).filter(size => size <= 100000)
const sumOfSizes = sum(sizesInLimit)

const totalSize = 70000000
const freeSpace = totalSize - sizes['/']
const neededSpace = 30000000
const minSpaceToDelete = neededSpace - freeSpace

const orderedSizes = Object.values(sizes).sort((a, b) => a - b)
const smallestSizeToDelete = orderedSizes.find(size => size > minSpaceToDelete)

console.log('Part 1:', sumOfSizes)
console.log('Part 2:', smallestSizeToDelete)

