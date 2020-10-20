import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ShareIcon from '@material-ui/icons/Share';
import LaunchIcon from '@material-ui/icons/Launch';


const useStyles = makeStyles((theme) => ({
    root: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Item(props) {
    const {item} = props;
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {item.user.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                        </Avatar>
                    }
                    title={item.title}
                    subheader={item.reference}
                />
                <CardMedia
                    className={classes.media}
                    image={item.image}
                    title={item.title}
                />
                <CardContent>
                    {formatMoney(item.price)}
                    <p>Demandé par {item.user.name}</p>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={() => window.open('https://google.com', '_blank')} aria-label="share">
                        <ShareIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};
