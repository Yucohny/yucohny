import React from 'react'
import {Navigate} from 'react-router-dom'
import MyMarkdown from '../../Components/MyMarkdown'
import ImportContent from '../../Components/ImportContent'
import Introduction from '../../note/README.md'
import html_readme from '../../note/HTML/README.md'
import css_readme from '../../note/CSS/README.md'
import js_readme from '../../note/JavaScript/README.md'
import r_readme from '../../note/React/README.md'
import ts_readme from '../../note/TypeScript/README.md'
import wp_readme from '../../note/Webpack/README.md'
import cn_readme from '../../note/计算机网络/README.md'

const {html_data, css_data, js_data, ts_data, webpack_data, react_data, computer_network_data} = ImportContent

export default [
    {
        path: '/introduction',
        element: <MyMarkdown children={Introduction}/>
    },
    {
        path: '/html',
        children: [
            {
                path: '/html',
                element: <MyMarkdown children={html_readme}/>
            },
            ...html_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/css',
        children: [
            {
                path: '/css',
                element: <MyMarkdown children={css_readme}/>
            },
            ...css_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/javascript',
        children: [
            {
                path: '/javascript',
                element: <MyMarkdown children={js_readme}/>
            },
            ...js_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/typescript',
        children: [
            {
                path: '/typescript',
                element: <MyMarkdown children={ts_readme}/>
            },
            ...ts_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/webpack',
        children: [
            {
                path: '/webpack',
                element: <MyMarkdown children={wp_readme}/>
            },
            ...webpack_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/react',
        children: [
            {
                path: '/react',
                element: <MyMarkdown children={r_readme}/>
            },
            ...react_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/computer-network',
        children: [
            {
                path: '/computer-network',
                element: <MyMarkdown children={cn_readme}/>
            },
            ...computer_network_data.map(item => {
                return {
                    key: item[0],
                    path: item[0],
                    element: <MyMarkdown children={item[1]}/>
                }
            })
        ]
    },
    {
        path: '/',
        element: <Navigate to='/introduction'/>
    }
]