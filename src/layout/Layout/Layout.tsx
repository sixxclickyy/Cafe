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

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { email, name } = useSelector((s: RootState) => s.user);

    const items = useSelector((s: RootState) => s.cart.items);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (email && name) {

        }
    }, []);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/auth/login');
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    <span onClick={toggleMenu}>
                        <span className={style.navItem}>
                            <img src={menu} alt="" />
                            <NavLink to='/' className={({ isActive }) => cn(style.navItemChild, {
                                [style.active]: isActive
                            })}>Каталог</NavLink>
                            <img src={arrowDown} alt="" className={style.arrowDown} />
                        </span>
                        <span>
                            {isMenuOpen && (
                                <ul className={style.ul}>
                                    <li>Apple</li>
                                    <li>Sumsung</li>
                                    <li>Xiomi</li>
                                </ul>
                            )}
                        </span>
                    </span>
                    <span className={style.navItem}>
                        <img src={cart} alt="" />
                        <NavLink to='/cart' className={({ isActive }) => cn(style.navItemChild, {
                            [style.active]: isActive
                        })}>Корзина</NavLink>
                        <span className={style.count}>{items.reduce((acc, i) => acc += i.count, 0)}</span>
                    </span>
                </div>
                <div className={style.footer}>
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
    );
};
