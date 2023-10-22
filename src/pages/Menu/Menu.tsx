import Header from "../../components/Header/Header";
import ProductCart from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import style from './Menu.module.css';

export function Menu() {
    return <div>
        <div className={style.container}>
            <Header>Меню</Header>
            <Search placeholder="Введите блюдо или состав" />
        </div>
        <div>
            <ProductCart
                id={1}
                description="Салями, руккола, помидоры, оливки"
                title="Наслаждение"
                image="public/pizza.png"
                rating={5}
                price={300}
            />
        </div>
    </div>
};