import { useDispatch } from "react-redux";
import style from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";
import krest from "/public/krest.svg";
import { AppDispatch } from "../../store/store";
import { decreaseProduct, deleteProduct, increaseProduct } from "../../store/cart.slice";

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const descrease = (productId: number) => {
        dispatch(decreaseProduct({ productId }));
        location.reload();
    };

    const increase = (productId: number) => {
        dispatch(increaseProduct({ productId }));
        location.reload();
    };

    const removeItem = async (productId: number) => {
        await dispatch(deleteProduct({ productId }));
        location.reload();
    };

    return (
        <div className={style.product}>
            <span className={style.img}>
                <img src={"http://localhost:3001" + props.image} alt="img" />
            </span>
            <span className={style["name-price"]}>
                <span><b>{props.title}</b></span>
                <span>{props.price} <span className={style.price}>р</span></span>
            </span>
            <span className={style.count}>
                <span className={style.minus} onClick={() => descrease(props.id)}>-</span>
                <span className={style.numPrice}>{props.count}</span>
                <span className={style.plus} onClick={() => increase(props.id)}>+</span>
                <span>
                    <img src={krest} alt="Удалить" onClick={() => removeItem(props.id)} />
                </span>
            </span>
        </div >
    )
}

export default CartItem;