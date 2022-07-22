import React from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';

const data = [
    ["chrome-architecture", "Chrome 基本架构"],
    ["how-the-data-packets-arrive-at-the-destination-accurately", "IP、UDP 与 TCP"],
    ["http-request", "HTTP 请求流程"],
    ["navigation-process", "导航流程"],
    ["rendering-process", "渲染流程"],
    ["same-origin-policy", "同源策略"],
    ["xss", "XSS 跨站脚本攻击"],
    ["csrf", "CSRF 跨站请求伪造"],
    ["cors", "CORS 跨域资源共享"],
    ["http1", "HTTP/1"]
]

const ComputerNetworkLeftBar = () => {
    return (
        <Menu mode="vertical">
            {
                data.map(item => {
                    return (
                        <Menu.Item key={item[0]}>
                            <MyNavLink to={"/computer-network/" + item[0]} name={item[1]}/>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    );
}

export default ComputerNetworkLeftBar