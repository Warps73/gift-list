import React from 'react';
import UserItems from "../components/UserItems";
import PleaseSignIn from "../components/PleaseSignIn";

const userItems = () => {
    return (
        <PleaseSignIn>
            <UserItems/>
        </PleaseSignIn>
    );
}

export default userItems;
