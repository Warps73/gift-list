import React, {Component, Fragment} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item';
import Pagination from "./Pagination";
import {perPage} from "../config";
import Loader from 'react-loader-spinner'
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";


const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(first: $first, skip: $skip, orderBy: createdAt_ASC) {
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

class Items extends Component {
    render() {
        return (
            <Fragment>
                <Query
                    query={ALL_ITEMS_QUERY}
                    variables={{
                        skip: this.props.page * perPage - perPage,
                    }}>
                    {({data, error, loading}) => {
                        if (loading) return (
                            <Box display='flex' justifyContent="center">
                                <Loader
                                    type="Circles"
                                    color="#ba00ff"
                                    height={500}
                                    width={100}
                                />
                            </Box>);
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <Grid container
                                  justify="flex-start"
                                  alignItems="center"
                                  spacing={2}>
                                {data.items.map(item =>
                                    <Item item={item} key={item.id}/>)}
                            </Grid>
                        );
                    }}
                </Query>
                <Box display='flex' justifyContent="center">
                    <Pagination page={this.props.page}/>
                </Box>
            </Fragment>
        );
    }
}

export default Items;
export {ALL_ITEMS_QUERY};
