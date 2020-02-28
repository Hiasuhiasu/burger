import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import styles from './Auth.module.css';

const Auth = props => {
    const [controls, setControls]=useState({
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
    });
    const [isSignup,setIsSignup] = useState(true);

    useEffect(()=>{
        if(props.buildingBurger && props.authRedirectPath !=='/'){
            props.onSetRedirectPath();
        }
    },[]);

    const checkValidity =(value, rules)=>{
        let isValid=false;
        if(rules.required){
            isValid=value.trim()!=='';
        } else{
            isValid=true;
        }
        return isValid;
    };
    const inputChangeHandler=(event, controlName)=>{
        const updateControl={
            ...controls,
            [controlName]:{
                ...controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value, controls[controlName].validation),
                touched:true
            }
        };
        setControls(updateControl);
    };
    const submitHandler =(event)=>{
        event.preventDefault();
        props.onAuth(controls.email.value,controls.password.value, isSignup);
    };
    const switchAuthModeHandler=()=>{
        setIsSignup(!isSignup);
    };

        const formElementsArray=[];
        for(let key in controls){
            formElementsArray.push(
                {
                    id:key,
                    config:controls[key]
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
                changeValue={(event)=>inputChangeHandler(event,element.id)}
            />
        ));
        if(props.loading){
            form=<Spinner/>
        };
        let errorMessage=null;
        if(props.error){
            errorMessage=(
                <p>{props.error.message}</p>
            )
        }
        let authRedirect=null;
        if (props.isAuth){
            authRedirect=<Redirect to={props.authRedirectPath}/>
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button 
                    clicked={switchAuthModeHandler}
                    btnType='Danger'>Switch to {isSignup ? "SignIn" : "SignUp"}</Button>
                {errorMessage}
            </div>
        );
    
}

const mapStateToProps =state=>{
    return {
        loading: state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onAuth:(email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
        onSetRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/')),

    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);