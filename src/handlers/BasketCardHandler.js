import React from "react";
import DiscountsEl from "../components/totals/DiscountsEl";
import Total from "../components/totals/Total";
import SmlCardHandler from "./SmlCardHandler";

function BasketCardHandler(props) {

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


        let tempObj = {...sortedArr[i][1]}
        tempObj.quantity = sortedArr[i][2]
        let total = parseInt(tempObj.price) * tempObj.quantity
        prices+=total
        finalArr.push(tempObj)
    }
    

    return (<div>
        <SmlCardHandler data={finalArr} />

        <DiscountsEl />
        <Total total={prices / 100} />

    </div>)
}

export default BasketCardHandler