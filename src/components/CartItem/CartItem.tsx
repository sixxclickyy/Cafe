import { useDispatch } from "react-redux";
import style from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import krest from "/public/krest.svg";
import { AppDispatch } from "../../store/store";
import { cartAction } from "../../store/cart.slice";
import pizza from "/public/pizza.png";

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const descrease = () => {
        dispatch(cartAction.remove(props.id))
    };

    const increase = () => {
        dispatch(cartAction.add(props.id));
    };

    const removeItem = () => {
        dispatch(cartAction.delete(props.id));
    };

    return (
        <div className={style.product}>
            <span className={style.img}>
                <img src={props.image} alt="img" />
            </span>
            <span className={style["name-price"]}>
                <span><b>{props.title}</b></span>
                <span>{props.price} <span className={style.price}>р</span></span>
            </span>
            <span className={style.count}>
                <span className={style.minus} onClick={descrease}>-</span>
                <span className={style.numPrice}>{props.count}</span>
                <span className={style.plus} onClick={increase}>+</span>
                <span>
                    <img src={krest} alt="Удалить" onClick={removeItem} />
                </span>
            </span>
        </div >
    )
}

export default CartItem;