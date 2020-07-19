import React from "react";
import Items from "../components/Items";
import PleaseSignIn from "../components/PleaseSignIn";

const Home = props => (
    <div>
        <PleaseSignIn>
            <Items page={parseFloat(props.query.page) || 1}/>
        </PleaseSignIn>
    </div>
);

export default Home;
