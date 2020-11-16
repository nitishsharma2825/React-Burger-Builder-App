import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl' 
const controls=[
    {label: 'Salad', type:'salad'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'},
]
const BuildControls=(props)=>{
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((control)=><BuildControl key={control.label} label={control.label} added={()=>props.added(control.type)} removed={()=>props.removed(control.type)} disabled={props.disabled[control.type]}/>)}
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.showModal}>
                {props.isAuth?'ORDER NOW':'SIGN UP TO ORDER'}
            </button>
        </div>
    )
}
export default BuildControls