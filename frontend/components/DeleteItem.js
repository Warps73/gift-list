import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Mutation, Query} from 'react-apollo';
import gql from "graphql-tag";
import {notifyError, notifySuccess} from "./nofify";
import {CURRENT_USER_QUERY} from "./User";
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {ALL_ITEMS_QUERY} from "./Items";

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

const update = (cache, payload) => {
    try {
        // manually update the cache on the client, so it matches the server
        // 1. Read the cache for the items we want
        const data = cache.readQuery({query: ALL_ITEMS_QUERY});
        // 2. Filter the deleted item out of the page
        // 3. Put the items back!
        cache.writeQuery({
            query: ALL_ITEMS_QUERY,
            data: {items: data.items.filter(item => item.id !== payload.data.deleteItem.id)},
        });
    } catch (e) {
    }
};

function DeleteItem({children, ...props}) {
    const {userItem} = {userItem: props.item.user};
    const MySwal = withReactContent(Swal);

    return (
        <Query query={CURRENT_USER_QUERY}>
            {({data, loading}) => {
                return (
                    <Mutation
                        variables={{id: props.item.id}}
                        mutation={DELETE_ITEM_MUTATION}
                        update={update}
                    >
                        {(deleteItem, {error, loading}) => (
                            <IconButton
                                onClick={() => {
                                    MySwal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!'
                                    }).then((result) => {
                                        if (result.value) {
                                            deleteItem()
                                                .then(function (data) {
                                                    notifySuccess('Successfully deleted')
                                                })
                                                .catch(err => {
                                                    notifyError(err.message)
                                                })
                                        }
                                    });
                                }}>
                                <DeleteIcon color={"error"}/>
                            </IconButton>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
}

export default DeleteItem;
