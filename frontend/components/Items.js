import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
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
        }
    }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  @media screen and (max-width: 768px) {
  justify-content: center;
}
`;

class Items extends Component {
    render() {
        return (
            <Center>
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
                                timeout={3000} //3 secs

                            />);
                        if (error) return <p>Error: {error.message}</p>;
                        return (
                            <ItemsList>{data.items.map(item => <Item item={item} key={item.id}/>)}</ItemsList>
                        );
                    }}
                </Query>
                <Pagination page={this.props.page}/>
            </Center>
        );
    }
}

export default Items;
export {ALL_ITEMS_QUERY};
