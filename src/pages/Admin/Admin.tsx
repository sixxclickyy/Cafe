import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import style from "./Admin.module.css";
import { FormEvent } from "react";

export type AddItemForm = {
    title: {
        value: string;
    };
    rating: {
        value: string;
    };
    description: {
        value: string;
    };
    image: {
        value: string;
    };
    price: {
        value: string;
    };
}

function Admin() {

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & AddItemForm;
        const { title, rating, description, image, price } = target;
        console.log(title.value);
        console.log(rating.value);
        console.log(description.value);
        console.log(image.value);
        console.log(price.value);
        title.value = '';
        rating.value = '';
        description.value = '';
        image.value = '';
        price.value = '';
    }

    return (
        <form className={style.container} onSubmit={submit}>
            <h3 className={style.h3}>Заполните данные для добавления нового продукта</h3>
            <span className={style.items}>
                <div className={style.item}>
                    <label htmlFor="email">Название продукта</label>
                    <Input placeholder="Домашняя каша" id="title" type="text" name="title" />
                </div>
                <div className={style.item}>
                    <label htmlFor="email">Рейтинг продукта</label>
                    <Input placeholder="10" id="rating" type="text" name="rating" />
                </div>
                <div className={style.item}>
                    <label htmlFor="email">Описание продукта</label>
                    <Input placeholder="Очень вкусная каша" id="description" type="text" name="description" />
                </div>
                <div className={style.item}>
                    <label htmlFor="email">Изображение продукта</label>
                    <Input placeholder="Изображение" id="image" type="text" name="image" />
                </div>
                <div className={style.item}>
                    <label htmlFor="email">Цена продукта</label>
                    <Input placeholder="У мамы бесплатно" id="price" type="text" name="price" />
                </div>
            </span>
            <Button appearance="big">Добавить</Button>
        </form>
    )
}

export default Admin;