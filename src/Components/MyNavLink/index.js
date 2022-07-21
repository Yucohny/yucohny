import React from "react"
import {NavLink} from "react-router-dom"

const MyNavLink = (props) => {
    const {to, name} = props
    return (
        <NavLink activeclassname="active" className="Header-Item-NavLink" to={to}>{name}</NavLink>
    )
}

export default MyNavLink