import React, {Fragment} from 'react';
import gql from "graphql-tag";
import {perPage} from "../config";
import {Query} from "react-apollo";
import Loader from "react-loader-spinner";
import Item from "./Item";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";

const USER_ITEMS_QUERY = gql`
    query USER_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        userItems(first: $first, skip: $skip, orderBy: createdAt_ASC) {
            id
            title
            price
            reference
            image
            largeImage
            user{
                id
                permissions
                name
            }
        }
    }
`;

const UserItems = function (props) {
    return (
        <Fragment>
            <Query query={USER_ITEMS_QUERY}
                   variables={{
                       skip: props.page * perPage - perPage,
                   }}
            >
                {({data, error, loading}) => {
                    if (loading) return (
                        <Box display='flex' justifyContent="center">
                            <Loader
                                type="Circles"
                                color="#ba00ff"
                                height={500}
                                width={100}
                            />
                        </Box>
                    );
                    if (error) return <p>Error: {error.message}</p>;
                    return (
                        <Grid container
                              justify="flex-start"
                              alignItems="center"
                              spacing={2}>
                            {data.userItems.map(item => <Item item={item} key={item.id}/>)}
                        </Grid>
                    );
                }}
            </Query>
        </Fragment>
    );
}
export {USER_ITEMS_QUERY}
export default UserItems;
