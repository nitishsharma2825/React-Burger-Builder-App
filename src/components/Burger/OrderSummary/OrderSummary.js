import React from 'react'
import Aux from '../../../hoc/auxiliary/auxiliary'
import Button from '../../UI/Button/Button'
const OrderSummary=(props)=>{

const orderIngredients=Object.keys(props.ingredients).map((ingredient)=><li key={ingredient}><span style={{textTransform:'capitalize'}}>{ingredient}</span> : {props.ingredients[ingredient]}</li>)

    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A delecious burger with following ingredients - </p>
            <ul>
                {orderIngredients}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" Clicked={props.showBackDrop}>CANCEL</Button>
            <Button btnType="Success" Clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
}
export default OrderSummary