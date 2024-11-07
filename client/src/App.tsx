import ThemeProvider from './theme';
import { BrowserRouter } from "react-router-dom";
import { logo } from './mock/constants.ts';
import { TbShoppingBag } from 'react-icons/tb';
import { GrFavorite } from 'react-icons/gr';
import { IoPersonOutline } from 'react-icons/io5';
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuGitCompare } from "react-icons/lu";
import { BiStoreAlt } from 'react-icons/bi';
import { FiHome } from "react-icons/fi";
import { useState } from 'react';
import Navbar from './components/extra/navbars/Navbar.tsx';

export default function App() {
    const [isOpen, setOpen] = useState(false);

    const NavItems = {
        itemsCenter: [
            { icon: <FiHome />, link: "#", name: 'home' },
            { icon: <BiStoreAlt />, link: "#", name: 'Store' },
            { icon: <RiDiscountPercentLine />, link: "#", name: 'Offers' },
            { icon: <LuGitCompare />, link: "#", name: 'Compare' }
        ],
        ItemsRight: [
            { icon: <IoPersonOutline fontSize={'25px'} />, name: "Login", link: "#" },
            { icon: <GrFavorite fontSize={'25px'} />, name: "Wishlist", link: "#" },
            { icon: <TbShoppingBag fontSize={'25px'} />, name: "Cart", link: "#" }
        ],
        logo: logo,
        isOpen,
        setOpen // Pass setOpen function directly without calling it
    };

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Navbar NavItems={NavItems} />
            </BrowserRouter>
        </ThemeProvider>
    );
}
