import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from "./User";
import React, {Fragment} from "react";

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
                            <Link href="/me">
                                <a>Account</a>
                            </Link>
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
