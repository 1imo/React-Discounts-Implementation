import React from "react";
import CardLrg from "../components/cards/cardLrg";
import classes from "./LrgCardHandler.module.css"

function LrgCardHandler(props) {
    console.log(props)
    return <ul className="discountList">
        {props.data.map((info, index) => <CardLrg
            
            key={index} id={index}
            discount = {info}
            sku={info.item}
            price={info.price}
            backgroundColour={info.backColour}
             />)}
    </ul>
}

export default LrgCardHandler