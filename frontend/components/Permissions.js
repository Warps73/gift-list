import React, {useState} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

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

    const handlePermissionChange = (e) => {
        const checkbox = e.target;
        let updatedPermission = state.permissions;
        if (checkbox.checked) {
            updatedPermission.push(checkbox.value)
        } else {
            updatedPermission = updatedPermission.filter((permission) => {
                return permission !== checkbox.value;
            })

        }

        setState({permissions: updatedPermission})
    };
    const [state, setState] = useState({permissions: props.user.permissions});
    const user = props.user;

    return (
        <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            {possiblePermissions.map(function (permission, k) {
                return (
                    <td key={k}>
                        <label className='d-block p-2' htmlFor={`${user.id}-permission-${permission}`}>
                            <input id={`${user.id}-permission-${permission}`}
                                   checked={state.permissions.includes(permission)} value={permission}
                                   type='checkbox' onChange={handlePermissionChange}/>
                        </label>
                    </td>
                )
            })}
        </tr>
    );
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
