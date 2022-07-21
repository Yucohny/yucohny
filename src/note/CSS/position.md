# 定位

定位由定位模式与位偏移组成。

定位模式由 CSS 中的 `position` 属性指定，默认值是 `static`。`position` 的取值与用法如下：

+ `static`

静态定位，即没有定位。如果 `position` 属性是 `static`，或者没有指定 `position` 属性，那么 `top`，`right`，`bottom`，`left` 以及 `z-index` 属性将无法生效。

+ `relative`

相对定位，是相对于元素原本的位置进行定位。同时，相对定位要保留原本的位置。

```html
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
```

```css
body {
    margin: 0;
    padding: 0;
    background-color: lightblue;
}

.box1, .box2{
    width: 80px;
    height: 80px;
}

.box1 {
    background-color: blue;
}

.box2 {
    background-color: red;
}
```

![](/images/CSS/Position/1.png)

现在我们对 box1 添加相对定位，并让他进行一定的偏移：

```css
.box1 {
    position: relative;
    top: 40px;
    left: 40px;
    background-color: blue;
}
```

![](/images/CSS/Position/2.png)

+ `absolute`

绝对定位，相对于 `static` 定位以外的第一个祖先元素进行定位，并且绝对定位元素中的百分比均以这个父元素为基准。如果具有绝对定位的元素的所有祖先元素都没有除 `static` 以外的定位，那么就会以浏览器窗口为标准进行定位。同时，绝对定位不再占有原先位置。

```html
<body>
    <div class="box1">
        <div class="box2"></div>
        <div class="box3"></div>
    </div>
</body>
```

```css
body {
    margin: 0;
    padding: 0;
    background-color: lightblue;
}

.box1 {
    width: 100px;
    height: 100px;
    position: relative;
    background-color: red;
}

.box2, .box3 {
    width: 20px;
    height: 20px;
}

.box2 {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: blue;
}

.box3 {
    background-color: yellow;
}
```

![](/images/CSS/Position/3.png)

+ `fixed`

固定定位，相对于浏览器窗口进行定位。同时，固定定位不再占有原先位置。

+ `sticky`

粘性定位，相对于浏览器窗口进行定位，并且必须添加 `top`、`left`、`right` 和 `bottom` 中的一个才生效。同时，粘性定位仍然占有原先位置。

+ `inherit`

继承父元素 `position` 属性。

# 叠放次序

使用定位布局时，可能会出现盒子重叠的情况。此时，可以使用 `z-index` 属性来控制盒子的前后次序。

注意：

+ 数值可以是正负整数，0，以及 `auto`（默认值）。如果数值越大，则说明盒子越靠上。
+ 如果属性值相同，则按照书写顺序后来者居上。
+ 数值后面不能添加单位。
+ 只有具有除 `static` 以外的 `position` 属性的盒子 `z-index` 属性才能生效。
