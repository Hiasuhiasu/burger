import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import styles from './Auth.module.css';

class Auth extends Component {
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your password'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    };

    checkValidity(value, rules){
        let isValid=false;
        if(rules.required){
            isValid=value.trim()!=='';
        } else{
            isValid=true;
        }
        return isValid;
    }
    inputChangeHandler=(event, controlName)=>{
        const updateControl={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updateControl});
    }
    submitHandler =(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup);
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignup:!prevState.isSignup};
        })
    }
    render () {
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push(
                {
                    id:key,
                    config:this.state.controls[key]
                }
            );
        }
        let form=formElementsArray.map(element=>(
            <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                shouldValid={element.config.validation}
                changeValue={(event)=>this.inputChangeHandler(event,element.id)}
            />
        ));
        if(this.props.loading){
            form=<Spinner/>
        };
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect=null;
        if (this.props.isAuth){
            authRedirect=<Redirect to='/'/>
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>Switch to {this.state.isSignup ? "SignIn" : "SignUp"}</Button>
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps =state=>{
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !==null
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onAuth:(email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);