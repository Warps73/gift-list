import React from "react";
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";
import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "./styles/PaginationStyles";
import {perPage} from "../config";
import {Query} from "react-apollo";

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate{
                count
            }
        }
    }
`;
const Pagination = props => {
    const {loading, error, data} = useQuery(
        PAGINATION_QUERY,
        {
            fetchPolicy: "cache-and-network"
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error}`;

    const count = data.itemsConnection.aggregate.count;
    if (!count) {
        return <p>No Items yet</p>;
    }
    const pages = Math.ceil(count / perPage);
    return (
        <PaginationStyles>
            <Head>
                <title>Wish List ~ Page {props.page} of {pages}</title>
            </Head>
            <Link href={{
                pathname: '/items',
                query: {page: props.page - 1}
            }}>
                <a className="prev" aria-disabled={props.page <= 1}>Prev</a>
            </Link>
            <p>{props.page} / {pages}</p>
            <Link href={{
                pathname: '/items',
                query: {page: props.page + 1}
            }}>
                <a className="prev" aria-disabled={props.page >= pages}>Next</a>
            </Link>
        </PaginationStyles>
    );
};

export default Pagination;
