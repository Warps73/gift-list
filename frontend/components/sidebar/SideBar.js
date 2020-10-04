import React from "react";
import {slide as Menu} from "react-burger-menu";
import NavStyles from "../styles/NavStyles";
import Link from "next/link";
import Signout from "../Signout";
import User from "../User";


function SideBar() {
    return (
        // Pass on our props
        <Menu>
            <User>
                {({data}) => {
                    if (data) {
                        const {currentUser} = data;
                        if (currentUser) {
                            return (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link href="/items">
                                            <a>La liste</a>
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/sell">
                                            <a>Une envie ?</a>
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Link href="/userItems">
                                            <a>Ma liste</a>
                                        </Link>
                                    </li>
                                    <li className="list-group-item">
                                        <Signout/>
                                    </li>
                                </ul>
                            )
                        } else {
                            return (
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <Link href="/signup">
                                            <a>Signup</a>
                                        </Link>
                                    </li>
                                </ul>
                            )
                        }
                    }
                    return null
                }}
            </User>
        </Menu>
    );
}

export default SideBar;
