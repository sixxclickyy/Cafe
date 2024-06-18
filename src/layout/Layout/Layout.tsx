import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import style from './Layout.module.css';
import man from '/public/Intersect.png';
import woman from '/public/woman.png';
import exit from '/public/exit.svg';
import menu from '/public/menu-icon.svg';
import cart from '/public/cart-icon.svg';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { HiddenBurger } from '../../components/hidden-burger/hidden-burger';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logOut, logout } from '../../store/user.slice';
import { RootState } from '../../store/store';
import arrowDown from "/public/arrowDown.png";
import { useEffect, useState } from 'react';
import { getCategoryProducts } from '../../store/product.slice';
import { getUserProducts } from '../../store/cart.slice';
import instagram from "/public/instagram.png";
import tg from "/public/telegram.png";
import phone from "/public/phone.png"
import order from "/public/order.png"

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { email, name, gender } = useSelector((s: RootState) => s.user);
    const { count } = useSelector((s: RootState) => s.cart);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (email && name) {
            dispatch(getUserProducts());
        }
    }, [email, name, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
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
        <div className={style['main-container']}>
            <div className={style.container}>
                <HiddenBurger />
                <div className={`${style.item} ${style.left}`}>
                    <div className={style.info}>
                        {gender === "m" ? <img src={man} alt="" /> : gender === "f" ? <img src={woman} alt="" className={style.woman} /> : null}
                        <span>
                            <h4 className={style.h4}>{name}</h4>
                            <span className={style.email}>{email ? email : <Button onClick={handleLogout}>
                                Авторизируйтесь
                            </Button>}</span>
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
                                    <ul className={style.beads}>
                                        <span>
                                            <li onClick={() => handleBrandFilter('Apple')}>Apple</li>
                                        </span>
                                        <span>
                                            <li onClick={() => handleBrandFilter('Samsung')}>Samsung</li>
                                        </span>
                                        <span>
                                            <li onClick={() => handleBrandFilter('Xiaomi')}>Xiaomi</li>
                                        </span>
                                        <span>
                                            <li onClick={() => handleBrandFilter('Чехлы')}>Чехлы</li>
                                        </span>
                                        <span>
                                            <li onClick={() => handleBrandFilter('Колонки')}>Колонки</li>
                                        </span>
                                        <span>
                                            <li onClick={() => handleBrandFilter('Наушники')}>Наушники</li>
                                        </span>
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
                        <span className={style.navItem}>
                            <img src={order} alt="" className={style.order} />
                            <NavLink to='/orders' className={({ isActive }) => cn(style.navItemChild, {
                                [style.active]: isActive
                            })}>Мои заказы</NavLink>
                        </span>
                        <span className={style.navItem}>
                            <img src={phone} alt="" className={style.phone} />
                            <NavLink to='/contacts' className={({ isActive }) => cn(style.navItemChild, {
                                [style.active]: isActive
                            })}>Контакты</NavLink>
                        </span>
                        <div className={style.btn}>
                            <Button onClick={handleLogout}>
                                <img src={exit} alt="" />
                                Выйти
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={`${style.item} ${style.right}`}>
                    <Outlet />
                </div>
            </div>
            <div className={style.footer}>
                <span className={style['social-media']}>
                    <img src={instagram} alt="" />
                    <img src={tg} alt="" />
                </span>
            </div>
        </div>
    );
};
