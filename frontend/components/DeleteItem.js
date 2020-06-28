import React from 'react';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import {ALL_ITEMS_QUERY} from "./Items";
import {notifySuccess} from "./nofify";

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

const update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({query: ALL_ITEMS_QUERY});
    // 2. Filter the deleted item out of the page
    // 3. Put the items back!
    cache.writeQuery({
        query: ALL_ITEMS_QUERY,
        data: {items: data.items.filter(item => item.id !== payload.data.deleteItem.id)},
    });
};

function DeleteItem({children, ...props}) {
    return (
        <Mutation
            variables={{id: props.id}}
            mutation={DELETE_ITEM_MUTATION}
            update={update}
        >
            {(deleteItem, {error, loading}) => (
                <button onClick={() => {
                    if (confirm('Êtes vous sur?')) {
                        deleteItem()
                            .then(function (data) {
                                notifySuccess('Successfully deleted')
                            })
                    }
                }}>{children}</button>
            )}
        </Mutation>
    );
}

export default DeleteItem;
