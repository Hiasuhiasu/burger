import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

const INGREDIENT_PRICE={
    salad:0.3,
    cheese:0.5,
    bacon:0.4,
    meat:0.8
}
class BurgerBuilder extends Component{
    state={
     //   ingredients:null,
     //   totalPrice:2,
        purchasable:true,
        buyIt: false,
    }
    componentDidMount(){
     /*   axios.get('/ingredients.json')
            .then(response=>{this.setState({ingredients:response.data});
            })
            .catch(err=>{});
    */
            this.props.onInitIngredients();
    }
    checkPurchasable(ingredients){
        const sum=Object.keys(ingredients)
            .map(key=>{
                return ingredients[key];
            }).reduce((sum, el)=>{
               return sum+el
            },0);
            this.setState({purchasable:sum>0});
    }
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updateCount=oldCount+1;
        const updateIngredients={
            ...this.state.ingredients
        };
        updateIngredients[type]=updateCount;
        const priceAddition=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updateIngredients});
        this.checkPurchasable(updateIngredients);
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){return};
        const updateCount=oldCount-1;
        const updateIngredients={
            ...this.state.ingredients
        };
        updateIngredients[type]=updateCount;
        const priceDedaction=INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDedaction;
        this.setState({totalPrice:newPrice, ingredients:updateIngredients});
        this.checkPurchasable(updateIngredients);
    }
    buyItHandler=()=>{
        this.setState({buyIt:true});
    }  
    closeChecOutHandler=()=>{
        this.setState({buyIt:false});
    }
    continueBuyHandler=()=>{
        //alert('You buy it!');
     /*   
        
    */
        const queryParam=[];
        for(let i in this.props.ings){
            queryParam.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ings[i]));
        }
        queryParam.push('price=' + this.props.price);
        const queryString=queryParam.join('&');
        this.props.onInitPurchase();
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        }); 
    }
    render(){
        const disableControl={...this.props.ings};
        for (let key in disableControl){
            disableControl[key]=disableControl[key]<=0
        }
        let orderSummary=null;
        let burger=this.props.errorState ?<p>Error network</p>: <Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemove={this.props.onRemoveIngredient}
                    price={this.props.price}
                    disabled={disableControl}
                    chekOut={this.buyItHandler}
                    purchase={this.state.purchasable}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            btnBuy={this.continueBuyHandler}
            btnCancel={this.closeChecOutHandler}/>
         }
        return(
            <Aux>
                <Modal show={this.state.buyIt}
                    hide={this.closeChecOutHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps =state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        errorState:state.burgerBuilder.error
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAddIngredient: (ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onRemoveIngredient: (ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit())
    }
}  

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));