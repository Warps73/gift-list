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
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}, $id : ID) {
        items(first: $first, skip: $skip, orderBy: createdAt_ASC, where: {user: {id: $id}}) {
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
    constructor(props) {
        super(props);
        this.state = {items: null};
    }

    render() {
        const variables = {skip: this.props.page * perPage - perPage};
        if (this.props.user) {
            variables.id = this.props.data.currentUser.id;
        }
        return (
            <Fragment>
                <Query
                    query={ALL_ITEMS_QUERY}
                    variables={variables}
                    fetchPolicy={"no-cache"}>
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
                        this.state.items = data.items

                        if (this.props.user) {
                            const currentUser = this.props.data.currentUser
                            this.state.items = data.items.filter(item => item.user.id === currentUser.id)
                        }
                        return (
                            <Grid container
                                  justify="flex-start"
                                  alignItems="center"
                                  spacing={2}>
                                {this.state.items.map(item =>
                                    <Item allowDelete={this.props.user} item={item} key={item.id}/>)}
                            </Grid>
                        );
                    }}
                </Query>
                {this.state.items && <Box display='flex' justifyContent="center">
                    <Pagination page={this.props.page}/>
                </Box>}

            </Fragment>
        );
    }
}

export default Items;
export {ALL_ITEMS_QUERY};
