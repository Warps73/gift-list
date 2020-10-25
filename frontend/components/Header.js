import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SideBar from "./sidebar/SideBar";
import DesktopNav from "./navbar/DesktopNav";
import {Hidden} from "@material-ui/core";
import NProgress from 'nprogress';
import Router from 'next/router';
import Link from "next/link";

Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Acme',
    },
    link: {
        color: 'black'
    },
    nav: {
        justifyContent: 'space-between',
    },
    bg: {
        backgroundColor: 'white'
    }
}));

export default function Header() {
    const classes = useStyles();
    return (
        <AppBar className={classes.bg} position="sticky">
            <Toolbar className={classes.nav}>
                <Hidden smUp>
                    <SideBar/>
                </Hidden>
                <Typography variant="h3" className={classes.title}>
                    <Link href="/items">
                        <a className={classes.link}>Wish List</a>
                    </Link>
                </Typography>
                <Hidden xsDown>
                    <DesktopNav/>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}
