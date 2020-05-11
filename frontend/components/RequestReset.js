import React, {useState} from 'react';
import {Mutation} from 'react-apollo'
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import {CURRENT_USER_QUERY} from "./User";

const RESET_REQUEST_MUTATION = gql`
    mutation RESET_REQUEST_MUTATION(
        $email: String!
    ){
        requestReset(
            email: $email
        ){
            message
        }
    }
`;


function RequestReset() {
    const [state, setState] = useState({
        email: '',
    });
    const [success, setSuccess] = useState('');
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };


    return (
        <Mutation
            mutation={RESET_REQUEST_MUTATION}
            variables={state}>
            {(reset, {error, loading, called}) => {

                return (
                    <Form method="post" onSubmit={async (e) => {
                        e.preventDefault();
                        const success = await reset();
                        setSuccess(success);
                        setState({
                            email: '',
                        })
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Password reset</h2>
                            <Error error={error}/>
                            {!error && !loading && called && <p>Success! Un email vous a été envoyé </p>}
                            <label htmlFor="email">
                                Email
                                <input type="text" name="email" placeholder="email" value={state.email}
                                       onChange={handleChange}/>
                            </label>
                            <button type="submit">Send</button>
                        </fieldset>
                    </Form>
                )
            }}
        </Mutation>
    );
}

export default RequestReset;
