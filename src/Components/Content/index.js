import React from "react"
import {useRoutes} from "react-router-dom";
import ContentRoutes from "../../Routes/ContentRoutes";
import './index.css'

const Content = () => {
    const elements = useRoutes(ContentRoutes)

    return (
        <div className="ContentBody">
            {
                elements
            }
        </div>
    )
}

export default Content