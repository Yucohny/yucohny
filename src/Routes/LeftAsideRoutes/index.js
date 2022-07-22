import React from 'react'
import JSLeftBar from "../../Pages/JSLeftBar"
import HCLeftBar from "../../Pages/HCLeftBar"
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
        path: '/htmlcss/*',
        element: <HCLeftBar/>
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