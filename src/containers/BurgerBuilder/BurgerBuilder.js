import React,{ Component } from 'react';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
const INGREDIENT_PRICES = {
    salad:.6,
    bacon:.9,
    cheese:.5,
    meat:1.3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalprice:4,
        purchasable:false,
        purchasing:false,
        purchasePressed:false
    }
    updatePurchaseState = (ings) =>{
        
        const sum = Object.values(ings).reduce((total,cur) => total+cur);
        console.log(ings)
        console.log(sum);
        this.setState({purchasable: sum>0});

    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const newIng = {...this.state.ingredients};
        newIng[type] = oldCount +1;
        const newPrice = this.state.totalprice + INGREDIENT_PRICES[type];
        this.setState({ingredients: newIng, totalprice: newPrice});
        this.updatePurchaseState(newIng);
    }
    purchasingHandler = () =>{
        this.setState({purchasing:true});
    }
    purchaseCanceled = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinued = () =>{
        this.setState({purchasePressed:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalprice,
            customer:{
                name:'V',
                address:{
                    street:'Cre',
                    zipCode: '123',
                    country:'Canada'
                },
                email: 'huh@huh.com'
            },
            deliveryMethod: 'high-end'
        }
        axios.post('/order.json',order)
        .then(res=>this.setState({purchasePressed:false , purchasing: false}))
        .catch(err => this.setState({purchasePressed:false , purchasing: false}));

    }
    deleteIngredientHandler = (type) =>{
        if(this.state.ingredients[type] <= 0)
        return;
        const oldCount = this.state.ingredients[type];
        const newIng = {...this.state.ingredients};
        newIng[type] = oldCount - 1;
        const newPrice = this.state.totalprice - INGREDIENT_PRICES[type];
        this.setState({ingredients: newIng, totalprice: newPrice});
        this.updatePurchaseState(newIng);
    }
    render(){
        const disabled = {...this.state.ingredients};
        for (let num in disabled){
            disabled[num] = disabled[num] <= 0;    
        }
        let orderSummary =  <OrderSummary ingredients={this.state.ingredients} 
        orderCancelled ={this.purchaseCanceled} 
        orderContinued={this.purchaseContinued}
        price={this.state.totalprice}/>
        if(this.state.purchasePressed){
            orderSummary = <Spinner/>
        }
        //console.log(disabled);  
        return(
            <>
            <Modal purchasing={this.state.purchasing} canceled={this.purchaseCanceled}>
            {orderSummary}
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
            price={this.state.totalprice} 
            addIng ={this.addIngredientHandler} 
            dellIng={this.deleteIngredientHandler} 
            disabled={disabled}
            purchase={this.state.purchasable}
            purchasing={this.purchasingHandler}
            />
            </>
        );
    }
}
export default BurgerBuilder;