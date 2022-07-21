import React from "react"

const trim = function (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

const MyMarkdownTitle = (props) => {
    let {markdown} = props
    markdown = markdown.replace(/\r/g, '')
    const lines = markdown.split(/\n/g)
    for (let i = 0; i < lines.length; ++i) {
        lines[i] = trim(lines[i])
    }
    const title = []
    for (let i = 0; i < lines.length; ++i) {
        if (lines[i][0] !== '#') {
            continue
        }
        let index = 0
        while (lines[i][index] === '#') {
            ++index
        }
        if (lines[i][index] !== ' ') {
            continue
        }
        for (let j = 1; j < lines[i].length; ++j) {
            if (lines[i][j] !== '#') {
                for (let k = j; k < lines[i].length; ++k) {
                    if (lines[i][k] !== ' ') {
                        title.push([j, lines[i].substr(k, lines[i].length)])
                        break
                    }
                }
                break
            }
        }
    }
    return (
        <div className="markdown-title">
            {
                title.length === 0 ? '' : <b>目录</b>
            }
            {
                title.map(item => {
                    if (item[0] === 1) {
                        return <div>
                            {item[1]}
                        </div>
                    } else if (item[0] === 2) {
                        return <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                        </div>
                    } else if (item[0] === 3) {
                        return <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                        </div>
                    } else if (item[0] === 4) {
                        return <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                        </div>
                    } else if (item[0] === 5) {
                        return <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                        </div>
                    } else {
                        return <div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                        </div>
                    }
                })
            }
        </div>
    )
}

export default MyMarkdownTitle