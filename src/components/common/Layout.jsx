import React from "react";
import Footer from "./Footer";
import PageNavbar from "./PageNavbar";

function Layout({ children }) {
    return (
        <div className="layout-container">
            <div className="main">
                <PageNavbar />
                <div>{children}</div>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;