import React from "react";
import { useState, useEffect, useContext } from "react";
import BasketContext from "../../store/basket-context";



function DiscountsEl (props) {
    const [isLoading, setIsLoading] = useState(true)
    const [loadedData, setLoadedData] = useState([])

    const BasketCtx = useContext(BasketContext)

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

   
    let discountedPrice = 0


    for (let i = 0; i < props.data.length; i++) {
        for (let x = 0; x < loadedData.length; x++) {
            if (props.data[i].sku == loadedData[x].item && loadedData[x].discountType == "multibuy") {
                const discountsFound = []

                discountsFound.push(loadedData[x])
                
                for (let y = 0; y < loadedData.length; y++) {
                    if (loadedData[y].item == props.data[i].sku && y !== x) {
                        discountsFound.push(loadedData[y])
                    }
                }


                if (discountsFound.length > 1) {
                   
                    let swapCount = 0
                    function binaryArranger() {
                        for (let y = 0; y < discountsFound.length; y++) {
                            console.log(discountsFound[y].itemQuantityCount)
                            if (y != discountsFound.length - 1 && parseInt(discountsFound[y].itemQuantityCount) < parseInt(discountsFound[y + 1].itemQuantityCount)) {
                                let tempStore = discountsFound[y]
                                discountsFound[y] = discountsFound[y + 1]
                                discountsFound[y + 1] = tempStore
                                swapCount += 1
                            }
                            // console.log(discountsFound)
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
                        
                        discountedPrice += ((discountedQuantitySet * parseInt(discountsFound[y].itemMultiData.price) - (discountsFound[y].itemMultiPrice * discountedQuantitySet / discountsFound[y].itemQuantityCount)) / (y + 1) / discountsFound.length)
                          
                    } else {
                        continue
                    }
                    if (!remainder) {
                        break
                    }
                
                }
            }
            if (props.data[i].sku == loadedData[x].item && loadedData[x].discountType == "multiitem") {
                console.log(loadedData[x])
                let subjectAppears = 0
                let dependentAppears = 0
                

                BasketCtx.inBasket.map(item => {
                    if (item.sku == loadedData[x].itemDependentOnData.sku) {
                        dependentAppears+=1
                    }
                    if (item.sku == loadedData[x].subjectItemData.sku) {
                        subjectAppears+=1
                    }
                })

                let applicableTotal = Math.min(subjectAppears, dependentAppears)
                console.log(applicableTotal)

                discountedPrice+=(loadedData[x].subjectItemData.price - loadedData[x].itemDependentOnPrice) * applicableTotal
            }
        }
    }

   props.setDiscount(discountedPrice)
    
    return <div className="totalContainer">
                <div className="totalHead total">Discounts</div>
        <div className="totalPrice total">{discountedPrice / 100}</div>
    </div>
    }

    
            
export default DiscountsEl