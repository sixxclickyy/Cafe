import { Link } from 'react-router-dom';
import style from './hidden-burger.module.css';
import { useState } from 'react';
import menuIcon from "/public/white-menu-icon.svg";
import cartIcon from "/public/white-cart-icon.svg";

export const HiddenBurger = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setIsClicked(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
                        <Link to="/" onClick={toggleMenu} className={style['li-item-a']}>
                            <span className={style.containerMenu}>
                                <span className={style["menu-img"]}>
                                    <img src={menuIcon} alt="" />
                                    <span>Меню</span>
                                </span>
                                {isMenuOpen && (
                                    <ul className={style.ul}>
                                        <li>Сеты</li>
                                        <li>Пицца</li>
                                        <li>Шаурма</li>
                                        <li>Напитки</li>
                                        <li>Другое</li>
                                    </ul>
                                )}
                            </span>
                        </Link>
                        <Link to="/cart" onClick={handleLinkClick} className={style['li-item-a']}><img src={cartIcon} alt='' /><span>Корзина</span></Link>
                        <Link to="/auth/login" onClick={handleLinkClick} className={style['li-item-a']}>Войти</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
