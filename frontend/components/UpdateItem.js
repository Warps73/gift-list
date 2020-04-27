import React, {Fragment, useEffect, useState} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import {useForm} from 'react-hook-form'
import {useQuery} from "@apollo/react-hooks";

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        item(where: {id: $id}) {
            id
            title
            price
            reference
            image
            largeImage
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $reference: String, $price: Int) {
        updateItem(id: $id, title: $title, reference: $reference, price: $price) {
            id
            title
            reference
            price
        }
    }
`;
const UpdateItem = ({id}) => {
    const {register, handleSubmit, errors, setValue} = useForm();

    const updateItemMutation = ({price, ...data}, updateItem) => {
        updateItem({variables: {id: id, price: parseInt(price), ...data}})
    };

    const {loading, data, error} = useQuery(SINGLE_ITEM_QUERY, {variables: {id}});

    useEffect(() => {
        // you can do async server request and fill up form
        if (data) {
            setValue('title', data.item.title);
            setValue('price', data.item.price);
            setValue('reference', data.item.reference);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error {error}</p>
    }
    if (!data) {
        return <p>404 No data found!</p>
    }
    return (
        <Fragment>
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
                {(updateItem, {error, loading}) => {

                    return <Form
                        onSubmit={handleSubmit((data) => {
                            updateItemMutation(data, updateItem)
                        })}

                    >
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    ref={register({required: true})}
                                />
                                {errors.title && <span>OH! Et le nom du cadeau</span>}
                            </label>

                            <label htmlFor="price">
                                Price
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Price"
                                    ref={register({
                                        required: true,
                                        pattern: /[0-9]/
                                    })}
                                />
                                {errors.price?.type === "required" &&
                                <span>C'est gratuit?</span>}
                                {errors.price?.type === "pattern" &&
                                <span>C'est un prix ça?</span>}

                            </label>

                            <label htmlFor="reference">
                                Reference
                                <input
                                    type="text"
                                    id="reference"
                                    name="reference"
                                    placeholder="Reference du produit"
                                    ref={register({required: true})}
                                />
                                {errors.reference && <span>Si tu veux l'avoir, donne la référence...!</span>}
                            </label>
                            <button type="submit">Enregistr{loading ? 'e' : 'er'} les modifications</button>
                        </fieldset>
                    </Form>
                }}
            </Mutation>
        </Fragment>
    );
};

export default UpdateItem;
export {UPDATE_ITEM_MUTATION};
