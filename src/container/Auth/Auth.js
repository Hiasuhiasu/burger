import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        }
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
        const form=formElementsArray.map(element=>(
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
        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                    <Button btnType='Success'>Send data</Button>
                </form>
            </div>
        );
    }
}

export default Auth;