import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import style from "./Cart.module.css";
import { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { ProductInt } from "../../interfaces/product.interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Cart() {
    const items = useSelector((s: RootState) => s.cart.items);
    const [cartProducts, setCartProducts] = useState<ProductInt[]>([]);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const nav = useNavigate();

    const getItem = async (id: number) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/api/product/${id}`);
            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    const checkout = async () => {
        await axios.post("", {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        nav('/success');
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);

    const DELIVERY_PRICE = 5;

    const PRICE_FOR_FREE_DELIVERY = 50;

    const SUM = items.map(i => {
        const product = cartProducts.find(p => p.id === i.id);
        if (!product) {
            return 0;
        }
        return i.count * product.price;
    }).reduce((acc, i) => acc += i, 0)

    return <div className={style.container}>
        <Header>Корзина</Header>
        <div className={style.products}>
            {items.map(i => {
                const product = cartProducts.find(p => p.id === i.id)
                if (!product) {
                    return
                }
                return <CartItem key={product.id} count={i.count} {...product} />
            })}
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
                        {SUM} <span className={style["gray-price"]}>р</span>
                    </span>
                </span>
                <span className={style.item}>
                    <span className={style.i}>Доставка</span>
                    <span className={style.i}>
                        {
                            SUM > PRICE_FOR_FREE_DELIVERY ? <>Бесплатно</> : DELIVERY_PRICE
                        } <span className={style["gray-price"]}>р</span>
                    </span>
                </span>
                <span className={style.item}>
                    <span className={style.i}>Итог</span>
                    <span className={style.i}>
                        {SUM + DELIVERY_PRICE}
                        <span className={style["gray-price"]}> р</span>
                    </span>
                </span>
            </span>
        </div>
        <Button appearance="big" onClick={checkout}>Оформить</Button>
    </div>
};