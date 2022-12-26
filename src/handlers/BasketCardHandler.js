import React from "react";
import { useState } from "react";
import DiscountsEl from "../components/totals/DiscountsEl";
import Total from "../components/totals/Total";
import SmlCardHandler from "./SmlCardHandler";

function BasketCardHandler(props) {

    const [discount, setDiscount] = useState()

    let idsInArray = []
    let sortedArr = []
    
    for (let i = 0; i < props.data.length; i++) {
        if (!idsInArray.includes(props.data[i].sku)) {
            
            idsInArray.push(props.data[i].sku)
            
            let initialArrOfProps = [props.data[i].sku, props.data[i], 1, props.data[i].backgroundColour]
            
            sortedArr.push(initialArrOfProps)
        } else {
            for (let x = 0; x < sortedArr.length; x++) {
                if (sortedArr[x][0] == props.data[i].sku) {
                    sortedArr[x][2] += 1
                    if (!sortedArr[x][3] && props.data[i].backgroundColour) {
                        sortedArr[x][3] = props.data[i].backgroundColour
                    }
                    
                }
            }
        }
   }

    

    let finalArr = []
    let prices = 0

    for (let i = 0; i < sortedArr.length; i++) {


        
        let tempObj = { ...sortedArr[i][1]}
        console.log(tempObj)
        tempObj.quantity = sortedArr[i][2]
        let total = parseInt(tempObj.price) * tempObj.quantity
        prices+=total
        finalArr.push(tempObj)
    }
    console.log(finalArr)


    
    

    return (<div>
        <SmlCardHandler data={finalArr} />

        <DiscountsEl data={finalArr} setDiscount={setDiscount} />
        <Total total={prices / 100 - (discount/100)} />

    </div>)
}

export default BasketCardHandler