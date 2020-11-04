import {Query} from 'react-apollo';
import {CURRENT_USER_QUERY} from "./User";
import Signin from './Signin';
import React from "react";

const PleaseSignIn = (props) => {
    return (
        <div>
            <Query query={CURRENT_USER_QUERY}>
                {({data, loading}) => {
                    if (loading) {
                        return <p>Loading</p>
                    }
                    if (!data || !data.currentUser) {
                        return (
                            <div>
                                <p>Vous devez être connecté pour accéder à cette page</p>
                                <Signin/>
                            </div>
                        );
                    }
                    return React.Children.map(props.children, child => {
                        // checking isValidElement is the safe way and avoids a typescript error too
                        const props = {data};
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, props);
                        }
                        return child;
                    })
                }}
            </Query>
        </div>
    );
}

export default PleaseSignIn;

