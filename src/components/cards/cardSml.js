import React from "react";
import { useContext } from "react";
import BasketContext from "../../store/basket-context";
import classes from "./cardSml.module.css"


function CardSml(props) {
    const BasketCtx = useContext(BasketContext)


    function handleAddClick() {
        let temp = document.querySelector(`.a${props.id}`)
        let value = parseInt(temp.textContent)
        temp.textContent = value += 1
        BasketCtx.inBasket.push(props)
        console.log(BasketCtx.inBasket)
        
    }

    function handleRemoveClick() {
        let temp = document.querySelector(`.a${props.id}`)
        let value = parseInt(temp.textContent)
        if (value) {
            temp.textContent = value-=1
        }
    }

    return <li className="cardSml" style={props.backgroundColour ? {backgroundColor: props.backgroundColour} : {backgroundColor: "#E3655B"}}>
        <div className="cardSml-info">
            <div className="cardSml-title">{props.sku}</div>
            <div className="cardSml-price">{props.price / 100}</div>
        </div>
        <div className="cardSml-actions">
            <div><img src="/plus-square.svg" style={{stroke: props.backgroundColor}} alt="Add 1/ another to basket" onClick={handleAddClick}/></div>
            <div className={`cardSml-amount a${props.id}`}>{props.quantity}</div>
            <div><img src="/minus-square.svg" style={{fill: props.backgroundColour}} alt="Remove 1 from basket" onClick={handleRemoveClick}/></div>
        </div>
    </li>
}

export default CardSml