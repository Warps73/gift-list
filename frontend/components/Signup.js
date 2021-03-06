import React, {useState} from 'react';
import {Mutation} from 'react-apollo'
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import {CURRENT_USER_QUERY} from "./User";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
        $secretKey: String!
    ){
        signup(
            email: $email
            name: $name
            password: $password
            secretKey: $secretKey
        ){
            id
            email
            name
        }
    }
`;


function Signup() {
    const [state, setState] = useState({
        password: '',
        name: '',
        email: '',
        secretKey: '',
    });
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };


    return (
        <Mutation
            mutation={SIGNUP_MUTATION}
            variables={state}
            refetchQueries={[{query: CURRENT_USER_QUERY}]}
        >
            {(signup, {error, loading}) => {

                return (
                    <Form method="post" onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await signup();
                        setState({
                            password: '',
                            name: '',
                            email: '',
                            secretKey: '',
                        })
                    }}>
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Créer mon compte</h2>
                            <label htmlFor="email">
                                Email
                                <input type="text" name="email" placeholder="email" value={state.email}
                                       onChange={handleChange}/>
                            </label>
                            <label htmlFor="name">
                                Nom
                                <input type="text" name="name" placeholder="name" value={state.name}
                                       onChange={handleChange}/>
                            </label>
                            <label htmlFor="password">
                                Password
                                <input type="password" name="password" placeholder="password" value={state.password}
                                       onChange={handleChange}/>
                            </label>
                            <label htmlFor="secretKey">
                                Clé secrete
                                <input type="password" name="secretKey" value={state.secretKey} placeholder="secretKey"
                                       onChange={handleChange}/>
                            </label>
                            <button type="submit">Signup</button>
                        </fieldset>
                    </Form>
                )
            }}
        </Mutation>
    );
}

export default Signup;
