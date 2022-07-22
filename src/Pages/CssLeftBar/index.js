import React from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';

const data = [
    ["unit", "单位"],
    ["display", "Display"],
    ["position", "Position"],
    ["float", "Float"],
    ["boxmodel", "盒模型"],
    ["hide", "隐藏元素"],
    ["centered_horizontally_and_vertically", "水平垂直居中"],
    ["flex", "弹性布局"],
    ["bfc", "BFC"]
]

const CssLeftBar = () => {
    return (
        <Menu mode="vertical">
            {
                data.map(item => {
                    return (
                        <Menu.Item key={item[0]}>
                            <MyNavLink to={"/css/" + item[0]} name={item[1]}/>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    );
}

export default CssLeftBar