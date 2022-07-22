`iframe` 标签用于在网页中显示网页。

`iframe` 标签接收一个 `src` 属性，用于指向嵌入网页的 URL。

```html
<body>
    <iframe src="https://yucohny.vercel.app/"></iframe>
</body>
```

`iframe` 标签接收两个参数 `width` 与 `height`，这两个属性的默认值为 `px` 像素，但是也可以指定为百分比。

`frameborder` 属性规定是否显示 `iframe` 周围的边框，设置属性值为 0 就可以移除边框。

`iframe` 可用作链接的目标 `target`，链接的 `target` 属性必须引用 `iframe` 的 `name` 属性：

```html
<body>
    <iframe src="https://yucohny.vercel.app/" width="500" height="600" name="iframe"></iframe>
    <div>
        <a href="https://yucohny.vercel.app/introduction" target="iframe">Introduction</a>
    </div>
</body>
```