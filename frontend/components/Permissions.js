import React, {Fragment, useState} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import {useMutation} from "@apollo/react-hooks";


const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION($permissions: [Permission], $userId : ID!){
        updatePermissions(permissions : $permissions, userId : $userId){
            id
            permissions
            email
            name
        }
    }
`;

const All_USERS_QUERY = gql`
    query {
        users{
            id
            email
            name
            permissions
        }
    }
`;

const possiblePermissions = [
    'ADMIN',
    'USER',
    'PERMISSION_UPDATE'
];

const UserPermissions = (props) => {

    const [
        updatePermissions,
        {
            loading: mutationLoading,
            error: mutationError
        }] = useMutation(UPDATE_PERMISSIONS_MUTATION);
    const [state, setState] = useState({
        permissions: props.user.permissions,
        userId: props.user.id
    });
    const user = props.user;

    const handlePermissionChange = async (e) => {
        const checkbox = e.target;
        let newPermissions = state.permissions;
        if (checkbox.checked) {
            newPermissions.push(checkbox.value)
        } else {
            newPermissions = newPermissions.filter((permission) => {
                return permission !== checkbox.value;
            })

        }
        setState(prevState => ({
            userId: prevState.userId,
            permissions: newPermissions

        }));

        const res = await updatePermissions(
            {
                variables: {
                    permissions: newPermissions,
                    userId: state.userId
                }
            }
        );


    };

    return (
        <Fragment>
            {mutationError ? <tr>
                <td colSpan='5'><Error error={mutationError}/></td>
            </tr> : null}
            <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                {possiblePermissions.map(function (permission, k) {
                    return (
                        <td key={k}>
                            <div className='d-flex align-items-baseline justify-content-between'>
                                <label className='d-block p-2' htmlFor={`${user.id}-permission-${permission}`}>
                                    <input id={`${user.id}-permission-${permission}`}
                                           checked={state.permissions.includes(permission)} value={permission}
                                           type='checkbox' onChange={handlePermissionChange}/>
                                </label>
                            </div>
                        </td>
                    )
                })}

            </tr>
        </Fragment>
    )
};

UserPermissions.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        id: PropTypes.string,
        permissions: PropTypes.array,
    }).isRequired
};


const Permissions = (props) => {
    return (
        <Query query={All_USERS_QUERY}>
            {({data, loading, error}) => {
                if (loading || !data || !data.users) {
                    return (
                        <div className='d-flex justify-content-center'>
                            <Loader
                                type="Circles"
                                color="#ba00ff"
                                height={500}
                                width={100}
                            />
                        </div>
                    );
                }
                return (
                    <div>
                        <Error error={error}/>
                        <div className="container">
                            <p className="h2">Manage Permission</p>
                        </div>
                        <table className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {possiblePermissions.map(function (permission, key) {
                                    return (<th key={key}>{permission}</th>)
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {data.users.map(function (user, key) {
                                return (
                                    <UserPermissions key={key} user={user}/>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                )
            }}
        </Query>
    );
};


export default Permissions;
