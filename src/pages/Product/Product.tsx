import { Await, Link, useLoaderData } from "react-router-dom";
import { ProductInt } from "../../interfaces/product.interface";
import { Suspense } from "react";
import style from "./Product.module.css";
import backArrow from "../../../public/svg/backArrow.svg";
import cartIcon from "../../../public/whiteCartIcon.svg";
import Button from "../../components/Button/Button";
import image from "/public/pizza.png";
import starImg from "/public/star.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Product = () => {
    const items = useSelector((s: RootState) => s.cart.items);
    const data = useLoaderData() as { data: ProductInt };
    return (
        <div className={style.main}>
            <Suspense fallback={<>Loading...</>}>
                <Await
                    resolve={data.data}
                >
                    {({ data }: { data: ProductInt }) => (
                        <div className={style.container}>
                            <span className={style.header}>
                                <span className={style.left}>
                                    <span className={style["back-arrow"]}>
                                        <Link to="/">
                                            <img src={backArrow} alt="" />
                                        </Link>
                                    </span>
                                    <h2 className={style.h2}>{data.title}</h2>
                                </span>
                                <span className={style.btn}>
                                    <Button className={style["bigBtn"]} onClick={() => items.reduce((acc, i) => acc + i.count, 0)}>
                                        <img src={cartIcon} alt="" />
                                        В корзину
                                    </Button>
                                    <Button className={style["smalBtn"]} onClick={() => items.reduce((acc, i) => acc + i.count, 0)}>
                                        <img src={cartIcon} alt="" />
                                    </Button>
                                </span>
                            </span>

                            <div className={style["info-container"]}>
                                {data.image ? <img src={data.image} alt="img" className={style.img} /> : <img src={image} alt="img" className={style.img} />}
                                <span className={style.info}>
                                    <span className={style["info-item"]}>
                                        <b>Цена:</b>
                                        <span>{data.price} ₽</span>
                                    </span>
                                    <span className={style["info-item"]}>
                                        <b>Рейтинг:</b>
                                        <span className={style.rating}>
                                            {data.rating}
                                            <img src={starImg} alt="" />
                                        </span>
                                    </span>
                                    <span className={style.compound}>
                                        <b>Состав:</b>
                                        <span>{data.description}</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>
    )
}

export default Product;