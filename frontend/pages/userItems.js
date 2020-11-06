import React from 'react';
import PleaseSignIn from "../components/PleaseSignIn";
import Items from "../components/Items";

const userItems = (props) => {
    return (
        <PleaseSignIn>
            <Items page={parseFloat(props.query.page) || 1} user={true}/>
        </PleaseSignIn>
    );
}

export default userItems;
