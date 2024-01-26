import { Link } from 'react-router-dom';
import style from './hidden-burger.module.css';
import { useState } from 'react';

export const HiddenBurger = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleLinkClick = () => {
        setIsClicked(false);
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
                        <Link to="/" onClick={handleLinkClick} className={style['li-item-a']}>Меню</Link>
                        <Link to="/cart" onClick={handleLinkClick} className={style['li-item-a']}>Корзина</Link>
                        <Link to="/auth/login" onClick={handleLinkClick} className={style['li-item-a']}>Войти</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
