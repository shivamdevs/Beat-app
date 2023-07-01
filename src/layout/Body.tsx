import React from 'react';
import "./Body.scss";
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';
import AsidePanel from '../components/toolkit/AsidePanel';

function Body() {
    return (
        <section id="body">
            <main id="main">
                <SidePanel />
                <article id="article" className="">
                </article>
                <AsidePanel />
            </main>
            <Footer />
        </section>
    );
}

export default Body;
