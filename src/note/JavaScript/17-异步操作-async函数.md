# 含义

`async` 函数本质上就是 `Generator` 函数的语法糖。在使用上，`async` 函数就是将 `Generator` 函数的星号 `*` 替换成 `async`，将 `yield` 替换成 `await`。

`async` 函数对 `Generator` 函数的改进体现在下面四点：

1. 内置执行器

   `Generator` 函数的执行必须依靠执行器，所以才有了 `co` 模块，而 `async` 函数自带执行器。

2. 更好的语义

3. 更广的适用性

   `co` 模块约定，`yield` 命令后面只能是 `Thunk` 函数或者 `Promise` 对象，而 `async` 函数的 `await` 表示紧跟在后面的表达式需要等待结果。

4. 返回值是 Promise

   `async` 函数的返回值是 `Promise` 对象，这比 `Generator` 函数的返回值是 `Iterator` 对象方便了许多。

# 语法

## async 函数返回 Promise 对象

`async` 函数本身直接返回一个 `Promise` 对象。一个 `Promise` 对象如果存在状态与值两个属性，我们从下列几个演示代码进行归纳与总结。

```js
async function asyncFunc() {}
const ans = asyncFunc()
console.log(ans)
// Promise {<fulfilled>: undefined}
```

```js
async function asyncFunc() {
	return 1
}
const ans = asyncFunc()
console.log(ans)
// Promise {<fulfilled>: 1}
```

```js
async function asyncFunc() {
    throw new Error('error')
    console.log('Test')
}
const ans = asyncFunc()
console.log(ans)
// Uncaught (in promise) Error: error
//     at asyncFunc (<anonymous>:2:11)
//     at <anonymous>:4:13
```

```js
async function asyncFunc() {
    throw new Error('error')
    return "demo"
}
const ans = asyncFunc()
console.log(ans)
// Promise {<rejected>: Error: error
//     at asyncFunc (<anonymous>:2:11)
//     at <anonymous>:5:13}
```

从上面四个演示代码我们进行简单的归纳与总结。

`async` 函数返回的 `Promise` 对象的状态由下列两点决定：

1. 如果 `async` 函数中执行了 `throw` 抛出错误语句，那么状态为 `rejected`。
2. 否则，`Promise` 对象状态为 `fulfilled`。

`async` 函数返回的 `Promise` 对象的值由下列两点决定：

1. 如果执行了 `throw` 抛出错误语句，那么 `Promise` 对象的值为 `Error` 对象的值。
2. 否则，如果存在 `return` 语句，那么 `return` 的内容就是 `Promise` 对象的值。
3. 否则，如果不存在 `return` 语句，那么 `Promise` 对象的值为 `undefined`。

> 并且从上面第三段代码中可以发现，一旦 `async` 函数执行了 `throw` 抛出错误语句，就不会再继续执行后面的语句了。

既然 `async` 函数返回的是 `Promise` 对象，那么我们自然可以在调用 `async` 函数后追加 `then` 等其他语句：

```js
async function asyncPrint(value) {
    console.log(value)
    return value
}
asyncPrint(1).then(v => console.log(v + 1))
// 1
// 2
```

## await 命令

`await` 命令用于等待一个 `Promise` 对象执行完毕。`await` 命令要注意下列两点：

1. `await` 命令只能用于 `async` 函数中。
2. `await` 命令一般跟 `Promise` 对象，如果不是 `Promise` 对象，那么就会将命令后面的值直接返回。

> 特殊的，如果是 `thenable` 对象，那么 `await` 命令会将其当作 `Promise` 对象进行处理。

在上一小节中，我们介绍了 `async` 函数返回 `Promise` 对象的状态与值的规则，但是是基于 `async` 函数中**不存在** `await` 命令的。如果 `async` 函数中存在 `await` 命令，那么相关的规则就会发生一些变化。

如果 `async` 函数执行到了 `await` 语句，那么就会直接返回一个 `Promise` 对象，该 `Promise` 对象状态为 `pending`。

```js
async function asyncPrint() {
    await new Promise(() => {})
    return 'Demo'
}

const ans = asyncPrint()
console.log(ans)
ans.then(() => {console.log('Test')})
// Promise {<pending>}
```

如果该 `await` 命令后的 `Promise` 对象状态改变为 `fulfilled`，那么 `async` 函数就将继续执行后面的语句。

```js
async function asyncPrint() {
    await new Promise((resolve) => {resolve(1)})
    return 'Demo'
}

const ans = asyncPrint()
console.log(ans)
ans.then(() => {console.log('Test')})
// Promise {<pending>}
// Test
```

如果该 `await` 命令后的 `Promise` 对象状态改变为 `rejected`，那么整个 `async` 函数执行结束，并且将 `async` 函数返回的 `Promise` 对象的状态改变为 `rejected`，值为 `await` 命令后面的 `Promise` 对象的值。

```js
async function asyncPrint() {
    await new Promise((resolve, reject) => {reject(1)})
    return 'Demo'
}

const ans = asyncPrint()
console.log(ans)
ans.catch(() => {console.log(ans)})
// Promise { <pending> }   
// Promise { <rejected> 1 }
```
