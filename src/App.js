import React,{Component} from 'react'
import Layout from './hoc/layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route,withRouter,Redirect,Switch} from 'react-router-dom'
import Logout from './containers/Logout/logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
// import ContactData from './containers/Checkout/ContactData/ContactData'

const asyncCheckout=asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})
const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})
const asyncOrders=asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})
class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }
  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/my-orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
