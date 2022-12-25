import React, { createContext, useState } from "react";

const BasketContext = createContext({
    inBasket: [],
    inBasketTotal: 0,
    addToBasket: (item) => {},
    removeFromBasket: (item) => {}
})

export function BasketContextProvider(props) {
    const [inBasketNow, editBasket] = useState([])

    function addToBasketHandler(item) {
        editBasket((prevBasket) => {
            return prevBasket.concat(item)
        })
    }

    function removeFromBasketHandler(itemId) {
        editBasket((prevBasket) => {
            return prevBasket.filter(item => item.id !== itemId)
        })
    }

    const context = {
        inBasket: inBasketNow,
        inBasketTotal: inBasketNow.length,
        addToBasket: addToBasketHandler,
        removeFromBasket: removeFromBasketHandler
    }

    return <BasketContext.Provider value={context}>
        {props.children}
    </BasketContext.Provider>

}

export default BasketContext