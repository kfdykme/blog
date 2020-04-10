const taskA = new Promise(function(resolve, reject) {
  resolve('a')
});
const taskB = new Promise(function(resolve, reject) {
  resolve('b')
});
const taskC = new Promise(function(resolve, reject) {
  resolve('c')
});

let tasks = [taskA,taskB, taskC]

async function main () {

    console.info(await tasks[0])
    tasks.shift()
    console.info(await tasks[0])
    tasks.shift()
    console.info(await tasks[0])
    tasks.shift()
    
}

await main()
