import React,{Component} from 'react'
import Aux from '../auxiliary/auxiliary'
import classes from './layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
class Layout extends Component {
    state={
        showSideDrawer:false
    }
    sideDrawerHandler=()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerTogglerHandler=()=>{
        this.setState((prevState)=>{ return {showSideDrawer:!prevState.showSideDrawer}})
    }
    render(){
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuth} clicked={this.sideDrawerTogglerHandler}/>
                <SideDrawer isAuth={this.props.isAuth} open={this.state.showSideDrawer} clicked={this.sideDrawerHandler}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state=>{
    return {
        isAuth:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout)