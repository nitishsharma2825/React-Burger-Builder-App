import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/auxiliary/auxiliary'

import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')} onClick={props.clicked}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}
export default sideDrawer