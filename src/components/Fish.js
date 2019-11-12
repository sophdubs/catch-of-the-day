import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    static propTypes = {
        addToOrder: PropTypes.func,
        index: PropTypes.string,
        details: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            status: PropTypes.string,
            desc: PropTypes.string,
            image: PropTypes.string
        })
    }
    
    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    
    render() {
        const {name, price, image, status, desc} = this.props.details;
        let isAvailable = status === 'available';
        return (
            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add To Order' : 'Sold Out'}</button>
            </li>
        )
    }
}
export default Fish;