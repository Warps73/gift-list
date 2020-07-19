import React, {useState} from 'react';
import {Mutation} from 'react-apollo'
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import {CURRENT_USER_QUERY} from "./User";

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
        $email: String!
        $password: String!
    ){
        signin(
            email: $email
            password: $password
        ){
            id
            email
            name
        }
    }
`;


function Signin() {
    const [state, setState] = useState({
        password: '',
        email: '',
    });
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };


    return (
        <Mutation
            refetchQueries={[{query: CURRENT_USER_QUERY}]}
            mutation={SIGNIN_MUTATION}
            variables={state}>
            {(signin, {error, loading}) => {

                return (
                    <Form method="post" onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await signin();
                        setState({
                            password: '',
                            email: '',
                        })
                    }}>
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Se connecter</h2>
                            <label htmlFor="email">
                                Email
                                <input type="text" name="email" placeholder="email" value={state.email}
                                       onChange={handleChange}/>
                            </label>
                            <label htmlFor="password">
                                Password
                                <input type="password" name="password" placeholder="password" value={state.password}
                                       onChange={handleChange}/>
                            </label>
                            <button type="submit">Sign In</button>
                        </fieldset>
                    </Form>
                )
            }}
        </Mutation>
    );
}

export default Signin;
