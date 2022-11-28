import {Outlet} from "react-router-dom";
import {Footer, Header} from "../index";

export const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
};