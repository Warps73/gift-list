import React from 'react';
import {Mutation} from 'react-apollo'
import gql from "graphql-tag";
import {CURRENT_USER_QUERY} from "./User";
import {USER_ITEMS_QUERY} from "./UserItems";

const SIGN_OUT_MUTATION = gql`
    mutation SIGNIN_MUTATION{
        signout{
            message
        }
    }
`;

function Signout() {
    return (
        <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
            {(signout) => <a onClick={signout}> Se déconnecter </a>}
        </Mutation>
    );
}

export default Signout;
