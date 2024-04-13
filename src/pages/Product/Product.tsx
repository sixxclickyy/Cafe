import { Await, Link, useLoaderData } from "react-router-dom";
import { ProductInt } from "../../interfaces/product.interface";
import { Suspense } from "react";
import style from "./Product.module.css";
import backArrow from "../../../public/svg/backArrow.svg";
import cartIcon from "../../../public/whiteCartIcon.svg";
import Button from "../../components/Button/Button";
import image from "/public/pizza.png";
import starImg from "/public/star.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart.slice";
import { RootState } from "../../store/store";

function Product() {
    const items = useSelector((s: RootState) => s.cart.items);
    const data = useLoaderData() as { data: ProductInt };
    const dispatch = useDispatch();

    const add = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addToCart({ productId: id, quantity: 1, userId: 8 }));
    }

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
                                <span className={style.btn} onClick={(e: React.MouseEvent<HTMLButtonElement>) => add(data.id, e)}>
                                    <Button className={style["bigBtn"]}>
                                        <img src={cartIcon} alt="" />
                                        В корзину
                                    </Button>
                                    <Button className={style["smalBtn"]}>
                                        <img src={cartIcon} alt="" />
                                    </Button>
                                </span>
                            </span>

                            <div className={style["info-container"]}>
                                {data.image ? <img src={data.image} alt="img" className={style.img} /> : <img src={image} alt="img" className={style.img} />}
                                <span className={style.info}>
                                    <span className={style["info-item"]}>
                                        <b>Цена:</b>
                                        <span>{data.price} р</span>
                                    </span>
                                    <span className={style["info-item"]}>
                                        <b>Рейтинг:</b>
                                        <span className={style.rating}>
                                            {data.rating}
                                            <img src={starImg} alt="" />
                                        </span>
                                    </span>
                                    <span className={style.compound}>
                                        <b>Описание:</b>
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
