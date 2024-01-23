import axios, { AxiosError } from 'axios';
import Header from "../../components/Header/Header";
import ProductCart from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import style from './Menu.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { ProductInt } from "../../interfaces/product.interface";

function Menu() {
    const [menuData, setMenuData] = useState<ProductInt[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getData(filter);
    }, [filter]);

    const getData = async (name?: string) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<ProductInt[]>('http://localhost:3001/api', {
                params: {
                    name
                }
            });
            setIsLoading(false);
            setMenuData(data);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    }

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return <div className={style.main}>
        <div className={style.container}>
            <Header>Меню</Header>
            <Search placeholder="Введите блюдо или состав" onChange={updateFilter} />
        </div>
        <span className={style['card-container']}>
            {error && <p>{error}</p>}
            {!isLoading && menuData.length > 0 && menuData.map(el => (
                <ProductCart
                    key={el.id}
                    id={el.id}
                    rating={el.rating}
                    description={el.description}
                    title={el.title}
                    image="public/pizza.png"
                    price={el.price} />
            ))}
            {isLoading && <p>Loading products...</p>}
            {!isLoading && !menuData.length && <p>По вашему запросу ничего не найдено :(</p>}
        </span>
    </div>
};

export default Menu;