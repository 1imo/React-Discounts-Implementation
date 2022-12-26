import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import Layout from "../components/layout/layout";
import classes from "./adminEdits.module.css"


function Admin() {
    const navigate = useNavigate()
    const sku = useRef()
    const price = useRef()
    

    function addItemHandler(newItem) {
        fetch("https://linneysinterview-default-rtdb.firebaseio.com/items.json",
            {
                method: "POST",
                body: JSON.stringify(newItem),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                navigate("/")
        })
    }

    function submitHandler(e) {
        e.preventDefault();

        const itemData = {
            sku: sku.current.value,
            price: price.current.value
        }

        console.log(itemData)
        
        addItemHandler(itemData)
    }



    return <div>
            <Layout />
        <div className="displayHeader">Add Item</div>
        <form onSubmit={submitHandler}>
            <div className="allDropdowns">
                <div className="dropdownContainer">
                    <label>Item Name</label>
                    <input type="text" ref={sku} id="sku" required/>
                </div>
                <div className="dropdownContainer">
                    <label>Item Price</label>
                    <input type="number" ref={price} id="price" required />
                </div>
            </div>
            <button>Submit</button>
        </form>
        </div>
}

export default Admin