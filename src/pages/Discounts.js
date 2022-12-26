import React from "react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/layout";

function Discounts() {
    const [isLoading, setIsLoading] = useState(true)
    const [loadedData, setLoadedData] = useState([])

    const navigate = useNavigate()



    

    function addItemHandler(newItem) {
        fetch("https://linneysinterview-default-rtdb.firebaseio.com/discounts.json",
            {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: {
                    "Content-Type": "application/json"
                }
            })
    }

    

    function submitHandler(e) {
        e.preventDefault();

        const itemNum = document.querySelector(".dropdownItem").value
        const discountType = document.querySelector(".discountType").value

        const itemDependentOn = document.querySelector(".dropdownItemWith") ? document.querySelector(".dropdownItemWith").value : 0
        const itemDependentNewPrice = document.querySelector(".priceInputDependentOn") ? document.querySelector(".priceInputDependentOn").value : 0

        const itemMulti = document.querySelector(".quantityInput") ? document.querySelector(".quantityInput").value : 0
        const itemMultiPrice = document.querySelector(".priceInputMulti") ? document.querySelector(".priceInputMulti").value : 0

        let array = [["item", itemNum], ["discountType", discountType], ["itemDependentOn", itemDependentOn],
            ["itemDependentOnPrice", itemDependentNewPrice], ["itemQuantityCount", itemMulti], ["itemMultiPrice", itemMultiPrice]]
        

        if (itemDependentOn) {
            loadedData.map((item, index) => {
                if(item.sku == array[2][1]) {
                    array.push(["itemDependentOnData", item])
                }
                if (item.sku == array[0][1]) {
                    array.push(["subjectItemData", item])
                }
            })
        }

        if (itemMulti) {
            loadedData.map((item, index) => {
                if(item.sku == array[0][1]) {
                    array.push(["itemMultiData", item])
                }
            })
        }





        
        let obj = {}
        
        for (let i = 0; i < array.length; i++) {
            if (array[i][1]) {
                obj[array[i][0]] = array[i][1]
            }
        }

        console.log(obj)
        addItemHandler(obj)
    }

  

    function discountTypeChange() {
        const discountType = document.querySelector(".discountType").value
        
        if (discountType == "multiitem") {
            const dropdown = document.createElement("select")
            dropdown.classList.add("dropdown")
            dropdown.classList.add("dropdownItemWith")
        
            loadedData.map((item, index) => {
                const option = document.createElement("option")
                option.value = item.sku
                option.key = index += 1
                const innerText = document.createTextNode(item.sku)
                option.appendChild(innerText)
                dropdown.appendChild(option)
            })

            const dropdownContainer = document.createElement("div")
            dropdownContainer.classList.add("dropdownContainer")
            const label = document.createElement("label")
            const textNodeLabel = document.createTextNode("Discount if bought with")
            label.appendChild(textNodeLabel)
            dropdownContainer.appendChild(label)
            dropdownContainer.appendChild(dropdown)
            document.querySelector(".allDropdowns").appendChild(dropdownContainer)

            const newPrice = document.createElement("div")
            newPrice.classList.add("dropdownContainer")
            const labelPrice = document.createElement("label")
            const textNodePriceLabel = document.createTextNode("New Price")
            labelPrice.appendChild(textNodePriceLabel)
            const priceInput = document.createElement("input")
            priceInput.classList.add("priceInput")
            priceInput.classList.add("priceInputDependentOn")
            priceInput.classList.add("adminInput")
            priceInput.type = "number"
            priceInput.setAttribute('required', '')
            newPrice.appendChild(labelPrice)
            newPrice.appendChild(priceInput)

            document.querySelector(".allDropdowns").appendChild(newPrice)

        }

        if (discountType == "multibuy") {
            const dropdownContainer = document.createElement("div")
            dropdownContainer.classList.add("dropdownContainer")

            const label = document.createElement("label")
            const textNodeLabel = document.createTextNode("Quantity of Item")
            label.appendChild(textNodeLabel)
            dropdownContainer.appendChild(label)

            const quantityInput = document.createElement("input")
            quantityInput.classList.add("quantityInput")
            quantityInput.classList.add("adminInput")
            quantityInput.type = "number"
            quantityInput.setAttribute('required', '')
            dropdownContainer.appendChild(quantityInput)
            

            const dropdownContainerTwo = document.createElement("div")
            dropdownContainerTwo.classList.add("dropdownContainer")

            const labelTwo = document.createElement("label")
            const textNodeLabelTwo = document.createTextNode("Total Price")
            labelTwo.appendChild(textNodeLabelTwo)
            dropdownContainerTwo.appendChild(labelTwo)




            const priceInput = document.createElement("input")
            priceInput.classList.add("priceInput")
            priceInput.classList.add("priceInputMulti")
            priceInput.classList.add("adminInput")
            priceInput.type = "number"
            priceInput.setAttribute('required', '')

            dropdownContainerTwo.appendChild(priceInput)
            

            
            document.querySelector(".allDropdowns").appendChild(dropdownContainer)
            document.querySelector(".allDropdowns").appendChild(dropdownContainerTwo)
        }


    }

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

                setIsLoading(false)
                setLoadedData(dataArr)
                console.log(dataArr)
        })
    }, [])

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        )
    }


    return <div>
        <Layout />
        <form className="adminEdits discountEdit" onSubmit={submitHandler}>
            <div className="displayHeader">Add Discount</div>

            <div className="allDropdowns">
                <div className="dropdownContainer">
                <label>Item Name</label>
                    <select className="dropdown dropdownItem">
                    <option value="select" key="0">Select</option>
                    {loadedData.map((item, index) => {
                        return <option value={item.sku} key={index}>{item.sku}</option>
                    })}
                </select>
                </div>
            
                <div className="dropdownContainer">
                <label>Discount Type</label>
                    <select onChange={discountTypeChange} className="dropdown discountType">
                        <option value="select" key="0">Select</option>
                        <option value="multibuy" key="1">Multi-Buy</option>
                        <option value="multiitem" key="2">Multi-Item</option>
                    </select>
                </div>

                
            </div>
        <button>Submit</button>
    </form>
    </div>
    
}

export default Discounts