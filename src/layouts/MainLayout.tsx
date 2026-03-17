import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElement, scrollToTop } from "@/utils/scroll";

const delayScroll = 100;

const delayFunction = (fn: () => void) => {
    setTimeout(fn, delayScroll);
}

export default function MainLayout() {

    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            delayFunction(() => scrollToElement(hash));
        } else {
            delayFunction(() => scrollToTop());
        }
    }, [pathname, hash]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}