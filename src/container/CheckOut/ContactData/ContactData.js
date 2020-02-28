import React, {useState} from 'react';
import {connect} from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import styles from './ContactData.module.css';

const  ContactData =props=>{
    const [orderForm, setOrderForm]=useState({
        name:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your name'
            },
            value:'Fury',
            validation:{
                required:true
            },
            valid:false
        },
        email:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your email'
            },
            value:'dassa@kd.com',
            validation:{
                required:true
            },
            valid:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your street'
            },
            value:'space whole',
            validation:{
                required:true
            },
            valid:false
        },
        zipCode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your zipcode'
            },
            value:'d0w 9wp',
            validation:{
                required:true
            },
            valid:false
        },
        delivery:{
            elementType:'select',
            elementConfig:{
                options:[{value:'maybe', display:'Maybe'},
                         {value:'never', display:'Never'}
                        ]
            },
            validation:{
                required:false
            },
            value:'maybe'
        }
    });
    
    const orderHandler=(event)=>{
        event.preventDefault();
        const orderData={};
        for(let el in orderForm){
            orderData[el]=orderForm[el].value;
        }
        const order={
            ingredients:props.ings,
            price:props.price,
            orderDetail:orderData,
            userId:props.userId
        };
        props.onOrderBurger(order, props.token);
    }

    const checkValidity=(value, rules)=>{
        let isValid=false;
        if(rules.required){
            isValid=value.trim()!=='';
        } else{
            isValid=true;
        }
        return isValid;
    }
    const inputChangeHandler=(event, inputPoint)=>{
        const updateOrderForm={
            ...orderForm
        };
        const innerUpdateForm={...updateOrderForm[inputPoint]};
        innerUpdateForm.value=event.target.value;
        innerUpdateForm.valid=checkValidity(innerUpdateForm.value,innerUpdateForm.validation);
        updateOrderForm[inputPoint]=innerUpdateForm;
        console.log(innerUpdateForm);
        setOrderForm(updateOrderForm);
    }

    const formElementsArray=[];
        for(let key in orderForm){
            formElementsArray.push(
                {
                    id:key,
                    config:orderForm[key]
                }
            );
        }
        let form=(
        <form onSubmit={orderHandler}>
            {
                formElementsArray.map(
                    element=>(
                        <Input 
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            invalid={!element.config.valid}
                            shouldValid={element.config.validation}
                            changeValue={(event)=>inputChangeHandler(event,element.id)}
                        />
                    )
                )
            }
            <Button btnType='Success' >Order</Button>
        </form>);
        if(props.loading){
            form=<Spinner/>;
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
}
const mapStateToProps =state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps =dispatch=>{
    return{
        onOrderBurger: (order,token)=>dispatch(actions.purchaseBurger(order,token))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));