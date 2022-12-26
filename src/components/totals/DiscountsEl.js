import React from "react";
import { useState, useEffect } from "react";


function DiscountsEl (props) {
    const [isLoading, setIsLoading] = useState(true)
    const [loadedData, setLoadedData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetch("https://linneysinterview-default-rtdb.firebaseio.com/discounts.json"
        )
            .then(response => {
            return response.json()
            })
            .then(data => {
                const dataArr = []
                for (const key in data) {
                    const dataForArray = {
                        id: key,
                        ...data[key]
                    }

                    dataArr.push(dataForArray)
                }

                setIsLoading(false)
                setLoadedData(dataArr)
                
        })
    }, [])

    console.log(props.data)
    console.log(loadedData)

    let discountedPrice = 0


    for (let i = 0; i < props.data.length; i++) {

        for (let x = 0; x < loadedData.length; x++)
            if (props.data[i].sku == loadedData[x].item && loadedData[x].discountType == "multibuy") {
                const discountsFound = []


                discountsFound.push(loadedData[x])
                
                for (let y = 0; y < loadedData.length; y++) {
                    if (loadedData[y].item == props.data[i].sku && y !== x) {
                        discountsFound.push(loadedData[y])
                        console.log(discountsFound)
                    }

                }

                // console.log(discountsFound)

                if (discountsFound.length > 1) {
                   
                    let swapCount = 0
                    function binaryArranger() {
                        for (let y = 0; y < discountsFound.length; y++) {
                            console.log(discountsFound[y].itemQuantityCount)
                            if (y != discountsFound.length - 1 && parseInt(discountsFound[y].itemQuantityCount) < parseInt(discountsFound[y + 1].itemQuantityCount)) {
                                let tempStore = discountsFound[y]
                                discountsFound[y] = discountsFound[y + 1]
                                discountsFound[y + 1] = tempStore
                                swapCount+=1
                            }
                            console.log(discountsFound)
                        }
                        if (swapCount != 0) {
                            swapCount = 0
                            binaryArranger()
                        }
                    }
                    binaryArranger()
                }

                

                for (let y = 0; y < discountsFound.length; y++) {
                    let remainder = false
                    let remainderVal = 0
                    
                    if (props.data[i].quantity >= parseInt(discountsFound[y].itemQuantityCount)) {
                        remainderVal = props.data[i].quantity % parseInt(discountsFound[y].itemQuantityCount)
                        remainderVal ? remainder = true : remainder = false
                        let discountedQuantitySet = (props.data[i].quantity - remainderVal)
                        console.log(remainder)
                        console.log(discountedQuantitySet)
                        console.log(parseInt(discountsFound[y].itemMultiData.price))
                        console.log(discountsFound[y].itemMultiPrice)
                        
                        discountedPrice += ((discountedQuantitySet * parseInt(discountsFound[y].itemMultiData.price) - (discountsFound[y].itemMultiPrice * discountedQuantitySet / discountsFound[y].itemQuantityCount)) / discountsFound.length)
                        
                        
                        
                    } else {
                        continue
                    }
                    if (!remainder) {
                        break
                    }
                
                }
            }
    }
    return <div className="totalContainer">
                <div className="totalHead total">Discounts</div>
        <div className="totalPrice total">{discountedPrice}</div>
    </div>
    }

    
            
export default DiscountsEl