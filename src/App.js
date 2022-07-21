import React, { Component } from "react"
import Header from "./Components/Header"
import Main from "./Components/Main"
import Footer from "./Components/Footer"

export default class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <Main/>
                <Footer/>
            </>
        )
    }
}