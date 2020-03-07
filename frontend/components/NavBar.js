import React from 'react';
import Link from "next/link";
import NavStyles from "./styles/NavStyles";

function NavBar() {
    return (
        <NavStyles>
            <Link href="/items">
                <a>Liste</a>
            </Link>
            <Link href="/sell">
                <a>Ma wish liste</a>
            </Link>
            <Link href="/signup">
                <a>Signup</a>
            </Link>
        </NavStyles>
    )
}

export default NavBar;
