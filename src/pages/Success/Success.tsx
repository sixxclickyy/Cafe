import Button from "../../components/Button/Button";
import style from "./Success.module.css";

export function Success() {
    return (
        <div className={style.container}>
            <img src="/public/order.png" alt="" className={style.img} />
            <p>Ваз заказ успешно оформлен!</p>
            <Button appearance="big">Сделать новый</Button>
        </div>
    )
};