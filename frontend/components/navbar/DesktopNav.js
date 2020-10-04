import React from 'react';
import User from "../User";
import NavStyles from "../styles/NavStyles";
import Link from "next/link";
import Signout from "../Signout";

const DesktopNav = () => (
    <User>
        {({data}) => {
            if (data) {
                const {currentUser} = data;
                if (currentUser) {
                    return (
                        <NavStyles>
                            <Link href="/items">
                                <a>La liste</a>
                            </Link>
                            <Link href="/sell">
                                <a>Une envie ?</a>
                            </Link>
                            <Link href="/userItems">
                                <a>Ma liste</a>
                            </Link>
                            <Signout/>
                        </NavStyles>
                    )
                } else {
                    return (
                        <NavStyles>
                            <Link href="/signup">
                                <a>Signup</a>
                            </Link>
                        </NavStyles>
                    )
                }
            }
            return null
        }}
    </User>

);

export default DesktopNav;
