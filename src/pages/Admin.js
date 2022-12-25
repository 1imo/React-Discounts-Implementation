import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import Layout from "../components/layout/layout";

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
            <form onSubmit={submitHandler}>
            <input type="text" ref={sku} id="sku" required/>
            <input type="number" ref={price} id="price" required/>
            <button>Submit</button>
        </form>
        </div>
}

export default Admin