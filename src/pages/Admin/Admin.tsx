import React, { FormEvent, useState } from "react";
import Button from "../../components/Button/Button";
import style from "./Admin.module.css";

function Admin() {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [price, setPrice] = useState("");

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

        // Отправка данных на сервер
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

    return (
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
                        />
                    </div>
                </span>
                <Button appearance="big" type="submit">Добавить</Button>
            </div>
        </form>
    );
}

export default Admin;
