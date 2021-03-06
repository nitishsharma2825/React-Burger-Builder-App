import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
const toolbar=(props)=>{
    return (
        <header className={classes.ToolBar}>
            <div className={classes.DrawerToggle} onClick={props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height="80%" />
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}

export default toolbar