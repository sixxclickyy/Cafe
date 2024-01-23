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
import { profile, userAction } from '../../store/user.slice';
import { useEffect } from 'react';
import { RootState } from '../../store/store';

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const prof = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(profile());
    }, []);

    const logout = () => {
        dispatch(userAction.logOut())
        navigate('/auth/login');
    }

    return <div className={style.container}>
        <HiddenBurger />
        <div className={`${style.item} ${style.left}`}>
            <div className={style.info}>
                <img src={img} alt="" />
                <span>
                    <h4 className={style.h4}>Никнейм</h4>
                    <span className={style.email}>example@gmail.com</span>
                </span>
            </div>
            <div className={style.nav}>
                <span className={style.navItem}>
                    <img src={menu} alt="" />
                    <NavLink to='/' className={({ isActive }) => cn(style.navItemChild, {
                        [style.active]: isActive
                    })}>Меню</NavLink>
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
                    <Button onClick={logout}>
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
};
