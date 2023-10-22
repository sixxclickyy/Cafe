import { Link } from 'react-router-dom';
import style from './ProductCart.module.css';
import { ProductCart } from './ProductCart.props.ts';
import card from '/public/group.svg';
import star from '/public/star.svg';

const ProductCart = ({ id, rating, description, title, image, price }: ProductCart) => {
    return (
        <Link to={`/product/${id}`} className={style.link}>
            <div className={style.container}>
                <div className={style.img}>
                    <img className={style.bgc} src={image} alt="" />
                    <div className={style.priceAndCart}>
                        <span className={style.price}>{price} <span className={style.priceSymbol}>₽</span></span>
                        <img src={card} alt="" className={style.card} />
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