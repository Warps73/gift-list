import React, {Fragment} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from "graphql-tag";
import {ALL_ITEMS_QUERY} from "./Items";
import {notifyError, notifySuccess} from "./nofify";
import {CURRENT_USER_QUERY} from "./User";
import {hasPermission} from "../../backend/src/utils";

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
    const {userItem} = {userItem: props.item.user};
    return (
        <Fragment>
            <Query query={CURRENT_USER_QUERY}>
                {({data, loading}) => {
                    return (
                        <Mutation
                            variables={{id: props.id}}
                            mutation={DELETE_ITEM_MUTATION}
                            update={update}
                        >
                            {(deleteItem, {error, loading}) => (
                                <button
                                    disabled={props.item.user.id !== data.userId && hasPermission(userItem, ['ADMIN'])}
                                    onClick={() => {
                                        if (confirm('Êtes vous sur?')) {
                                            deleteItem()
                                                .then(function (data) {
                                                    notifySuccess('Successfully deleted')
                                                })
                                                .catch(err => {
                                                    notifyError(err.message)
                                                })
                                        }
                                    }}>{children}
                                </button>
                            )}
                        </Mutation>
                    );
                }}


            </Query>
        </Fragment>
    );
}

export default DeleteItem;
