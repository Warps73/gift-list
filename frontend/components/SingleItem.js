import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${props => props.theme.bs};
  min-height: 800px;
  img {
    width: 500px;
    height: auto;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            reference
            largeImage
        }
    }
`;

function SingleItem(props) {
    return (
        <Query
            query={SINGLE_ITEM_QUERY}
            variables={{
                id: props.id,
            }}
        >
            {({error, loading, data}) => {
                if (error) return <Error error={error}/>;
                if (loading) return <p>Loading...</p>;
                if (!data.item) return <p>No Item Found for {props.id}</p>;
                const item = data.item;
                return (
                    <SingleItemStyles>
                        <Head>
                            <title>Sick Fits | {item.title}</title>
                        </Head>
                        <div>
                            <img src={item.largeImage} alt={item.title}/>
                            <div className="details">
                                <h2>Viewing {item.title}</h2>
                                <p>Reférence du produit : {item.reference}</p>
                            </div>
                        </div>
                    </SingleItemStyles>
                );
            }}
        </Query>
    );
}

export default SingleItem;
