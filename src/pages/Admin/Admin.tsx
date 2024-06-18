import React, { FormEvent, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import style from "./Admin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateOrderAcceptance, getAllOrders } from "../../store/orders.slice";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../store/user.slice";
import axios from "axios";

function Admin() {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const { orders, loading, error } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isDataAccepted, setIsDataAccepted] = useState<Record<number, string>>({});
    const [deteteItemById, setdeteteItemById] = useState("");

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("rating", rating);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }
        formData.append("price", price);
        formData.append("brandid", category);

        fetch("http://localhost:3001/api/product", {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    console.log("Product added successfully!");
                    setTitle("");
                    setRating("");
                    setDescription("");
                    setImage(null);
                    setPrice("");
                    setCategory("");
                    setdeteteItemById("");
                } else {
                    console.error("Failed to add product");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files ? e.target.files[0] : null;
        setImage(selectedImage);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleUpdateOrder = async (orderId: number, isAccepted: string | boolean) => {
        const newIsAccepted = isAccepted === '1' ? '0' : '1';
        setIsDataAccepted((prevState) => ({
            ...prevState,
            [orderId]: newIsAccepted,
        }));
        await dispatch(updateOrderAcceptance({ orderId, isAccepted: newIsAccepted }));
        //location.reload();
    };

    const deleteProduct = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`/product/${deteteItemById}`);
            if (response.status === 200) {
                console.log("Product deleted successfully!");
                setdeteteItemById("");
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleLogout = () => {
        dispatch(logOut());
        navigate('/auth/login');
    }

    return (
        <div className={style['main-container']}>
            <div className={style.ordersContainer}>
                <h3 className={style.h3}>Список заказов</h3>
                {loading && <p>Загрузка...</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Почта пользователя</th>
                                <th>Номер телефона</th>
                                <th>ID продукта</th>
                                <th>Количество</th>
                                <th>Цена</th>
                                <th>Статус</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className={style.post}>{order.useremail}</td>
                                    <td>{order.number}</td>
                                    <td>{order.productid}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>{isDataAccepted[order.id] || order.isaccepted === "1" ? 'Оформлено' : 'В процессе'}</td>
                                    <td>
                                        <Button onClick={() => handleUpdateOrder(order.id, isDataAccepted[order.id] || order.isaccepted)}>
                                            {isDataAccepted[order.id] || order.isaccepted === "1" ? 'Отменить' : 'Подтвердить'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className={style.formContainer}>
                <form onSubmit={submit} className={style.form}>
                    <div className={style.container}>
                        <h3 className={style.h3}>Заполните данные для добавления нового товара</h3>
                        <span className={style.items}>
                            <div className={style.item}>
                                <label htmlFor="title">Название товара</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Новенький айфон"
                                    className={style.input}
                                />
                            </div>
                            <div className={style.item}>
                                <label htmlFor="rating">Рейтинг товара</label>
                                <input
                                    type="text"
                                    id="rating"
                                    name="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    placeholder="5"
                                    className={style.input}
                                />
                            </div>
                            <div className={style.item}>
                                <label htmlFor="description">Описание товара</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Очень классный айфон"
                                    className={style.input}
                                />
                            </div>
                            <div className={style.item}>
                                <label htmlFor="image">Изображение товара</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <div className={style.item}>
                                <label htmlFor="price">Цена товара</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="6000"
                                    className={style.input}
                                />
                            </div>
                            <div className={style.item}>
                                <label htmlFor="sexOption">Категория</label>
                                <select
                                    id="sexOption"
                                    name="sexOption"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    className={style.input}
                                >
                                    <option value="1">Apple</option>
                                    <option value="3">Samsung</option>
                                    <option value="2">Xiaomi</option>
                                    <option value="4">Huawei</option>
                                    <option value="5">Колонки</option>
                                    <option value="6">Наушники</option>
                                    <option value="7">Часы</option>
                                    <option value="8">Чехлы</option>
                                </select>
                            </div>
                        </span>
                        <Button appearance="big" type="submit">Добавить</Button>
                    </div>
                </form>
                <form onSubmit={deleteProduct} className={style.form2}>
                    <div className={style.container}>
                        <span className={style.items}>
                            <div className={style.item}>
                                <input
                                    type="text"
                                    id="deteteItemById"
                                    name="deteteItemById"
                                    value={deteteItemById}
                                    onChange={(e) => setdeteteItemById(e.target.value)}
                                    placeholder="Название товара для удаления"
                                    className={style.input}
                                />
                            </div>
                        </span>
                        <Button appearance="big" type="submit">Удалить</Button>
                        <Link to="/auth/login" className={style.exit}>
                            <Button appearance="big" className={style.btn} onClick={handleLogout}>Выйти</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Admin;
