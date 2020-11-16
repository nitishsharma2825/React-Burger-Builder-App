import React, { Component } from 'react'
import Aux from '../../hoc/auxiliary/auxiliary'
import Burger from '../../components/Burger/Burger'
import BuilderControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'
import {connect} from 'react-redux'

export class BurgerBuilder extends Component {
    state={
        showModal:false,
        loading: false,
    }

    async componentDidMount() {
        this.props.onInitIngredients()
    }

    modalHandler=()=>{
        if(this.props.isAuth){
            this.setState({showModal:true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }
    BackDropHandler=()=>{
        this.setState({showModal:false})
    }

    purchaseContinueHandler=()=>{
        this.props.onPurchased()
        this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo={...this.props.ingredients}
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null
        let burger=this.props.error? <p>Ingredients cannot be loaded!</p> :<Spinner />

        if(this.props.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuilderControls
                        isAuth={this.props.isAuth}
                        added={this.props.addIngredients}
                        removed={this.props.removeIngredients}
                        disabled={disabledInfo}
                        totalPrice={this.props.totalPrice}
                        purchaseable={this.props.totalPrice>0}
                        showModal={this.modalHandler}
                    />
                </Aux>
            )
            orderSummary=<OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice} showBackDrop={this.BackDropHandler} purchaseContinue={this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary=<Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.showModal} showBackDrop={this.BackDropHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        ingredients:state.burger.ingredients,
        totalPrice:state.burger.totalPrice,
        error:state.burger.error,
        isAuth:state.auth.token!==null
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        addIngredients:(ingredient)=>dispatch(burgerBuilderActions.addIngredient(ingredient)),
        removeIngredients:(ingredient)=>dispatch(burgerBuilderActions.removeIngredient(ingredient)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredient()),
        onPurchased:()=>dispatch(burgerBuilderActions.onPurchased()),
        onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.authRedirect(path))
    } 
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))