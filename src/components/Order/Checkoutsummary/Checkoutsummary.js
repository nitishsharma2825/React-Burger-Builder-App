import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './Checkoutsummary.module.css'
const checkoutsummary=(props)=>{
    return(
        <div className={classes.Checkout}>
            <h1>We hope this tastes well!!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' Clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' Clicked={props.continue}>CONTINUE</Button>
        </div>
    )
}
export default checkoutsummary