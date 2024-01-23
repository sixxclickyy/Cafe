import logo from "/public/regLogo.svg";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { login, userAction } from "../../store/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
}

export function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate])

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }))
    }

    const submit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(userAction.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        sendLogin(email.value, password.value);
    }

    return <form className={style.container} onSubmit={submit}>
        <div className={style.logo}>
            <img src={logo} alt="" />
        </div>

        <div className={style.login}>
            <h1 className={style.h1}>Вход</h1>
            <div className={style.err}>
                {loginErrorMessage ? loginErrorMessage : null}
            </div>
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
                <Link to="/" className={style.active}>На главную</Link>
            </div>
        </div>
    </form>
};