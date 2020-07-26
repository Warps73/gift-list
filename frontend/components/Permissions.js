import React, {useState} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Loader from "react-loader-spinner";

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

const User = (props) => {
    const user = props.user;
    return (
        <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            {possiblePermissions.map(function (permission, k) {
                return (
                    <td key={k}>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input id={`${user.id}-permission-${permission}`}
                                   checked={user.permissions.includes(permission)} type='checkbox'/>
                        </label>
                    </td>
                )
            })}
        </tr>
    );
};

const handleClick = function (e) {
    return e.target.checked = !e.target.checked;
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
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {possiblePermissions.map(function (permission) {
                                    return (<th>{permission}</th>)
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            {data.users.map(function (user) {
                                return (
                                    <User user={user}/>
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
