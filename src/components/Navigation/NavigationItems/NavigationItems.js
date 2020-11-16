import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
const navItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/">Burger Builder</NavigationItem>
        {props.isAuth?<NavigationItem link="/my-orders">My Orders</NavigationItem>:null}
        {props.isAuth?<NavigationItem link="/logout">Logout</NavigationItem>:<NavigationItem link="/auth">Auth</NavigationItem>}
    </ul>
)
export default navItems