import React from 'react'
import classes from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom'
const navItem=(props)=>(
    <li className={classes.NavigationItem}>
        <NavLink exact={props.active} activeClassName={classes.active} to={props.link}>{props.children}</NavLink>
    </li>
)
export default navItem