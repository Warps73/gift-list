import React, {Fragment, useState} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import {Controller, useForm} from 'react-hook-form'
import {ALL_ITEMS_QUERY} from "./Items";
import {PAGINATION_QUERY} from "./Pagination";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SubmitButton from "./Material/SubmitButton";
import {makeStyles} from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $reference: String
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
        '&[disabled]': {
            opacity: 0.5,
        }
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '16%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
const helperTextStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        fontSize: '1.25rem'
    },
    error: {
        "&.MuiFormHelperText-root.Mui-error": {
            fontSize: '1.25rem'
        }
    }
}));

const CreateItem = () => {
    const classes = useStyles();
    const helperTestClasses = helperTextStyles();
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

    function handleChange(e) {
        const {name, type, value} = e.target;
        let val = name === 'price' ? parseFloat(value) : value;
        setState(prevState => ({
            // object that we want to update
            ...prevState,    // keep all other key-value pairs
            [name]: val       // update the value of specific key

        }))


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

    const {register, handleSubmit, errors} = useForm();


    return (
        <Mutation
            mutation={CREATE_ITEM_MUTATION}
            variables={state}
            refetchQueries={[{query: ALL_ITEMS_QUERY}]}
        >
            {(createItem, {error}) => (
                <Fragment>
                    <h2>I wish...</h2>
                    <form
                        onSubmit={handleSubmit(async ({title, price, ...data}) => {

                            setLoading(true);
                            const file = await uploadFile(files);
                            setState(prevState => ({
                                // object that we want to update
                                ...prevState,    // keep all other key-value pairs
                                image: file.secure_url,
                                largeImage: file.eager[0].secure_url       // update the value of specific key

                            }))
                            const res = await createItem();
                            if (error) {
                                setLoading(false);
                            }
                            // todo change them to the single item page
                            await Router.push({
                                pathname: '/',
                            });
                        })}
                        className={classes.root}
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
                                ref={register({required: true})}
                            />
                            <label htmlFor="file">
                                <Button style={{marginBottom: '1em'}} variant="outlined">
                                    Ajouter une image
                                </Button>
                            </label>
                            {errors.file &&
                            <FormHelperText style={{fontSize: '1.25rem'}} error>
                                Image requise
                            </FormHelperText>}
                            {imgPreview &&
                            <img style={{maxHeight: "200px", width: "auto"}} src={imgPreview} alt="img"/>}
                            <TextField
                                FormHelperTextProps={{classes: helperTestClasses}}
                                fullWidth
                                label="Nom"
                                id="title"
                                error={errors.title}
                                helperText={errors.title ? "Titre requis" : null}
                                name="title"
                                variant="outlined"
                                placeholder="Nom"
                                onChange={handleChange}
                                inputRef={register({required: true})}
                            />
                            <TextField
                                FormHelperTextProps={{classes: helperTestClasses}}
                                fullWidth
                                label="price"
                                type="number"
                                id="price"
                                name="price"
                                error={errors.price}
                                helperText={errors.price?.type ? errors.price.type === "required" ? 'Prix requis' : 'Prix non valide' : ''}
                                variant="outlined"
                                onChange={handleChange}
                                placeholder="Price"
                                inputRef={register({
                                    required: true,
                                    pattern: /[0-9]/
                                })}
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
                            <div className={classes.wrapper}>
                                <SubmitButton text='Enregistrer' color="success" variant="outlined"/>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </fieldset>
                    </form>
                </Fragment>
            )}
        </Mutation>
    );
};

export default CreateItem;
export {CREATE_ITEM_MUTATION};
