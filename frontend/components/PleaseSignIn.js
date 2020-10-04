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
                    return props.children
                }}
            </Query>
        </div>
    );
}

export default PleaseSignIn;

