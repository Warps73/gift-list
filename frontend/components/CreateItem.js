import React, {Component, useState} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import {useForm} from 'react-hook-form'

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;
const CreateItem = () => {
    const [state, setState] = useState({});
    const [imgPreview, setImgPreview] = useState(undefined);
    const [files, setFiles] = useState(undefined);
    const [loading, setLoading] = useState(false);

    function handleChangeFile(e) {
        const files = e.target.files;
        if (files.length > 0) {
            setImgPreview(URL.createObjectURL(files[0]));
            setFiles(files);
        } else {
            setImgPreview(undefined);
            setFiles(undefined);
        }
    }

    async function uploadFile(files) {
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'gift-list');
        const res = await fetch(process.env.CLOUDINARY_ENDPOINT,
            {
                method: 'POST',
                body: data
            });
        return await res.json();

    }

    const {register, handleSubmit, watch, errors} = useForm();


    return (
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={state}>
            {(createItem, {error, loading}) => (
                <Form
                    onSubmit={handleSubmit(async ({title, description, price, ...data}) => {

                        // setLoading(true);
                        const file = await uploadFile(files);
                        setState({
                                title: title,
                                description: description,
                                price: parseInt(price),
                                image: file.secure_url,
                                largeImage: file.eager[0].secure_url,
                            }
                        );
                        const res = await createItem();

                        // todo change them to the single item page
                        Router.push({
                            pathname: '/item',
                            query: {id: res.data.createItem.id},
                        });
                    })}

                >
                    <Error error={error}/>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="file">
                            Image
                            <input
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={handleChangeFile}
                                ref={register({required: true})}
                            />
                            {errors.title && <span>This field is required</span>}
                        </label>
                        {imgPreview &&
                        <img style={{maxHeight: "200px", width: "auto"}} src={imgPreview} alt="img"/>}
                        <label htmlFor="title">
                            Title
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                ref={register({required: true})}
                            />
                            {errors.title && <span>This field is required</span>}
                        </label>

                        <label htmlFor="price">
                            Price
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price"
                                ref={register({required: true})}
                            />
                            {errors.price && <span>This field is required</span>}

                        </label>

                        <label htmlFor="description">
                            Description
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter A Description"
                                ref={register({required: true})}
                            />
                            {errors.description && <span>This field is required</span>}
                        </label>
                        <button type="submit">Submit</button>
                    </fieldset>
                </Form>
            )}
        </Mutation>
    );
};

export default CreateItem;
export {CREATE_ITEM_MUTATION};
