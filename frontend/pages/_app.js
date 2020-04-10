import React from 'react';
import App, {Container} from 'next/app';
import Page from "../components/Page";
import {ApolloProvider} from 'react-apollo';
import withData from "../lib/withData";

class MyApp extends App {
    render() {
        let {Component, apollo} = this.props;
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component/>
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default withData(MyApp)

