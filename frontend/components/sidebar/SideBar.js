import React, {Fragment} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    button: {
        fontSize: '3rem',
    },
    link: {
        fontSize: '2rem',
        color: 'black',
    }
});

export default function SideBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link href="/items" passHref>
                    <ListItem button component="a">
                        <ListItemText>
                            <span className={classes.link}>La liste</span>
                        </ListItemText>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
            <List>
                <Link href="/sell" passHref>
                    <ListItem button component="a">
                        <ListItemText>
                            <span className={classes.link}>Une envie</span>
                        </ListItemText>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
            <List>
                <Link href="/userItems" passHref>
                    <ListItem button component="a">
                        <ListItemText>
                            <span className={classes.link}>Ma Liste</span>
                        </ListItemText>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <Fragment key={'left'}>
            <IconButton size='medium' color='primary' onClick={toggleDrawer('left', true)}>
                <MenuIcon className={classes.button}/>
            </IconButton>
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </Fragment>
    );
}
