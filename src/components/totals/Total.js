import React from "react";
import classes from "./Total.module.css"

function Total(props) {
    

    return <div className="totalContainer">
        <div className="totalHead total">Total</div>
        <div className="totalPrice total">{props.total}</div>
    </div>
}

export default Total