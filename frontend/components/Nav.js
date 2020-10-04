import React from "react";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import {useMediaQuery} from 'react-responsive'

const Nav = () => {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    return (isDesktopOrLaptop ? <DesktopNav/> : <MobileNav/>);

}


export default Nav;
