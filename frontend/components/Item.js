import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import DeleteItem from "./DeleteItem";
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';


export default function Item(props) {
    const {item} = props;
    return (
        <ItemStyles>
            <Link
                href={{
                    pathname: '/item',
                    query: {id: item.id},
                }}
            >
                {item.image && <img src={item.image} alt={item.title}/>}
            </Link>
            <Title>
                <Link
                    href={{
                        pathname: '/item',
                        query: {id: item.id},
                    }}
                >
                    <a>{item.title}</a>
                </Link>
            </Title>
            <PriceTag>{formatMoney(item.price)}</PriceTag>
            <p>{item.reference}</p>

            <div className="buttonList">
                <Link
                    href={{
                        pathname: 'update',
                        query: {id: item.id},
                    }}
                >
                    <a>Edit</a>
                </Link>
                <button>Add To Cart</button>
                <DeleteItem item={item} id={item.id}>Supprimer</DeleteItem>
            </div>
        </ItemStyles>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};
