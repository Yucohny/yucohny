# 新建正则表达式

新建正则表达式有两种方法，一种是使用字面量，一种是正则表达式 RegExp 的构造函数：

```js
const reg = /xyz/
```

```js
const reg = new RegExp('xyz')
```

如果需要表示修饰符，字面量形式只需要在最后的斜杠体现出来即可，而构造函数是传入对应的参数：

```js
const reg = /xyz/i
```

```js
const reg = new RegExp('xyz', 'i')
```

上面所述的两种新建表达式的方法主要区别是：第一种方法在引擎编译代码时，就会新建正则表达式；而第二种方法在运行时才会新建正则表达式，所以前者的效率更高，并且字面量形式更加便利和直观。

# 实例属性

正则对象的实例属性有两类：一类与修饰符相关，一类与修饰无关。

与修饰符相关的属性用于了解设置了什么修饰符，如下（下列属性均为只读）：

+ RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了 i 修饰符。
+ RegExp.prototype.global：返回一个布尔值，表示是否设置了 g 修饰符。
+ RegExp.prototype.multiline：返回一个布尔值，表示是否设置饿了 m 修饰符。
+ RegExp.prototype.flags：返回一个字符串，按照字母顺序包含所有设置的修饰符。

与修饰符无关的属性主要是下面两个：

+ RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义。
+ RegExp.prototype.source：返回正则表达式的字符串形式（不报看反斜杠），该属性只读。

# 实例方法

## RegExp.prototype.test()

正则实例对象的 test 方法返回一个布尔值，表示当前模式能否匹配参数字符串。

```js
/cat/.test('cats and dogs')
```

如果正则表达式包含有 g 修饰符，则每一次 test 方法都从上一次结束的位置开始向后匹配：

```js
var r = /x/g;
var s = '_x_x';

r.lastIndex // 0
r.test(s) // true

r.lastIndex // 2
r.test(s) // true

r.lastIndex // 4
r.test(s) // false
```

## RegExp.prototype.exec()

正则实例对象的 exec() 方法，用来返回匹配结构。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回 null。

如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。

exec() 方法的返回数组还包含以下两个属性：

+ input：整个原字符串
+ index：模式匹配成功的开始位置

```js
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr // ["abbba", "bbb"]

arr.index // 1
arr.input // "_abbba_aba_"
```

# 字符串的实例方法

## String.prototype.match()

字符串实例对象的 match 方法对字符串进行正则匹配，返回匹配结果。

如果正则表达式带有 g 修饰符，则该方法与正则对象的 exec 方法行为不同，会一次性返回所有匹配成功的结果。

## String.prototype.search()

字符串对象的 search 方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回 -1。

## String.prototype.replace()

字符串对象的 replace 方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。

正则表达式如果不加 g 修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值。

replace 方法的一个应用，就是消除字符串首尾两端的空格。

```js
var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '')
// "#id div.class"
```

replace 方法的第二个参数可以使用美元符号 $，用来指代所替换的内容。

- $&：匹配的子字符串。
- $ ：匹配结果前面的文本。
- $'：匹配结果后面的文本。
- $n：匹配成功的第 n 组内容，n 是从 1 开始的自然数。
- $$：指代美元符号 $。

replace 方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值。

```js
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/ig;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
```

作为 replace 方法第二个参数的替换函数，可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。下面是一个网页模板替换的例子。

```js
var prices = {
  'p1': '$1.99',
  'p2': '$9.99',
  'p3': '$5.00'
};

var template = '<span id="p1"></span>'
  + '<span id="p2"></span>'
  + '<span id="p3"></span>';

template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function(match, $1, $2, $3, $4){
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
// "<span id="p1">$1.99</span><span id="p2">$9.99</span><span id="p3">$5.00</span>"
```

## String.prototype.split()

字符串对象的 split 方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。

```js
str.split(separator, [limit])
```

该方法接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数。

# 匹配规则

## 字面量字符和元字符

大部分字符在正则表达式中，就是字面的含义，这些就叫做“字面量字符”。

除了字面量字符之外，还有一些字符有特殊含义，不代表字面的意思，，它们就叫做“元字符”。

### 点字符.

点字符 . 匹配除了回车符 \r、换行符 \n、行分隔符 \u2028 和段分隔符 \u2029 以外的所有字符。

一个点字符对应一个字符。

> 注意，对于码点大于 0xFFFF 的字符，点字符不能正确匹配，因为会认为这是两个字符。

### 位置字符

位置字符用来提示字符所处的位置，主要有两个字符。

+ ^：表示字符串的开始位置
+ $：表示字符串的结束位置

```js
// test必须出现在开始位置
/^test/.test('test123') // true

// test必须出现在结束位置
/test$/.test('new test') // true

// 从开始位置到结束位置只有test
/^test$/.test('test') // true
/^test$/.test('test test') // false
```

### 选择符 |

选择符表示或则关系，多个选择符可以联合使用：

```js
// 匹配fred、barney、betty之中的一个
/fred|barney|betty/
```

选择符会包括它前后的多个字符，比如 /ab|cd/ 指的是匹配 ab 或者 cd ，而不是指匹配 b 或者 c 。如果想修改这个行为，可以使用圆括号。

```js
/a( |\t)b/.test('a\tb') // true
```

## 转义符

正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配 +，就要写成 \\+。

## 特殊字符

正则表达式对一些不能打印的特殊字符，提供了表达方法。

-  \cX  表示 Ctrl-[X] ，其中的 X 是A-Z之中任一个英文字母，用来匹配控制字符。
-  [\b]  匹配退格键(U+0008)，不要与 \b 混淆。
-  \n  匹配换行键。
-  \r  匹配回车键。
-  \t  匹配制表符 tab（U+0009）。
-  \v  匹配垂直制表符（U+000B）。
-  \f  匹配换页符（U+000C）。
-  \0  匹配 null 字符（U+0000）。
-  \xhh  匹配一个以两位十六进制数（ \x00 - \xFF ）表示的字符。
-  \uhhhh  匹配一个以四位十六进制数（ \u0000 - \uFFFF ）表示的 Unicode 字符。

## 字符类

字符类表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内。

比如 [xyz] 表示 x、y、z 之中任选一个进行匹配就可以了。

有两个字符在字符类中有特殊含义

### 脱字符 ^

如果方括号内的第一个字符是 \^，则表示除了字符类中的字符，其他字符都可以匹配。比如，[\^xyz] 表示除了 x、y、z 之外的都可以匹配。

如果方括号内没有其他字符，即只有 [^]，就表示匹配一切字符，其中包括换行符。相比之下，点号作为元字符（.）是不包括换行符的。

### 连字符 -

某些情况下，对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。比如，[abc] 可以写成 [a-c]，[0123456789] 可以写成 [0-9]，同理 [A-Z] 表示 26 个大写字母。

以下都是合法的字符类简写形式。

```js
[0-9.,]
[0-9a-fA-F]
[a-zA-Z0-9-]
[1-31]
```

上面代码中最后一个字符类 [1-31]，不代表 1 到 31，只代表 1 到 3。

连字符还可以用来指定 Unicode 字符的范围。

```js
var str = "\u0130\u0131\u0132";
/[\u0128-\uFFFF]/.test(str)
// true
```

上面代码中，\u0128-\uFFFF 表示匹配码点在 0128 到 FFFF 之间的所有字符。

另外，不要过分使用连字符，设定一个很大的范围，否则很可能选中意料之外的字符。最典型的例子就是 [A-z]，表面上它是选中从大写的 A 到小写的 z 之间 52 个字母，但是由于在 ASCII 编码之中，大写字母与小写字母之间还有其他字符，结果就会出现意料之外的结果。

## 预定义模式

预定义模式指的是某些常见模式的简写方式。

- \d：匹配 0-9 之间的任一数字，相当于 [0-9]。
- \D：匹配所有 0-9 以外的字符，相当于 [\^0-9]。
- \w：匹配任意的字母、数字和下划线，相当于 [A-Za-z0-9_]。
- \W：除所有字母、数字和下划线以外的字符，相当于 [\^A-Za-z0-9_]。
- \s：匹配空格（包括换行符、制表符、空格符等），相等于 [ \t\r\n\v\f]。
- \S：匹配非空格的字符，相当于 [\^ \t\r\n\v\f]。
- \b：匹配词的边界。
- \B：匹配非词边界，即在词的内部。

## 重复类

模式的精确匹配次数，使用大括号 {} 表示。{n} 表示恰好重复 n 次，{n,} 表示至少重复 n 次，{n,m} 表示重复不少于 n 次，不多于 m 次。

```js
/lo{2}k/.test('look') // true
/lo{2,5}k/.test('looook') // true
```

> 要注意的是，{n,m} 中 n 和 m 之间**不能存在空格**，仅存在英文逗号。

## 量词符

量词符用来设定某个模式出现的次数。

- ? 问号表示某个模式出现 0 次或 1 次，等同于 {0, 1}。
- \* 星号表示某个模式出现0次或多次，等同于 {0,}。
- \+ 加号表示某个模式出现1次或多次，等同于 {1,}。

## 贪婪模式

上面的三个量词符，默认情况下都是最大可能匹配，即匹配到下一个字符不满足规则为止，这就被称为贪婪模式。

除了贪婪模式，还有非贪婪模式，即最小可能匹配，只要已发现匹配对象，就返回结果，不继续往下检查了。

如果想要将贪婪模式修改为非贪婪模式，可以在量词符后面添加一个问问号。

## 修饰符

修饰符表示模式的附加规则，放在正则模式的最尾部。修饰符可以单个使用，也可以多个放在一起使用。

### g 修饰符

默认情况下，第一次匹配成功后，正则对象就停止向下匹配了。g 修饰符表示全局匹配，加上它以后，正则对象将匹配全部符合条件的结果。

### i 修饰符

默认情况下，正则对象区分字母的大小写，加上 i 修饰符后就忽略了大小写。

### m 修饰符

m 修饰符表示多行模式，会修改 ^ 和 $ 的行为。默认情况下（即不加 m 修饰符），\^ 和 \$ 匹配字符串的开始和结尾，加上 m 修饰符后，^ 和 \$ 还会匹配行首和行尾。

### y 修饰符

y 修饰符表示黏附模式，只查找从 lastIndex 开始及之后的字符串。

### u 修饰符

Unicode 模式，启用 Unicode 匹配。

### s 修饰符

dotAll 模式，表示元字符 . 可以匹配任何字符（包括 \n 和 \r）

## 组匹配

### 概述

正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容。

```js
/tom+/.test('tomm') // true
/(tom)+/.test('tomtom') // true
```

第一个模式没有括号，因此 + 只表示重复字母 m；

第二个模式又括号，因此 + 表示重复 tom 这个词。

在正则表达式内部，可以使用 \n 引用括号匹配的内容。

> 注意，n 是从 1 开始的自然数，表示对应顺序的括号。

```js
/(.)b(.)\1\2/.test("abcac") // true
```

第一个括号匹配到 a，那么 \1 就表示 a；第二个括号匹配到 c，那么 \2 就表示 c。

### 非捕获组

(?:x) 称为非捕获组，表示不返回该组匹配的内容，即匹配的结果中不计入这个括号。

> 简单来说，原本的捕获组可以用 \n 的方式来索引，但是非捕获组会忽略。

### 先行断言

x(?=y) 的形式称为先行断言，即 x 只有在 y 前面才匹配，但是 y 不会被计入返回结果。

先行断言中，括号里的部分是不会返回的。

### 先行否定断言

x(?!y) 的形式称为先行否定断言，x 只有不在 y 前面才会匹配，y 自然不会被计入返回结果。

# 练习

## 验证合法 QQ 号

分析：

1. 首位不为 0：

```js
/^[1-9]/
```

2. 后面全是数字，字符数量 4 -10

```js
/^[1-9]\d{4,10}$/
```

```js
function checkQQ(s) {
    const reg = /^[1-9]\d{4,10}$/
    return reg.test(s)
}

console.log(checkQQ("1954486214"))
```

## 验证邮箱格式

分析：

1. 开头是 user：数字，字母或者下划线，字符数量不少于 5，不多于 12：

```js
/^\w{5,12}/
```

2. 中间一个 @ 分隔符

```js
/^\w{5,12}@/
```

3. 邮箱接收服务器域名，此处仅仅假定为数字 or 字母，不限字符数量。

```js
/^\w{5,12}@[0-9a-zA-Z]+/
```

4. 邮箱末尾 .com

```js
/^\w{5,12}@[0-9a-zA-Z]+\.com$/
```

```js
function checkEmail(s) {
    const reg = /^\w{5,12}@[0-9a-zA-Z]+\.com$/
    return reg.test(s)
}
console.log(checkEmail("yucohny@163.com"))
```

