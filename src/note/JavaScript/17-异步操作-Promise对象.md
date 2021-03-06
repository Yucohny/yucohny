# Promise 的含义

从语义上来说，`Promise` 是一个容器，里面保存着某个未来才会结束的事件的结果。

从语法上来说，`Promise` 是一个对象，它可以获取异步操作的消息。

`Promise` 对象有以下两个特点：

1. 无法通过外界对 `Promise` 对象造成影响。`Promise` 对象代表一个异步操作，有 3 种状态：进行中 `pending`、已成功 `fulfilled`（也称为 `resolved`） 和已失败 `rejected`。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

> 有一个地方值得注意：对于事件而言，在错过事件发生之后再去监听，将不会得到结果；而 `Promise` 对象改变后再去添加回调函数，我们仍然是能够得到改变后的状态的。

2. 一旦状态改变就不会再变，并且任何时候都可以得到这个结果。`Promise` 对象的状态改变只有两种可能：`pending` 变为 `fulfilled`，`pending` 变为 `rejected`。只要这两种情况发生，状态就不会再变。这时就称为已定型 `resolved`（但是很多时候都默认 `resolved` 特指 `fulfilled`）。

优点：

`Promise` 对象帮助将异步操作按照同步操作的流程表达出来，避免了层层嵌套的回调函数，从而更容易控制。

缺点：

1. 无法取消 `Promise`，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，`Promise` 内部抛出的错误就无法反应到外部。
3. 在 `pending` 状态时，无法得知目前进展到了哪个阶段。

# 基本用法

`Promise` 对象是一个构造函数，用来生成 `Promise` 实例。

`Promise` 构造函数接收一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`。

`resolve` 和 `reject` 是两个函数，由 JS 引擎提供，不需要自己部署。

```js
new Promise((resolve, reject) => {
    resolve(1)
})
```

## resolve

`resolve` 函数的作用是，将 `Promise` 对象的状态从 `pending` 变为 `Resolved`。`resolve` 函数在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

## reject

`reject` 函数的作用是，将 `Promise` 对象的状态从 `pending` 变为 `rejected`。`reject` 函数在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

从语义上而言，我们执行 `resolve` 或 `reject` 参数后，`Promise` 本身的使命就已经完成了，如果后续还有其他的操作，应该添加至 `then` 方法中：

```js
new Promise((resolve, reject) => {
    resolve(1)
    console.log('ok')
})
// ok
```

为了避免上面示例这样的情况，我们可以在 `resolve` 或 `reject` 执行前添加 `return`：

```js
new Promise((resolve, reject) => {
    return resolve(1)
    console.log('ok')
})
```

# Promise.prototype.then()

`then` 方法定义在构造函数的原型对象上，因此为每一个实例对象所共享。

`then` 方法的作用是为 `Promise` 实例添加状态改变时的回调函数。

`then` 方法可以接收两个回调函数作为参数。

第一个回调函数是 `Promise` 对象的状态变为 `Resolved` 时调用。

第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用。

这两个函数都是可选的，不一定要提供，它们都接收 `Promise` 对象传出的值作为参数。

> 注意，触发回调函数的本质是状态的改变。

要注意的是，`Promise` 新建后就会立即执行：

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// Resolved
```

> 注意同步异步的先后次序：`Promise` 内的内容是同步执行，而 `then` 方法是异步执行。

`then` 方法返回的是一个新的 `Promise` 实例，因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 方法。这样做将会将前一个 `then` 方法返回值传入这个新的 `then` 方法作为参数：

```js
new Promise((resolve) => {
    return resolve(1)
})
    .then((number) => {
        console.log(number)
        return number + 1
    })
    .then((number) => {
        console.log(number)
        return number + 1
    })
// 1
// 2
```

如果前一个 `then` 方法返回的是一个 `Promise` 对象，那么后一个 `then` 方法接收的两个回调函数参数将会为这个新的 `Promise` 对象服务：

```js
new Promise((resolve) => {
    resolve('1')
})
    .then(() => {
        return new Promise((resolve) => {
            resolve(1)
        })
    })
    .then(
        () => console.log('resolved'),
        () => console.log('rejected')
    )
// resolved
```

# Promise.prototype.catch()

`Promise.prototype.catch` 方法等同于 `.then(null, rejection)` 或者 `.then(undefined, rejection)`，用于指定发生错误时的回调函数。

有了 `catch()` 方法的存在，因此一般不在 `then` 方法中定义 `rejected` 状态的回调函数（即 `then` 的第二个参数），而应该总是使用 `catch` 方法。

与传统 `try/catch` 代码块不同的是，如果没有使用 `catch` 方法指定错误处理的回调函数，`Promise` 对象抛出的错误不会传递到外层代码，即不会有任何反应。但是浏览器会打印出对应的输出，但是并不会终止脚本的运行。

# Promise.prototype.finally()

`finally()` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

`finally` 方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是 `fulfilled` 还是 `rejected`。这表明，`finally `方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

`finally` 方法可以看作是 `then` 方法的语法糖：

```js
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

# Promise.all()

`Promise.all()` 方法用于将多个 `Promise` 实例包装成一个新的 `Promise` 实例。

`Promise.all()` 接收一个数组作为参数，数组元素期望为 `Promise` 对象的实例；如果不是，就会调用 `Promise.resolve()` 方法（见下文），将参数转为 `Promise` 实例，再进一步进行处理。

>  `Promise.all` 方法的参数不一定是数组，但是必须具有 `Iterator` 接口，且返回的每个成员都是 `Promise` 实例。

返回的状态由传入参数的状态决定，分为两种情况。

1. 只有当传入的 `Promise` 实例都是 `fulfilled` 状态，得到的新 `Promise` 实例才是 `fulfilled` 状态。并且 `Promise` 实例参数的返回值会组成一个数组，传递给新的 `Promise` 实例的回调函数。
2. 当传入的 `Promise` 实例存在 `rejected` 状态，则得到的结果就是 `rejected` 状态。并且第一个 `rejected` 状态的实例的返回值会传递给新的 `Promise` 实例的回调函数。

注意：如果作为参数的 `Promise` 实例自身定义了 `catch` 方法，那么它被 `rejected` 时并不会触发 `Promise.all()` 的 `catch` 方法。

因此，结合 `Promise.all()` 的含义，我们可以手写出一个 `PromiseAll()` 方法：

```js
const PromiseAll = (iterator) => {
    const promises = Array.from(iterator)
    let index = 0
    let data = []
    return new Promise((resolve, reject) => {
        for (let i in promises) {
            promises[i]
                .then((res) => {
                    data[i] = res;
                    if (++index === promises.length) {
                        resolve(data);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        }
    })
}
```

`Promise.all()` 的应用场景很容易设想：并发了多个网络请求时，需要等到全部返回成功后再进行接下来的操作。

# Promise.race()

`Promise.race()` 方法同样是将多个 `Promise` 实例包装成一个新的 `Promise` 实例。（参数与 `Promise.all()` 相同处理。）

如果 `Promise` 实例参数有一个实例的状态发生改变，则新的 `Promise` 实例的状态也跟着改变，并且率先改变状态的参数的返回值作为新的 `Promise` 实例回调函数的返回值。

# Promise.allSettled()

# Promise.any()

# Promise.resolve()

`Promise.resolve()` 用于将现有对象转化为 `Promise` 对象，分为下列四种情况：

1. 参数是一个 `Promise` 实例

不做修改，直接返回该实例。

2. 参数是一个 `thenable` 对象

`thenable` 对象值的是具有 `then` 方法的对象，比如下面这个对象。

```js
let thenable = {
    then: function(resolve, reject) {
        resolve(42)
    }
}
```

`Promise.resolve` 方法会将这个对象转化为 `Promise` 对象，然后立即执行 `thenable` 对象的 `then` 方法。

3. 参数不是具有 `then` 方法的对象或者根本不是对象

如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，那么 `Promise.resolve` 方法返回一个新的 `Promise` 对象，状态为 `Resolved`。

```js
let p = Promise.resolve('Hello')

p.then(s => console.log(s))
// Hello
```

由于 `Promise` 实例的状态从生成起就是 `Resolved` 状态，所以回调函数会立即执行。

4. 不带有参数

直接返回一个 `Resolved` 状态的 `Promise` 对象。

# Promise.reject()

`Promise.reject()` 方法也返回一个新的 `Promise` 实例，状态为 `rejected`。

注意：`Promise.reject()` 方法的参数会原封不动作为 `reject` 的理由变成后续方法的参数。

# Promise.try()

# 应用
