import React from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';

const data = [
    ['iframe', 'iframe']
]

const HtmlLeftBar = () => {
    return (
        <Menu mode="vertical">
            {
                data.map(item => {
                    return (
                        <Menu.Item key={item[0]}>
                            <MyNavLink to={"/html/" + item[0]} name={item[1]}/>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    );
}

export default HtmlLeftBar