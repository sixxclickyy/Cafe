import { Link, NavLink, useNavigate } from 'react-router-dom';
import style from './hidden-burger.module.css';
import { useState } from 'react';
import menuIcon from "/public/white-menu-icon.svg";
import cartIcon from "/public/white-cart-icon.svg";
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getCategoryProducts } from '../../store/product.slice';
import { logOut, logout } from '../../store/user.slice';
import Button from '../Button/Button';
import man from '/public/Intersect.png';
import woman from '/public/woman.png';
import phone from "/public/phone.png"
import order from "/public/order.png"

export const HiddenBurger = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { name, gender } = useSelector((s: RootState) => s.user);
    const { count } = useSelector((s: RootState) => s.cart);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLinkClick = () => {
        setIsClicked(false);
        dispatch(logout());
        dispatch(logOut());
        navigate('/auth/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleBrandFilter = async (brand: string) => {
        try {
            await dispatch(getCategoryProducts({ brand }));
            setIsMenuOpen(false);
            setIsClicked(false);
        } catch (error) {
            console.error('Ошибка при фильтрации по бренду:', error);
        }
    };

    const toggle = () => {
        setIsMenuOpen(false);
        setIsClicked(false);
    }

    return (
        <nav className={`${style['hidden-burger']} ${isClicked ? style['hidden-clicked-component'] : ''}`}>
            <div className={style['navbar']}>
                <div className={style['nav-container']}>
                    <input
                        className={style['checkbox']}
                        type="checkbox"
                        name=""
                        id=""
                        placeholder="."
                        checked={isClicked}
                        onChange={() => setIsClicked(!isClicked)}
                    />
                    <div className={style['hamburger-lines']}>
                        <span className={style['line1']}></span>
                        <span className={style['line2']}></span>
                        <span className={style['line3']}></span>
                    </div>
                    <div className={style['logo']}>
                        {/*<h1>Navbar</h1>*/}
                    </div>
                    <div className={style['menu-items']}>
                        <Link to="/" className={style['li-item-a']}>
                            <span className={style.containerMenu}>
                                <div className={style.info}>
                                    {gender === "m" ? <img src={man} alt="" /> : gender === "f" ? <img src={woman} alt="" className={style.woman} /> : null}
                                    <span>
                                        <h4 className={style.h4}>{name ? name : "Авторизуйтесь"}</h4>
                                    </span>
                                </div>
                                <span className={style["menu-img"]} onClick={toggleMenu}>
                                    <img src={menuIcon} alt="" />
                                    <span>Каталог</span>
                                </span>
                                {isMenuOpen && (
                                    <ul className={style.ul}>
                                        <li onClick={() => handleBrandFilter('Apple')}>Apple</li>
                                        <li onClick={() => handleBrandFilter('Samsung')}>Samsung</li>
                                        <li onClick={() => handleBrandFilter('Xiaomi')}>Xiaomi</li>
                                        <li onClick={() => handleBrandFilter('Чехлы')}>Чехлы</li>
                                        <li onClick={() => handleBrandFilter('Колонки')}>Колонки</li>
                                        <li onClick={() => handleBrandFilter('Наушники')}>Наушники</li>
                                    </ul>
                                )}
                            </span>
                        </Link>
                        <span className={style['li-item-a']} onClick={toggle}>
                            <img src={cartIcon} alt="" />
                            <NavLink to='/cart' className={({ isActive }) => cn(style.navItemChild, {
                                [style.active]: isActive
                            })}>Корзина</NavLink>
                            <span className={style.count}>{count}</span>
                        </span>
                        <span className={style['li-item-a']} onClick={toggle}>
                            <img src={order} alt="" />
                            <Link to="/orders" className={style['li-item-a']}>
                                Мои заказы
                            </Link>
                        </span>
                        <span className={style['li-item-a']} onClick={toggle}>
                            <img src={phone} alt="" className={style.phone} />
                            <NavLink to='/contacts' className={({ isActive }) => cn(style.navItemChild, {
                                [style.active]: isActive
                            })}>Контакты</NavLink>
                        </span>
                        <Link to="/auth/login" onClick={handleLinkClick} className={style['li-item-a']}>
                            <Button appearance='big'>
                                Выйти
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
};
