import fs from 'fs'

import { sum } from '../utils/math.js'

const indexOfMax = (arr) => {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const data = fs.readFileSync('data.txt', 'utf8')
const maxData = data.replace(/\n/gm, ',').split(',,').map(data => sum(data.split(',').map(Number)))

const largestIndex = indexOfMax(maxData)
const largest = maxData[largestIndex]

delete maxData[largestIndex]

const secondLargestIndex = indexOfMax(maxData)
const secondLargest = maxData[secondLargestIndex]

delete maxData[secondLargestIndex]

const thirdLargestIndex = indexOfMax(maxData)
const thirdLargest = maxData[thirdLargestIndex ]

delete maxData[thirdLargestIndex]

console.log('Max: ', largest)
console.log('Max of highest three: ', sum([largest, secondLargest, thirdLargest]))
