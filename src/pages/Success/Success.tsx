import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import style from "./Success.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function Success() {
    const { orderMessage } = useSelector((s: RootState) => s.cart);

    return (
        <div className={style.container}>
            <img src="/public/yes.png" alt="" className={style.img} />
            <h4 className={style.h3}>{orderMessage}</h4>
            <Link to='/' className={style.link}><Button appearance="big">Сделать новый</Button></Link>
        </div>
    )
};