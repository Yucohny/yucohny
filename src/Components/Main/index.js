import React, {Component} from "react"
import LeftAside from "../LeftAside"
import Content from "../Content"
import RightAside from "../RightAside"
import './index.css'

export default class Main extends Component {
    render() {
        return (
            <main className="content">
                <LeftAside/>
                <Content/>
                <RightAside/>
            </main>
        )
    }
}