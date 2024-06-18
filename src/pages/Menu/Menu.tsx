import { useState, useEffect, ChangeEvent } from 'react';
import Header from "../../components/Header/Header";
import ProductCart from "../../components/ProductCart/ProductCart";
import Search from "../../components/Search/Search";
import style from './Menu.module.css';
import { ProductInt } from "../../interfaces/product.interface";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProducts } from '../../store/product.slice';

function Menu() {
    const [menuData, setMenuData] = useState<ProductInt[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { categoryProducts } = useSelector((s: RootState) => s.product);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await getData();
                setIsLoading(false);
            } catch (error) {
                setError('Ошибка загрузки данных');
                setIsLoading(false);
            }
        };

        if (categoryProducts.length > 0) {
            setMenuData(categoryProducts);
        } else {
            fetchData();
        }
    }, [categoryProducts]);

    useEffect(() => {
        getData(filter);
    }, [filter]);

    const getData = async (title?: string) => {
        try {
            setIsLoading(true);
            const action = await dispatch(getProducts({ title }));
            const data = action.payload;
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
                {!isLoading && !error && menuData.length === 0 && <p>К сожалению, ничего не найдено</p>}
            </div>
        </div>
    );
}

export default Menu;
