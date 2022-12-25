import React from "react";
import { useEffect, useState } from "react";
import SmlCardHandler from "../handlers/SmlCardHandler";

function SmlCardsDisplay() {
    const [isLoading, setIsLoading] = useState(true)
    const [loadedData, setLoadedData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetch("https://linneysinterview-default-rtdb.firebaseio.com/items.json"
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

                const colours = ["#E3655B", "#FAA613", "#8DB580", "#7180AC", "#F7EDF0"]

                    for (let i = 0; i < dataArr.length; i++) {
                        dataArr[i].backColour = colours[i % colours.length]
                    }

                

                setIsLoading(false)
                setLoadedData(dataArr)
        })
    }, [])

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }


    return <section>
        <div className="displayHeader">Items</div>
        <SmlCardHandler data={loadedData} />
    </section>
}

export default SmlCardsDisplay