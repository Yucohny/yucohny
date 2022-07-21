import React, {Component} from "react"
import MyNavLink from "../MyNavLink"
import { Menu } from 'antd';
import './index.css'
import 'antd/dist/antd.less'

const data = [
    ["/introduction", "简介"],
    ["/htmlcss", "HTML/CSS"],
    ["/javascript", "JavaScript"],
    ["/typescript", "TypeScript"],
    ["/react", "React"],
    ["/webpack", "Webpack"],
    ["/computer-network", "计算机网络"],
]

export default class Header extends Component {
    render() {
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
}