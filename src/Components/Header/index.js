import React from "react"
import MyNavLink from "../MyNavLink"
import {Menu} from 'antd';
import './index.css'
import 'antd/dist/antd.less'

const data = [
    ["/introduction", "简介"],
    ['/html', 'HTML'],
    ["/css", "CSS"],
    ["/javascript", "JavaScript"],
    ["/typescript", "TypeScript"],
    ["/react", "React"],
    ["/webpack", "Webpack"],
    ["/computer-network", "计算机网络"],
]

const Header = () => {
    return (
        <header className="Header">
            <Menu mode="horizontal" className="menu">
                {
                    data.map(item => {
                        return (
                            <Menu.Item key={item[0]}>
                                <MyNavLink key={item[0]} to={item[0]} name={item[1]}/>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </header>
    )
}

export default Header