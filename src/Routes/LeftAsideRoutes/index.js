import React from 'react'
import JSLeftBar from "../../Pages/JSLeftBar"
import HtmlLeftBar from '../../Pages/HtmlLeftBar'
import CssLeftBar from "../../Pages/CssLeftBar"
import ReactLeftBar from "../../Pages/ReactLeftBar"
import TSLeftBar from "../../Pages/TSLeftBar"
import WebpackLeftBar from "../../Pages/WebpackLeftBar"
import ComputerNetworkLeftBar from '../../Pages/ComputerNetworkLeftBar'

export default [
    {
        path: '/javascript/*',
        element: <JSLeftBar/>
    },
    {
        path: '/html/*',
        element: <HtmlLeftBar/>
    },
    {
        path: '/css/*',
        element: <CssLeftBar/>
    },
    {
        path: '/webpack/*',
        element: <WebpackLeftBar/>
    },
    {
        path: '/react/*',
        element: <ReactLeftBar/>
    },
    {
        path: '/dva/*',
        element: <ReactLeftBar/>
    },
    {
        path: '/typescript/*',
        element: <TSLeftBar/>
    },
    {
        path: '/computer-network/*',
        element: <ComputerNetworkLeftBar/>
    }
]