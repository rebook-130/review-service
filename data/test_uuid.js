const { v4: uuidv4 } = require('uuid');

let array = []

for (let i = 0; i < 5000000; i += 1) {
  array.push(uuidv4());
  if (i % 100000 === 0) {
    console.log(array[i]);
  }
}

console.log(array)

for (let i = 0; i < 1000000; i += 1) {
  console.log(array[Math.floor(Math.random() * (5000000 - 1) + 1)]);
}