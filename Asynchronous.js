function red() {
    console.log('red')
}

function green() {
    console.log('green')
}

function yellow() {
    console.log('yellow')
}

// callback
const task = (timer, light, callback) => {
    setTimeout(() => {
        if (light === 'red') {
            red()
        } else if (light === 'green') {
            green()
        } else {
            yellow()
        }
        callback()
    }, timer)
}
// 回调地狱
const temp = () => {
    task(3000, 'red', () => {
        task(1000, 'green', () => {
            task(2000, 'yellow', temp)
        })
    })
}
// temp()
const promiseStyle = (timer, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light === 'red') {
                red()
            } else if (light === 'green') {
                green()
            } else {
                yellow()
            }
            resolve()
        }, timer)
    })
}
const step = () => {
    promiseStyle(3000, 'red')
        .then(() => promiseStyle(1000, 'green'))
        .then(() => promiseStyle(2000, yellow))
        .then(step)
}
// step()

// Generator
const gengerator = function *() {
    yield promiseStyle(3000,'red')
    yield promiseStyle(3000,'green')
    yield promiseStyle(3000,'yellow')
    yield gengerator()
}

const gengeratorObj = gengerator();
// gengeratorObj.next()
// gengeratorObj.next()
// gengeratorObj.next()

const co = require('co')
// co(gengeratorObj)

const asyncTask = async()=> {
    try{
        await promiseStyle(3000,'red')
        await promiseStyle(3000,'green')
        await promiseStyle(3000,'yellow')
        await asyncTask()
    }
    catch (err) {
        console.log(err)
    }

}
asyncTask()