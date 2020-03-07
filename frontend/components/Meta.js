import React from 'react';
import Head from 'next/head'

function Meta() {
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <link rel="shortcut icon" href="../static/favicon.png"/>
                <link rel="stylesheet" type="text/css" href="../static/nprogress.css"/>
                <title>Wish List</title>
            </Head>
        </div>
    );
}

export default Meta;
