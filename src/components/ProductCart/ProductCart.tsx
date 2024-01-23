import React from 'react';
import { Link } from 'react-router-dom';
import style from './ProductCart.module.css';
import { ProductCart } from './ProductCart.props.ts';
import card from '/public/group.svg';
import star from '/public/star.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';
import { cartAction } from '../../store/cart.slice.ts';

const ProductCart = ({ id, rating, description, title, image = 'public/pizza.png', price }: ProductCart) => {
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(cartAction.add(id))
    }

    return (
        <Link to={`/product/${id}`} className={style.link}>
            <div className={style.container}>
                <div className={style.img}>
                    <img className={style.bgc} src={image} alt="" />
                    <div className={style.priceAndCart}>
                        <span className={style.price}>{price} <span className={style.priceSymbol}>₽</span></span>
                        <button className={style.card} onClick={add}>
                            <img src={card} alt="" />
                        </button>
                    </div>
                    <span className={style.rating}>
                        {rating} <img src={star} alt="" />
                    </span>
                </div>
                <span className={style.description}>
                    <h4>{title}</h4>
                    <span>{description}</span>
                </span>
            </div>
        </Link>
    );
};

export default ProductCart;
