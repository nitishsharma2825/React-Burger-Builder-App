import React, {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
class Auth extends Component{
    state={
        controls:{
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        isSignUp:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger&&this.props.redirectPath!=='/'){
            this.props.onSetAuthRedirectPath()
        }
    }

    authHandler=()=>{
        this.setState(prevState=>{return {isSignUp:!prevState.isSignUp}})
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
            const updatedControls = {
                ...this.state.controls,
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                }
            };
            this.setState({controls: updatedControls});
    }

    submitHandler=(event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp)
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form=<form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType='Success'>Submit</Button>
        </form>

        if(this.props.loading){
            form=<Spinner />
        }
        let login=null
        if(this.props.isAuth){
            login=<Redirect to={this.props.redirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {login}
                {form}
                <Button Clicked={this.authHandler} btnType='Danger'>{this.state.isSignUp?'SIGN IN':'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.auth.loading,
        isAuth:state.auth.token!==null,
        buildingBurger:state.burger.building,
        redirectPath:state.auth.redirectPath
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAuth:(email,password,signUp)=>dispatch(actions.auth(email,password,signUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.authRedirect('/'))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth)