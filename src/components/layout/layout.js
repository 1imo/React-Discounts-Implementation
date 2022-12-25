import React from "react";
import { Link }from "react-router-dom"
import classes from "./layout.module.css"

function Layout() {
    
    if (window.innerWidth > 700) {
        return <div className="navigation">
            <div className="logo"><Link to="/">SkeleStore</Link></div>
            <div className="searchBox">
                <img src="/search.svg" />
                <input type="text"/>
            </div>
            <div className="navActions">
                <Link to="/basket"><img src="/shopping-bag.svg" alt="Basket"/></Link>
                <Link to="/menu"><img src="/menu.svg" alt="Credits" /></Link>
            </div>
        </div>
    } else {
        return <div className="navigation navigation-mobile">
            <div className="navigation-mobile-top">
                <Link to="/"><span className="logo">SkeleStore</span></Link>
                <div className="navActions">
                    <Link to="/basket"><img src="/shopping-bag.svg" alt="Basket"/></Link>
                    <Link to="/menu"><img src="/menu.svg" alt="Credits" /></Link>
                </div>
            </div>
            <div className="navigation-mobile-bottom">
                <div className="searchBox">
                    <img src="/search.svg" />
                    <input type="text"/>
                </div>
            </div>
        </div>
    }


    
}

export default Layout