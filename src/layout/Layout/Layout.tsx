import { NavLink, Outlet } from 'react-router-dom';
import style from './Layout.module.css';
import img from '/public/Intersect.png';
import exit from '/public/exit.svg';
import menu from '/public/menu-icon.svg';
import cart from '/public/cart-icon.svg';
import Button from '../../components/Button/Button';
import cn from 'classnames';

export function Layout() {
    return <div className={style.container}>
        <div className={`${style.item} ${style.left}`}>
            <div className={style.info}>
                <img src={img} alt="" />
                <span>
                    <h4 className={style.h4}>Антон Ларичев</h4>
                    <span className={style.email}>alaricode@ya.ru</span>
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
                </span>
            </div>
            <div className={style.footer}>
                <div className={style.btn}>
                    {/*<img src={exit} alt="" />
                    <span>Выйти</span>*/}
                    <Button>
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
