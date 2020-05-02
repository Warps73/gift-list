import React from "react";
import Signup from "../components/Signup";
import styled from "styled-components";

const Columns = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SignupPage = props => (
    <Columns>
        <Signup/>
    </Columns>
);

export default SignupPage;
