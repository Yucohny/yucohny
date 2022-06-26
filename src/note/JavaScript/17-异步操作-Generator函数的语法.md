# 简介

## 基本概念

我们可以这么来理解 `Generator` 函数：

语义上，`Generator` 函数是一个状态机，封装了多个内部状态；同时，`Generator` 函数还是一个遍历器对象生成函数，因此执行 `Generator` 函数会返回一个遍历器对象。

语法上，`Generator` 函数也是一个普通函数，但是有三个不一样的地方：

（1）`function` 命令与函数名称中有一个 `*` 号

（2）`Generator` 函数内部可以使用 `yield` 语句定义不同的内部状态。

（3）我们可以通过调用普通函数的形式来调用 `Generator` 函数，但是意义不一样。调用 `Generator` 函数后，`Generator` 函数并不直接执行，返回的内容也并不是 函数内部的 `return` 对象，而是一个指向函数内部的状态的指针对象。

ES6 没有规定 function 关键字与函数名之间的 * 号写在哪个位置，因此下面的写法都能通过。

```js
function * foo (x, y) {}
function *foo (x, y) {}
function* foo (x, y) {}
function*foo (x, y) {}
```

`Generator` 函数也可以简称为生成器（或者生成器函数）。

## yield 表达式

生成器函数在调用时并没有立刻执行函数内部语句，而是直接先返回了一个指向函数内部状态的指针对象。

```js
function * func() {
    console.log(1)
    yield console.log(2)
    yield console.log(3)
}

const pointer = func()
// 没有输出
```

而返回的遍历器对象，只有调用 `next` 方法才会遍历下一个内部状态。因此生成器函数，实际上提供了一种可以暂停执行的函数。而 `yield` 表达式就是暂停的标志。如果生成器函数内部没有使用 `yield` 命令，那么生成器函数就变成了一个单纯的暂缓执行函数。

生成器函数返回的遍历器对象中的 `next` 方法的运行逻辑如下：

1. 每次 `next()` 方法都将返回一个对象，该对象包含两个属性 `value` 与 `done`。`value` 属性为每次调用 `next()` 方法时所对应的 `yield` 语句的返回值，如果无返回值，那么 `value` 属性为 `undefined`；`done` 属性表示当前遍历是否结束。

```js
function * func() {
    yield 'Test'
}

const pointer = func()
const obj = pointer.next()
console.log(obj)
const obj2 = pointer.next()
console.log(obj2)
```

2. 如果是第一次调用 `next()` 方法，那么函数将会从函数开头运行到第二个 `yield` 命令。

```js
function * func() {
    console.log(1)
    yield console.log(2)
}

const pointer = func()
const obj = pointer.next()
console.log(obj)
// 1
// 2
// { value: undefined, done: false }
```

3. 调用下一次 `next()` 方法时，将会继续向下执行，直到碰到新的一个 `yield` 命令。

4. 如果没有再遇到新的 `yield` 命令，那么生成器函数将会一直运行到函数结束。如果存在 `return` 语句，那么会将`return`语句后面的表达式的值，作为返回的对象的 `value` 属性值。

```js
function * func() {
    yield 'Test'
    return 'Test2'
}

const pointer = func()
const obj = pointer.next()
console.log(obj)
const obj2 = pointer.next()
console.log(obj2)
// { value: 'Test', done: false }
// { value: 'Test2', done: true }
```

要注意的是，如果 `yield` 命令使用在了另外一个表达式中，那么就必须将 `yield` 命令放入圆括号内部。

```js
function* demo() {
  console.log('Hello' + yield 123); // SyntaxError
  console.log('Hello' + (yield 123)); // OK
}
```

当 `yield` 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

# next 方法的参数

yield 语句本身没有返回值，或者说总是返回 undefined。next 方法可以带有一个参数，该参数会被当作上一条 yield 语句的返回值。

这个功能有很重要的语法意义，Generator 函数从暂停状态到恢复运行，其上下文状态是不变的。通过 next 方法的参数就有办法在 Generator 函数开始运行后继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段从外部向内部注入不同的值，从而调整函数行为。

由于 next 方法的参数表示上一条 yield 语句的返回值，所以第一次使用 next 方法时传递参数是无效的。从语义上来讲，第一个 next 方法用来启动遍历器对象，所以本身不用带有参数。

# for...of 循环

for...of 循环可以自动遍历 Generator 函数生成的 Iterator 对象，且此时不再需要调用 next 方法。

一旦 next 方法的返回对象的 done 属性为 true，则 for...of 循环会终止，且不会返回当前状态。因此 return 语句的返回值不会包含在里面。

除了 for...of 循环，扩展运算符、解构赋值和 Array.from 方法内部调用的都是遍历器接口。这意味着，他们都可以将 Generator 函数返回的 Iterator 对象作为参数。

# Generator.prototype.throw()

略。

# Generator.prototype.return()

Generator 函数返回的遍历器对象具有一个 return 方法，可以返回给定值，并且终结 Generator 函数的遍历。

如果 return 方法调用时不提供参数，则返回值的 value 属性为 undefined。

如果 Generator 函数内部有 try...finally 代码块，那么 return 方法会推迟到 finally 代码块执行完再继续执行。

# yield* 表达式

如果在 Generator 函数内部调用另一个 Generator 函数，默认情况下是没有效果的。这时就需要使用 yield* 语句，用来在一个 Generator 函数里面执行另一个 Generator 函数。

从语法角度上看，如果 yield 命令后面跟的是一个遍历器对象，那么需要在 yield 命令后面加上星号，表明返回的是一个遍历器对象。

在没有 return 语句时，yield* 后面的 Generator 函数不过是 for...of 的一种简写邢师。

如果 yield* 后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。任何数据结构只要有 Iterator 接口，就可以使用 yield* 遍历。

# 作为对象属性的 Generator 函数



```js
let obj = {
    * myGeneratorMethod() {
        
    }
}
```

或者

```js
let obj = {
    myGeneratorMethod: function* () {
        
    }
}
```

# Generator 函数的 this

Generator 函数返回的是遍历器对象，而不是 this 对象。Generator 函数也不能跟着 new 命令一起使用，否则会报错。

如果想让 Generator 函数返回一个正常的对象实例，既可以使用 next 方法，又可以获得正常的 this，可以使用变通的方法：

首先生成一个空对象，使用 call 方法绑定 Generator 函数内部的 this。

# 含义

## Generator 与状态机

## Generator 与协程

# 应用

## 异步操作的同步化表达

## 控制流

## 部署 Iterator 接口

## 作为数据结构
