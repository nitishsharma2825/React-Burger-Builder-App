import React from 'react'
import classes from './Logo.module.css'
import Logo from '../../assets/images/burger-logo.png'

const logo=(props)=>(
    <div style={{height:props.height}} className={classes.Logo}>
        <img src={Logo} alt="My Burger" />
    </div>
)

export default logo