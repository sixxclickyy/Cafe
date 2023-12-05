import logo from "/public/regLogo.svg";
import style from "./Registration.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

export function Registration() {
    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    }
    return <form className={style.container} onSubmit={submit}>
        <div className={style.logo}>
            <img src={logo} alt="" />
        </div>

        <div className={style.login}>
            <h1 className={style.h1}>Регистрация</h1>
            <div className={style.item}>
                <label htmlFor="email">Ваш Email</label>
                <Input placeholder="Email" id="email" name="email" />
            </div>
            <div className={style.item}>
                <label htmlFor="password">Ваш Пароль</label>
                <Input placeholder="Password" id="password" type="password" name="password" />
            </div>
            <div className={style.item}>
                <label htmlFor="name">Ваше имя</label>
                <Input placeholder="name" id="name" name="name" />
            </div>
            <Button appearance="big">Вход</Button>
            <div className={style.registration}>
                <span>Уже есть аккаунт?</span>
                <Link to="/auth/login" className={style.active}>Войти</Link>
            </div>
        </div>
    </form>
};