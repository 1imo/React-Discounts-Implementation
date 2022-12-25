import React from "react";
import CardSml from "../components/cards/cardSml";
import classes from "./SmlCardHandler.module.css"

function SmlCardHandler(props) {
    return <ul className="itemList">
        {props.data.map((info, index) => <CardSml
            
            key={index} id={index}
            sku={info.sku}
            price={info.price}
            backgroundColour={info.backColour ? info.backColour : info.backgroundColour}
            quantity={info.quantity ? info.quantity : 0}
             />)}
    </ul>

}

export default SmlCardHandler