import React from 'react';
import { Link } from 'react-router-dom';
import style from './ProductCart.module.css';
import { ProductCartIInterface } from './ProductCart.props.ts';
import card from '/public/group.svg';
import star from '/public/star.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store.ts';
import { addProduct } from '../../store/cart.slice.ts';

const ProductCart = ({ id, rating, title, image, price }: ProductCartIInterface) => {
    const dispatch = useDispatch<AppDispatch>();

    const add = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addProduct({ productId: id }));
    }

    return (
        <Link to={`/product/${id}`} className={style.link}>
            <div className={style.container}>
                <div className={style.img}>
                    <img className={style.bgc} src={"http://localhost:3001" + image} alt="" />
                    <div className={style.priceAndCart}>
                        <span className={style.price}>{price} <span className={style.priceSymbol}>р</span></span>
                        <button className={style.card} onClick={(e: React.MouseEvent<HTMLButtonElement>) => add(id, e)}>
                            <img src={card} alt="" />
                        </button>
                    </div>
                    <span className={style.rating}>
                        {rating} <img src={star} alt="" />
                    </span>
                </div>
                <span className={style.description}>
                    <h4>{title}</h4>
                </span>
            </div>
        </Link>
    );
};

export default ProductCart;
