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
                console.log(dataArr)
        })
    }, [])

    if (!setIsLoading) {
        console.log("")
    }

    return <div className="totalContainer">
                <div className="totalHead total">Discounts</div>
                <div className="totalPrice total">tt</div>
            </div>
}

export default DiscountsEl