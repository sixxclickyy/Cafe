import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import style from './Layout.module.css';
import img from '/public/Intersect.png';
import exit from '/public/exit.svg';
import menu from '/public/menu-icon.svg';
import cart from '/public/cart-icon.svg';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { HiddenBurger } from '../../components/hidden-burger/hidden-burger';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logOut } from '../../store/user.slice';
import { RootState } from '../../store/store';
import arrowDown from "/public/arrowDown.png";
import { useEffect, useState } from 'react';
import { getCategoryProducts } from '../../store/product.slice';
import { getUserProducts } from '../../store/cart.slice';

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { email, name } = useSelector((s: RootState) => s.user);
    const { count } = useSelector((s: RootState) => s.cart);

    const items = useSelector((s: RootState) => s.cart.items);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (email && name) {
            dispatch(getUserProducts());
        }
    }, [email, name, dispatch]);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/auth/login');
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleBrandFilter = async (brand: string) => {
        try {
            await dispatch(getCategoryProducts({ brand }));
        } catch (error) {
            console.error('Ошибка при фильтрации по бренду:', error);
        }
    };

    return (
        <div className={style.container}>
            <HiddenBurger />
            <div className={`${style.item} ${style.left}`}>
                <div className={style.info}>
                    <img src={img} alt="" />
                    <span>
                        <h4 className={style.h4}>{name}</h4>
                        <span className={style.email}>{email ? email : "Авторизируйтесь"}</span>
                    </span>
                </div>
                <div className={style.nav}>
                    <span>
                        <span className={style.navItem}>
                            <img src={menu} alt="" />
                            <NavLink to='/' className={({ isActive }) => cn(style.navItemChild, {
                                [style.active]: isActive
                            })}>Каталог</NavLink>
                            <img src={arrowDown} alt="" className={style.arrowDown} onClick={toggleMenu} />
                        </span>
                        <span>
                            {isMenuOpen && (
                                <ul className={style.ul}>
                                    <li onClick={() => handleBrandFilter('Apple')}>Apple</li>
                                    <li onClick={() => handleBrandFilter('Samsung')}>Samsung</li>
                                    <li onClick={() => handleBrandFilter('Xiaomi')}>Xiaomi</li>
                                </ul>
                            )}
                        </span>
                    </span>
                    <span className={style.navItem}>
                        <img src={cart} alt="" />
                        <NavLink to='/cart' className={({ isActive }) => cn(style.navItemChild, {
                            [style.active]: isActive
                        })}>Корзина</NavLink>
                        <span className={style.count}>{count}</span>
                    </span>
                    <div className={style.footer}>
                        <div className={style.btn}>
                            <Button onClick={handleLogout}>
                                <img src={exit} alt="" />
                                Выйти
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.item} ${style.right}`}>
                <Outlet />
            </div>
        </div>
    );
};
