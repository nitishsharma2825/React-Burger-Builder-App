import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredients from './Burgeringredients/Burgeringredients' 
const Burger=(props)=>{
    var transformedIngredients=Object.keys(props.ingredients).map((ing)=>{return [...Array(props.ingredients[ing])].map((_,i)=>{return <BurgerIngredients key={ing+i} type={ing} />})}).reduce((arr,el)=>{ return arr.concat(el)},[])
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please enter the ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredients type='bread-bottom'/>
        </div>
    )
}
export default Burger