import logo from "/public/regLogo.svg";
import style from "./Registration.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registration, userAction } from "../../store/user.slice";

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    }
}

export function Registration() {
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
        dispatch(userAction.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(registration({ email: email.value, password: password.value, name: name.value }))

    }
    return <form className={style.container} onSubmit={submit}>
        <div className={style.logo}>
            <img src={logo} alt="" />
        </div>

        <div className={style.login}>
            <h1 className={style.h1}>Регистрация</h1>
            <div className={style.err}>
                {registerErrorMessage ? registerErrorMessage : null}
            </div>
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
                <Link to="/" className={style.active}>На главную</Link>
            </div>
        </div>
    </form>
};