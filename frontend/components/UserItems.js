import React from 'react';
import gql from "graphql-tag";
import {perPage} from "../config";
import {Query} from "react-apollo";
import Loader from "react-loader-spinner";
import Item from "./Item";

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
        <div className="text-center">
            <Query query={USER_ITEMS_QUERY}
                   variables={{
                       skip: props.page * perPage - perPage,
                   }}
                   fetchPolicy="network-only"
            >
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
                        <div className='row'>{data.userItems.map(item => <Item item={item} key={item.id}/>)}</div>
                    );
                }}
            </Query>
        </div>
    );
}
export default UserItems;
