import React, {Component} from "react"
import {Route, Routes} from "react-router-dom"
import JSLeftBar from "../../Pages/JSLeftBar"
import IntroductionLeftBar from "../../Pages/IntroductionLeftBar"
import HCLeftBar from "../../Pages/HCLeftBar"
import ReactLeftBar from "../../Pages/ReactLeftBar"
import TSLeftBar from "../../Pages/TSLeftBar"
import WebpackLeftBar from "../../Pages/WebpackLeftBar"
import ComputerNetworkLeftBar from '../../Pages/ComputerNetworkLeftBar'
import './index.css'

export default class ContentLeftBar extends Component {
    render() {
        return (
            <aside className="leftAside">
                <div className="leftAsideContent">
                    <Routes>
                        <Route index element={<IntroductionLeftBar/>}/>
                        <Route path="/introduction/*" element={<IntroductionLeftBar/>}/>
                        <Route path="/javascript/*" element={<JSLeftBar/>}/>
                        <Route path="/htmlcss/*" element={<HCLeftBar/>}/>
                        <Route path="/webpack/*" element={<WebpackLeftBar/>}/>
                        <Route path="/react/*" element={<ReactLeftBar/>}/>
                        <Route path="/dva/*" element={<ReactLeftBar/>}/>
                        <Route path="/typescript/*" element={<TSLeftBar/>}/>
                        <Route path="/computer-network/*" element={<ComputerNetworkLeftBar/>}/>
                    </Routes>
                </div>
            </aside>
        )
    }
}