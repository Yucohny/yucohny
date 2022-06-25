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

