import React from "react";
import { useContext } from "react";
import Layout from "../components/layout/layout";
import BasketCardHandler from "../handlers/BasketCardHandler";
import SmlCardHandler from "../handlers/SmlCardHandler";
import BasketContext from "../store/basket-context";

function Basket(props) {

    const BasketCtx = useContext(BasketContext);

    let content;

    if (BasketCtx.inBasket.length == 0) {
        content = <p>You have nothing saved</p>
        console.log(BasketCtx.inBasket.length + " LENGTH")
    } else {
        content = <BasketCardHandler data={BasketCtx.inBasket} />
    }

    return (<div>
        <Layout />
        <section>
    <div className="displayHeader">Basket</div>
    {content}
</section>
    </div>)
    
}

export default Basket