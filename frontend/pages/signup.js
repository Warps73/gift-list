import React from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin.js";
import ResetRequest from "../components/RequestReset";
import styled from "styled-components";

const Columns = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SignupPage = props => (
    <Columns>
        <Signup/>
        <Signin/>
        <ResetRequest/>
    </Columns>
);

export default SignupPage;
