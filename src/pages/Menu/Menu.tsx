import axios from 'axios';
import { useState, useEffect, ChangeEvent } from 'react';
import Header from "../../components/Header/Header";
import ProductCart from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import style from './Menu.module.css';
import { ProductInt } from "../../interfaces/product.interface";

function Menu() {
    const [menuData, setMenuData] = useState<ProductInt[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getData(filter);
    }, [filter]);


    const getData = async (title?: string) => {
        try {
            setIsLoading(true);
            let url = 'http://localhost:3001/api/products';
            if (title) {
                url = `http://localhost:3001/api/products/filter?title=${title}`;
            }
            const { data } = await axios.get<ProductInt[]>(url);
            setMenuData(data);
            setError('');
        } catch (error) {
            setError('Ошибка загрузки данных');
        } finally {
            setIsLoading(false);
        }
    };


    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <div className={style.main}>
            <div className={style.container}>
                <Header>Каталог</Header>
                <Search placeholder="Я ищу..." onChange={handleFilterChange} />
            </div>
            <div className={style['card-container']}>
                {isLoading && <p>Loading products...</p>}
                {error && <p>{error}</p>}
                {!isLoading && !error && menuData.map((product) => (
                    <ProductCart
                        key={product.id}
                        id={product.id}
                        rating={product.rating}
                        description={product.description}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                    />
                ))}
                {!isLoading && !error && menuData.length === 0 && <p>По вашему запросу ничего не найдено</p>}
            </div>
        </div>
    );
}

export default Menu;
