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

export function Cart() {
    const items = useSelector((s: RootState) => s.cart.items);
    const [cartProducts, setCartProducts] = useState<ProductInt[]>([]);

    const getItem = async (id: number) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/api/${id}`);
            console.log(data);
            return data;
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    useEffect(() => {
        loadAllItems();
    }, [items]);



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
                        100 <span className={style["gray-price"]}>₽</span>
                    </span>
                </span>
                <span className={style.item}>
                    <span className={style.i}>Доставка</span>
                    <span className={style.i}>
                        20 <span className={style["gray-price"]}>₽</span>
                    </span>
                </span>
                <span className={style.item}>
                    <span className={style.i}>Итог</span>
                    <span className={style.i}>
                        120 <span className={style["gray-price"]}>₽</span>
                    </span>
                </span>
            </span>
        </div>
        <Button appearance="big">Оформить</Button>
    </div>
};