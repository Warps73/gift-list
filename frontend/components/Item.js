import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';


export default function Item(props) {
    const {item} = props;
    return (
        <div className="my-3 col-sm-2 col-3" style={{maxWidth: 'max-content'}}>
            <ItemStyles>
                <span className="text-muted small">{item.reference}</span>
                <Link
                    href={{
                        pathname: '/item',
                        query: {id: item.id},
                    }}
                >
                    <div>
                        {item.image && <img className="img-fluid img-thumbnail" src={item.image} alt={item.title}/>}
                    </div>
                </Link>
                <h4>
                    <Link
                        href={{
                            pathname: '/item',
                            query: {id: item.id},
                        }}
                    >
                        <a>{item.title}</a>
                    </Link>
                </h4>
                <p>{formatMoney(item.price)}</p>
                <span className="text-muted">{item.user.name}</span>
            </ItemStyles>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};
