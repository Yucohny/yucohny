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

2. `yield` 命令，是先执行 `yield` 语句后的内容，再执行 `yield` 本身（也就是暂缓）。
2. 第几次调用 `next` 方法，就会从上一次结束的位置开始，执行到下一个 `yield` 语句。
2. 如果没有再遇到新的 `yield` 命令，那么生成器函数将会一直运行到函数结束。如果存在 `return` 语句，那么会将`return`语句后面的表达式的值，作为返回的对象的 `value` 属性值。

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

如果 `next` 方法没有携带参数，那么可以认为 `yield` 表达式总是返回 `undefined`：

```js
function * func() {
    const yieldResult = yield 'Test'
    console.log(yieldResult)
}

const pointer = func()
pointer.next()
pointer.next()
// undefined
```

如果 `next` 方法携带了参数，那么该参数就会背当作上一条 `yield` 语句的返回值：

```js
function * func() {
    const yieldResult = yield 'Test'
    console.log(yieldResult)
}

const pointer = func()
pointer.next()
pointer.next('Demo')
// Demo
```

这个功能有很重要的意义：我们可以不断地从函数外部，通过 `next` 方法不断向函数内部，注入不同的值，从而达到调整函数行为的作用。

由于 `next` 方法的参数表示上一条 `yield` 语句的返回值，所以第一次使用 `next` 方法时传递参数是无效的。

# for...of 循环

## 基本使用

`for...of` 循环可以自动遍历 `Generator` 函数生成的 `Iterator` 对象。一旦 `next` 方法的返回对象的 `done` 属性为 `true`，则 `for...of` 循环会终止，且不会返回当前状态。因此 `return` 语句的返回值不会包含在里面：

```js
function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
}

for (let x of numbers()) {
    console.log(x)
}
// 1
// 2
```

除了 `for...of` 循环，扩展运算符、解构赋值和 `Array.from` 方法内部调用的都是遍历器接口。这意味着，他们都可以将生成器函数返回的 Iterator 对象作为参数。

## 添加 Iterator 接口

普通的对象原生不具备 Iterator 接口，因此无法使用 `for...of` 遍历：

```js
const obj = {
    name: 'Yucohny',
    age: 20
}
for (let x of obj) {
    console.log(x)
}
// TypeError: obj is not iterable 
```

我们可以依照生成器函数的性质，写一个 `objectEntried` 方法，该方法接收一个普通对象，实现为其添加遍历器接口。随后我们便可以使用 `for...of` 方法为包装后的对象遍历了：

```js
function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

const obj = {
    name: 'Yucohny',
    age: 20
}

for (let x of objectEntries(obj)) {
    console.log(x)
}
// [ 'name', 'Yucohny' ]
// [ 'age', 20 ]
```

加上遍历器接口的另一种写法是，将 Generator 函数加到对象的 `Symbol.iterator` 属性上面：

```js
function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);

    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]];
    }
}

const obj = {
    name: 'Yucohny',
    age: 20
}

obj[Symbol.iterator] = objectEntries

for (let x of objectEntries(obj)) {
    console.log(x)
}
// [ 'name', 'Yucohny' ]
// [ 'age', 20 ]
// [ Symbol(Symbol.iterator), [GeneratorFunction: objectEntries] ]
```

# Generator.prototype.throw()

生成器函数返回的遍历器对象，自身存在 `throw` 方法，用于在函数体外部抛出错误，该错误能够在生成器函数内部捕获：

```js
function* asyncFunc() {
    try {
        yield console.log(1)
    } catch (e) {
        console.log('捕获错误：', e)
    }
    yield console.log(2)
}

const iterator = asyncFunc()
iterator.next()
iterator.throw('error')
// 1
// 捕获错误：error
// 2
```

如果此时遍历器对象继续抛出一个错误，由于第一个错误已经被生成器函数内部的 `catch` 捕获，因此新抛出的错误不会再被捕获：

```js
function* asyncFunc() {
    try {
        yield console.log(1)
    } catch (e) {
        console.log('捕获错误：', e)
    }
    yield console.log(2)
}

const iterator = asyncFunc()
iterator.next()
iterator.throw('error')
iterator.throw('new error')
// 1
// 捕获错误：error
// 2
// Uncaught new error
```

因此，此时我们需要在生成器函数外部捕获该错误：

```js
function* asyncFunc() {
    try {
        yield console.log(1)
    } catch (e) {
        console.log('内部捕获：', e)
    }
    yield console.log(2)
}

const iterator = asyncFunc()
iterator.next()
try {
    iterator.throw('error')
    iterator.throw('new error')
} catch (e) {
    console.log('外部捕获：', e)
}
// 1
// 内部捕获： error    
// 2                   
// 外部捕获： new error
```

`throw` 方法接受一个参数，该参数会被 `catch` 语句接收，建议该参数为 `Error` 对象的实例。

我们需要注意不要混淆遍历器对象的 `throw` 方法和全局 `throw` 命令。遍历器对象的 `throw` 方法能够被生成器中的 `catch` 捕获，而全局 `throw` 命令只能被生成器外的 `catch` 捕获：

```js
function* asyncFunc() {
    try {
        yield
    } catch (e) {
        console.log('内部捕获：', e)
    }
}

const iterator = asyncFunc()
iterator.next()
try {
    throw new Error('error')
} catch (e) {
    console.log('外部捕获：', e)
}
// 外部捕获： Error: error
```

要注意的是，`throw` 方法被生成器捕获以后，会附带执行一次 `next` 方法。

# Generator.prototype.return()

生成器函数返回的遍历器对象具有一个 `return` 方法，可以返回给定值，并且终结生成器的遍历：

```js
function *gen() {
    yield 1
    yield 2
}

const g = gen()
console.log(g.next())
console.log(g.return('foo'))
console.log(g.next())
// { value: 1, done: false }
// { value: 'foo', done: true }
// { value: undefined, done: true }
```

如果 `return` 方法调用时不提供参数，则返回值的 `value` 属性为 `undefined`。

特殊的，如果生成器函数内部有 `try...finally` 代码块，并且正在执行 `try` 代码块，而 `return` 方法会导致立刻进入 `finally` 代码块，`finally` 代码块执行完后，整个函数才会执行结束：

```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

# yield* 表达式

`yield*` 表达式用于在一个生成器中执行另一个生成器：

```js
function *gen1() {
    yield 1
    yield 2
}

function *gen2() {
    yield 'a'
    yield* gen1()
    yield 'b'
}

const g = gen2()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
// { value: 'a', done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 'b', done: false }
```

从语法角度上看，`yield*` 表达式后面跟一个生成器函数，那么此时的 `yield*` 表达式作用等同于在外层生成器函数中部署了一个 `for...of` 循环：

```js
function *gen1() {
    yield 1
    yield 2
}

function *gen2() {
    yield 'a'
    yield* gen1()
    yield 'b'
}

// 等同于

function *gen2() {
    yield 'a'
    for (let i of gen1()) {
        yield i
    }
    yield 'b'
}
```

如果 `yield*` 后面跟着一个具有 Iterator 接口的数据结构，都会遍历数据结构的成员。

我们可以使用 `yield*` 命令取出嵌套数组的所有成员：

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e
```

# 作为对象属性的 Generator 函数

如果一个对象的属性是生成器函数，可以使用下下面两种格式：

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

调用生成器函数会返回一个遍历器，而这个遍历器本身也是生成器函数的实例，因此同样继承了生成器函数 `prototype` 对象上的方法。

如果将生成器函数当作普通的构造函数使用，并不会生效，因为生成器函数返回的是遍历器对象，而不是 `this` 对象。

同样，生成器函数不能与 `new` 命令一起使用，否则会报错。

我们可以使用变通的方式，来实现生成器函数返回一个正常的对象实例，既可以使用 `next` 方法，又可以获得构造函数中的 `this`。

我们首先生成一个空对象，并使用 `call` 方法绑定生成器函数内部的 `this`。这样当生成器函数调用的时候，这个空对象就变为了生成器函数的实例对象：

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

如果我们将这个空对象替换为生成器函数的 `prototype`，那么遍历器对象与生成的实例对象就能够统一：

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

我们再包装一层函数，便可以使用 `new` 命令了：

```js
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```
