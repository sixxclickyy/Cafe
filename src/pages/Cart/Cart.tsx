import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import style from "./Cart.module.css";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProducts, order } from "../../store/cart.slice";
import { CartItemInterface } from "../../interfaces/cartItem.interface";
import { fetchPromo } from "../../store/promo.slice";

export function Cart() {
    const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
    const nav = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [dataLoaded, setDataLoaded] = useState(false);
    const promo = useSelector((state: RootState) => state.promo.promo);
    const [promoCode, setPromoCode] = useState('');
    const [number, setNumber] = useState('');

    const DELIVERY_PRICE = 5;
    const PRICE_FOR_FREE_DELIVERY = 50;

    const totalSum = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    const deliveryCost = totalSum > PRICE_FOR_FREE_DELIVERY ? 0 : DELIVERY_PRICE;
    const discount = promo ? (totalSum * promo.discount) / 100 : 0;
    const totalPrice = totalSum + deliveryCost - discount;

    useEffect(() => {
        if (!dataLoaded) {
            getData();
            setDataLoaded(true);
        }
    }, [cartItems]);

    const handleFetchPromo = async () => {
        await dispatch(fetchPromo(promoCode));
        setPromoCode("");
    };

    const checkout = async (items: { productId: number, quantity: number, number: string, price: number }[]) => {
        for (const item of items) {
            await dispatch(order(item));
        }
        nav("/success");
    };

    const handleCheckout = () => {
        checkout(cartItems.map(item => ({
            productId: item.productid,
            quantity: item.quantity,
            number: number,
            price: totalPrice
        })));
    };

    const getData = async () => {
        try {
            setIsLoading(true);
            const actionResult = await dispatch(getUserProducts());
            const data = actionResult.payload.cartItems;
            if (Array.isArray(data)) {
                setCartItems(data);
            }
            setError('');
        } catch (error) {
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={style.container}>
            <Header>Корзина</Header>
            <div className={style.products}>
                {isLoading && <p>Loading products...</p>}
                {error && <p>{error}</p>}
                {!isLoading && !error && cartItems.map((item) => (
                    <CartItem key={item.productid} count={item.quantity} {...item.product} />
                ))}
                {!isLoading && !error && cartItems.length === 0 && <p>Корзина пока пуста :)</p>}
            </div>
            <div className={style.info}>
                <span className={style["container-promo"]}>
                    <span className={style.promo}>
                        <Input
                            placeholder="Промокод"
                            className={style.input}
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button className={style.btn} onClick={handleFetchPromo}>Применить</Button>
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
                        <span className={style.i}>Скидка</span>
                        <span className={style.i}>
                            {promo ? promo.discount + "%" : 0 + "%  "}
                        </span>
                    </span>
                    <span className={style.item}>
                        <span className={style.i}>Итог</span>
                        <span className={style.i}>
                            {totalPrice} <span className={style["gray-price"]}>р</span>
                        </span>
                    </span>
                    <span className={style['container-promo']}>
                        <Input
                            placeholder="Номер телефона"
                            className={style.input}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </span>
                </span>
            </div>
            <Button appearance="big" onClick={handleCheckout}>Оформить</Button>
        </div>
    );
}
