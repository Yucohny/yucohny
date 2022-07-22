import React from "react"
import {useRoutes} from "react-router-dom"
import RightAsideRoutes from "../../Routes/RightAsideRoutes"
import './index.css'

const RightAside = () => {
    const elements = useRoutes(RightAsideRoutes)

    return (
        <aside className="rightAside">
            <div className="rightAsideContent">
                {
                    elements
                }
            </div>
        </aside>
    )
}

export default RightAside