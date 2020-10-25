import React, {Fragment, useState} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import {useForm} from 'react-hook-form'
import {ALL_ITEMS_QUERY} from "./Items";
import {PAGINATION_QUERY} from "./Pagination";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SubmitButton from "./Material/SubmitButton";
import {makeStyles} from "@material-ui/core/styles";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $reference: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            reference: $reference
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

const useStyles = makeStyles((theme) => ({
    fieldset: {
        '& div, button input': {
            marginBottom: theme.spacing(0.5)
        },
    }
}));

const CreateItem = () => {
    const classes = useStyles();
    const [state, setState] = useState({});
    const [imgPreview, setImgPreview] = useState(undefined);
    const [files, setFiles] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

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

    function handleChange(e) {
        let val = e.target.value;
        setTitle(val);

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

    return (
        <Mutation
            mutation={CREATE_ITEM_MUTATION}
            variables={state}
            refetchQueries={[{query: ALL_ITEMS_QUERY}]}
        >
            {(createItem, {error}) => (
                <Fragment>
                    <h2>I wish... {title && `un(e) ${title}`}</h2>
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault();
                            console.log('submit')
                            setLoading(true);
                            const file = await uploadFile(files);
                            setState({
                                    title: 'toto',
                                    reference: 'tata',
                                    price: parseInt(2000),
                                    image: 'url',
                                    largeImage: 'url'
                                }
                            );
                            const res = await createItem();
                            if (error) {
                                setLoading(false);
                            }
                            // todo change them to the single item page
                            await Router.push({
                                pathname: '/item',
                                query: {id: res.data.createItem.id},
                            });
                        }}

                    >
                        <Error error={error}/>
                        <fieldset className={classes.fieldset} style={{border: 'none'}} disabled={loading}
                                  aria-busy={loading}>
                            <input
                                style={{display: 'none'}}
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={handleChangeFile}
                            />
                            <label htmlFor="file">
                                <Button variant="outlined" component="span">
                                    Ajouter une image
                                </Button>
                            </label>
                            {imgPreview &&
                            <img style={{maxHeight: "200px", width: "auto"}} src={imgPreview} alt="img"/>}
                            <TextField
                                required
                                fullWidth
                                label="Nom"
                                id="title"
                                name="title"
                                variant="outlined"
                                placeholder="Nom"
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                fullWidth
                                label="price"
                                type="number"
                                id="price"
                                name="price"
                                variant="outlined"
                                placeholder="Price"
                            />
                            <TextField
                                fullWidth
                                label="Référence"
                                id="reference"
                                name="reference"
                                placeholder="Reference"
                                variant="outlined"
                                onChange={handleChange}
                            />
                            <SubmitButton text='Enregistrer' color="success" variant="outlined"/>
                        </fieldset>
                    </form>
                </Fragment>
            )}
        </Mutation>
    );
};

export default CreateItem;
export {CREATE_ITEM_MUTATION};
