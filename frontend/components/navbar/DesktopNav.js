import React, {Fragment} from 'react';
import User, {CURRENT_USER_QUERY} from "../User";
import NavStyles from "../styles/NavStyles";
import Link from "next/link";
import Signout from "../Signout";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import gql from "graphql-tag";
import {AccountCircle} from "@material-ui/icons";
import {Mutation} from "react-apollo";
import {useMutation} from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
    link: {
        fontSize: '2rem',
        color: 'inherit',
        marginRight: theme.spacing(2),
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'between'
    }
}));

const SIGN_OUT_MUTATION = gql`
    mutation SIGNIN_MUTATION{
        signout{
            message
        }
    }
`;

const DesktopNav = () => {

    const classes = useStyles();


    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);


    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const menuId = 'primary-search-account-menu';


    const [signout] = useMutation(SIGN_OUT_MUTATION, {refetchQueries: [{query: CURRENT_USER_QUERY}]});

    const logout = () => {
        signout();
        handleMenuClose();
    }
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={logout}>Log out</MenuItem>
        </Menu>
    );

    return (
        <User>
            {({data}) => {
                if (data) {
                    const {currentUser} = data;
                    if (currentUser) {
                        return (
                            <div className={classes.linkContainer}>
                                <Typography variant='h6'>
                                    <Link href="/items">
                                        <a className={classes.link}>Liste</a>
                                    </Link>
                                    <Link href="/sell">
                                        <a className={classes.link}>Une Envie</a>
                                    </Link>
                                    <Link href="/userItems">
                                        <a className={classes.link}>Ma Liste</a>
                                    </Link>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    {renderMenu}
                                </Typography>
                            </div>
                        )
                    } else {
                        return (
                            <Fragment>
                                <Link href="/signup">
                                    <a>Signup</a>
                                </Link>
                            </Fragment>
                        )
                    }
                }
                return null
            }}
        </User>

    )
};

export default DesktopNav;
