import React from "react"
import LeftAside from "../LeftAside"
import Content from "../Content"
import RightAside from "../RightAside"
import './index.css'

const Main = () => {
    return (
        <main className="content">
            <LeftAside/>
            <Content/>
            <RightAside/>
        </main>
    )
}

export default Main