import React from 'react';
import "./Body.scss";
import SidePanel from '../components/SidePanel';
import Footer from '../components/Footer';

function Body() {
    return (
        <section id="body">
            <main id="main">
                <SidePanel />
            </main>
            <Footer />
        </section>
    );
}

export default Body;
