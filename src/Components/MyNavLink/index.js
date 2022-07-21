import React from "react"
import {NavLink} from "react-router-dom"

const MyNavLink = () => {
    const {to, name} = this.props
    return (
        <NavLink activeclassname="active" className="Header-Item-NavLink" to={to}>{name}</NavLink>
    )
}

export default MyNavLink