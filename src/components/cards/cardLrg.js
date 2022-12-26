import React from "react";
import { useContext } from "react";
import BasketContext from "../../store/basket-context";
// import '.././Index.module.css';
import styles from "./cardLrg.module.css"




function CardLrg(props) {
    console.log(props)

    const BasketCtx = useContext(BasketContext)

    let discountLabel;

    if (props.discount.discountType == "multibuy") {
        discountLabel = `${props.discount.itemQuantityCount} for ${props.discount.itemMultiPrice}`
    } else {
        discountLabel = `${props.discount.itemDependentOnPrice} if with ${props.discount.itemDependentOn}`
    }

    function handleAddClick() {
        if (props.discount.discountType == "multibuy") {
            let obj = {
                id: props.id,
                sku: props.sku,
                price: props.discount.itemMultiData.price,
                quantity: 0,
                backgroundColour: props.backgroundColour,

            }
            
            for (let i = 0; i < props.discount.itemQuantityCount; i++) {
                
                BasketCtx.inBasket.push(obj)
            }
        } else {

            // let objItemOneRaw = 
            let objItemOne = {
                id: props.id,
                sku: props.sku,
                price: parseInt(props.discount.subjectItemData.price),
                quantity: 1,
                backgroundColour: props.backgroundColour,
            }
            
            

            let objItemTwoRaw = props.discount.itemDependentOnData

            

            let objItemTwo = {
                id: objItemTwoRaw.id,
                sku: objItemTwoRaw.sku,
                price: parseInt(objItemTwoRaw.price),
                quantity: 1,
                backgroundColor: objItemTwoRaw.backgroundColor
            }
            BasketCtx.inBasket.push(objItemOne)
            BasketCtx.inBasket.push(objItemTwo)
            console.log(objItemTwoRaw)

        }
        
        
    }

    return (
        <li>
            <div className="CardLrg" style={{backgroundColor: props.backgroundColour}}>
            <div className="CardLrgHead">
                    <div className="CardLrgDiscount">{discountLabel}</div>
                <img onClick={handleAddClick} src="./plus-square.svg" style={{color: props.backgroundColour }} alt="Add to basket"/>
            </div>
            <div className="CardLrgMainContent">{props.sku}</div>
        </div>
        </li>
        
    )
}

export default CardLrg