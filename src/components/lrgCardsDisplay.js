import React from "react";
import { useEffect, useState } from "react";
import LrgCardHandler from "../handlers/LrgCardHandler";
import classes from "../handlers/LrgCardHandler.module.css"

function LrgCardsDisplay() {

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
                    console.log(dataForArray)
                    dataArr.push(dataForArray)
                }
                

                const colours = ["#E3655B", "#FAA613", "#8DB580", "#7180AC", "#F7EDF0"]

                for (let i = 0; i < dataArr.length; i++) {
                    dataArr[i].backColour = colours[i%colours.length]
                }
              

                console.log(dataArr)

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
        <div className="displayHeader">Offers</div>
        <LrgCardHandler data={loadedData} />
    </section>

}

export default LrgCardsDisplay