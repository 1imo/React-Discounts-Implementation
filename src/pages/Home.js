import React from "react";
import CardLrg from "../components/cards/cardLrg";
import CardSml from "../components/cards/cardSml";
import Layout from "../components/layout/layout";
import LrgCardsDisplay from "../components/lrgCardsDisplay";
import SmlCardsDisplay from "../components/smlCardsDisplay";




function Home() {
    return <div>
        <Layout />
        <LrgCardsDisplay />
        <SmlCardsDisplay />
    </div>
}

export default Home