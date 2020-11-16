import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/Checkoutsummary/Checkoutsummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary=<Redirect to='/' />
        if(this.props.ingredients){
            const purchasedFinished=this.props.purchased?<Redirect to='/' />:null
            summary=<div>
            {purchasedFinished}
            <CheckoutSummary
                ingredients={this.props.ingredients}
                cancel={this.checkoutCancelledHandler}
                continue={this.checkoutContinuedHandler} />
            <Route path='/checkout/contact-data' component={ContactData} />
        </div>
        }
        return summary
    }
}

const mapStateToProps = state=>{
    return {
        ingredients:state.burger.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);