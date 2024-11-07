import { useState, useLayoutEffect } from "react";
import Desktop_nav_bar from "../../base/navbars/desktop_nav_bar";
import Mobile_nav_bar from "../../base/navbars/mobile_nav_bar";
import { NavItems } from "../../base/navbars/interfaces";

interface NavbarProps {
    NavItems: NavItems;
}

const Navbar = ({ NavItems }: NavbarProps) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 700);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 700);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isDesktop ? (
        <Desktop_nav_bar NavItems={NavItems} />
    ) : (
        <Mobile_nav_bar NavItems={NavItems} />
    );
};

export default Navbar;
