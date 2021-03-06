import React from 'react';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
    red: '#ba00ff',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '100vw',
    width: '100vw',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    src: url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    margin: auto;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Source Sans Pro', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

function Page(props) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <StyledPage>
                <Meta/>
                <Header/>
                <Inner>{props.children}</Inner>
            </StyledPage>
        </ThemeProvider>
    );
}

export default Page;
