import React from "react";
import Signin from "../components/Signin.js";
import styled from "styled-components";

const Columns = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SigninPage = props => (
    <Columns>
        <Signin/>
    </Columns>
);

export default SigninPage;
