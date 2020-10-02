import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item';
import Pagination from "./Pagination";
import {perPage} from "../config";
import Loader from 'react-loader-spinner'

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
            }
        }
    }
`;

class Items extends Component {
    render() {
        return (
            <div className="text-center">
                <Query
                    query={ALL_ITEMS_QUERY}
                    variables={{
                        skip: this.props.page * perPage - perPage,
                    }}>
                    {({data, error, loading}) => {
                        if (loading) return (
                            <Loader
                                type="Circles"
                                color="#ba00ff"
                                height={500}
                                width={100}
                            />);
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <div className='row'>{data.items.map(item => <Item item={item} key={item.id}/>)}</div>
                        );
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </div>
        );
    }
}

export default Items;
export {ALL_ITEMS_QUERY};
