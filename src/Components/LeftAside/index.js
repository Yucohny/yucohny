import React from 'react'
import {useRoutes} from 'react-router-dom'
import LeftAsideRoutes from '../../Routes/LeftAsideRoutes'
import './index.css'

const LeftAside = () => {
    const elements = useRoutes(LeftAsideRoutes)

    return (
        <aside className="leftAside">
            <div className="leftAsideContent">
                {
                    elements
                }
            </div>
        </aside>
    )
}

export default LeftAside