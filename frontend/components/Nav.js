import Link from 'next/link';
import React, {Fragment} from "react";
import Signout from "./Signout";
import User from "./User";
import NavStyles from './styles/NavStyles';

const Nav = () => (
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
                            <Link href="/reservations">
                                <a>Reservations</a>
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

export default Nav;
