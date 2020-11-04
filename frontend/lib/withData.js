import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import {endpoint} from '../config';
import {InMemoryCache} from "@apollo/client";

function createClient({headers, initialState}) {

    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers,
            });
        },
        cache: new InMemoryCache().restore(initialState || {})
    });
}

export default withApollo(createClient);
