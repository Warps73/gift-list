import React, {useState} from 'react';
import {Mutation} from 'react-apollo'
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import {CURRENT_USER_QUERY} from "./User";

const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $resetToken: String!
        $password: String!
        $confirmPassword: String!
    ){
        resetPassword(
            resetToken: $resetToken
            password: $password
            confirmPassword: $confirmPassword
        ){
            id
            email
            name
        }
    }
`;

function Reset({resetToken}) {


    const [state, setState] = useState({
        password: '',
        confirmPassword: ''

    });
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };


    return (
        <Mutation
            mutation={RESET_MUTATION}
            variables={{
                resetToken: resetToken,
                password: state.password,
                confirmPassword: state.confirmPassword
            }}
            refetchQueries={[{query: CURRENT_USER_QUERY}]}>
            {(resetPassword, {error, loading, called}) => {

                return (
                    <Form method="post" onSubmit={async (e) => {
                        e.preventDefault();
                        const user = await resetPassword();
                        setState({
                            password: '',
                            confirmPassword: '',
                        })
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Reset your password</h2>
                            <Error error={error}/>
                            {!error && !loading && called && <p>Mot de passe modifié!</p>}
                            <label htmlFor="password">
                                Password
                                <input type="password" name="password" placeholder="password" value={state.password}
                                       onChange={handleChange}/>
                            </label>
                            <label htmlFor="confirmPassword">
                                Confirm your password
                                <input type="password" name="confirmPassword" placeholder="confirm your password"
                                       value={state.confirmPassword}
                                       onChange={handleChange}/>
                            </label>
                            <button type="submit">Modifier mon mot de passe</button>
                        </fieldset>
                    </Form>
                )
            }}
        </Mutation>
    );
}

Reset.propTypes = {
    resetToken: PropTypes.string.isRequired,
};

export default Reset;
