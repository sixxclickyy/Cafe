import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import style from "./Cart.module.css";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUserProducts } from "../../store/cart.slice";
import { CartItemInterface } from "../../interfaces/cartItem.interface";

export function Cart() {
    const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const nav = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            getData();
            setDataLoaded(true);
        }
    }, [cartItems]);



    const checkout = async () => {
        await axios.post("", {
            products: cartItems.map(item => ({ id: item.product.id, quantity: item.quantity }))
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        nav('/success');
    };

    const getData = async () => {
        try {
            setIsLoading(true);
            const actionResult = await dispatch(getUserProducts());
            const data = actionResult.payload.cartItems;
            if (Array.isArray(data)) {
                //console.log(data)
                setCartItems(data);
            }
            setError('');
        } catch (error) {
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };


    const DELIVERY_PRICE = 5;
    const PRICE_FOR_FREE_DELIVERY = 50;

    const totalSum = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    const deliveryCost = totalSum > PRICE_FOR_FREE_DELIVERY ? 0 : DELIVERY_PRICE;
    const totalPrice = totalSum + deliveryCost;

    return (
        <div className={style.container}>
            <Header>Корзина</Header>
            <div className={style.products}>
                {isLoading && <p>Loading products...</p>}
                {error && <p>{error}</p>}
                {!isLoading && !error && cartItems.map((item) => (
                    <CartItem key={item.id} count={item.quantity} {...item.product} />
                ))}
                {!isLoading && !error && cartItems.length === 0 && <p>Корзина пока пуста :)</p>}
            </div>
            <div className={style.info}>
                <span className={style["container-promo"]}>
                    <span className={style.promo}>
                        <Input placeholder="Промокод" className={style.input} />
                        <Button className={style.btn}>Применить</Button>
                    </span>
                </span>
                <span className={style["finish-price"]}>
                    <span className={style.item}>
                        <span className={style.i}>Итог</span>
                        <span className={style.i}>
                            {totalSum} <span className={style["gray-price"]}>р</span>
                        </span>
                    </span>
                    <span className={style.item}>
                        <span className={style.i}>Доставка</span>
                        <span className={style.i}>
                            {deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} р`} <span className={style["gray-price"]}>р</span>
                        </span>
                    </span>
                    <span className={style.item}>
                        <span className={style.i}>Итог</span>
                        <span className={style.i}>
                            {totalPrice} <span className={style["gray-price"]}>р</span>
                        </span>
                    </span>
                </span>
            </div>
            <Button appearance="big" onClick={checkout}>Оформить</Button>
        </div>
    );
}
