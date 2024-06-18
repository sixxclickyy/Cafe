import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import style from "./Orders.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { OrderInterface } from "../../interfaces/order.interface";
import { getOrder } from "../../store/orders.slice";

export function Orders() {
    const [orderData, setOrderData] = useState<OrderInterface[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        try {
            setIsLoading(true);
            getData();
            setIsLoading(false);
        } catch (error) {
            setError('Ошибка загрузки данных');
            setIsLoading(false);
        }
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const action = await dispatch(getOrder());
            const data = action.payload;
            setOrderData(data);
            setError('');
        } catch (error) {
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const addLeadingZero = (num: number) => (num < 10 ? '0' : '') + num;

        const year = date.getFullYear();
        const month = addLeadingZero(date.getMonth() + 1);
        const day = addLeadingZero(date.getDate());

        const hours = addLeadingZero(date.getHours());
        const minutes = addLeadingZero(date.getMinutes());
        const seconds = addLeadingZero(date.getSeconds());

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className={style.container}>
            <Header>Ваши заказы</Header>

            {isLoading && <p>Loading products...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && orderData.map((product) => (
                <div key={product.id} className={style.item}>
                    <img src={"http://localhost:3001" + product.image} alt="image" className={style.img} />
                    <span><b>Количество:</b> {product.quantity}</span>
                    <span><b>Время заказа:</b> {formatDate(product.date)}</span>
                    <span><b>Сумма:</b> {product.price}</span>
                    <span><b>Состояние заказа:</b>
                        {product.isaccepted === "1" ? " Принят" : " В обработке"}
                    </span>
                </div>
            ))}
            {!isLoading && !error && orderData.length === 0 && <p>Вы пока ничего не заказали :)</p>}
        </div>
    );
};
