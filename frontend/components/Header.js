import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./sidebar/SideBar";
import Collapse from "@material-ui/core/Collapse";
import DesktopNav from "./navbar/DesktopNav";
import {Hidden} from "@material-ui/core";
import Link from "next/link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Acme',
    },
    link: {
        color: 'inherit'
    },
    nav: {
        justifyContent: 'space-between',
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <AppBar className={classes.container} position="sticky">
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
