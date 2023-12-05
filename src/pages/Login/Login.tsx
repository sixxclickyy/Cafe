import logo from "/public/regLogo.svg";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { FormEvent } from "react";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

export function Login() {
    const submit = (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        console.log(email.value);
        console.log(password.value);
    }

    return <form className={style.container} onSubmit={submit}>
        <div className={style.logo}>
            <img src={logo} alt="" />
        </div>

        <div className={style.login}>
            <h1 className={style.h1}>Вход</h1>
            <div className={style.item}>
                <label htmlFor="email">Ваш Email</label>
                <Input placeholder="Email" id="email" name="email" />
            </div>
            <div className={style.item}>
                <label htmlFor="password">Ваш Пароль</label>
                <Input placeholder="Password" id="password" type="password" name="password" />
            </div>
            <Button appearance="big">Вход</Button>
            <div className={style.registration}>
                <span>Нет аккаунта?</span>
                <Link to="/auth/registration" className={style.active}>Зарегистрироваться</Link>
            </div>
        </div>
    </form>
};