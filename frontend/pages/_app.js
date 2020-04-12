import React from 'react';
import App from 'next/app';
import Page from "../components/Page";
import {ApolloProvider} from 'react-apollo';
import withData from "../lib/withData";

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // this exposes the query to the user
        pageProps.query = ctx.query;

        return {pageProps};
    };

    render() {
        const {Component, apollo, pageProps} = this.props;
        return (
            <ApolloProvider client={apollo}>
                <Page>
                    <Component {...pageProps}/>
                </Page>
            </ApolloProvider>
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

