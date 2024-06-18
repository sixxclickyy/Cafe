import logo from "/public/regLogo.svg";
import style from "./Login.module.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect } from "react";
import { login, userSlice } from "../../store/user.slice";
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
    const { jwt, loginErrorMessage, isAdmin } = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
        }
        if (jwt) {
            navigate('/');
            location.reload();
        }
    }, [jwt, navigate, isAdmin]);

    const sendLogin = async (email: string, password: string) => {
        try {
            await dispatch(login({ email, password }));
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userSlice.actions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };

    return (
        <form className={style.container} onSubmit={submit}>
            <div className={style.logo}>
                <img src={logo} alt="" />
            </div>

            <div className={style.login}>
                <div className={loginErrorMessage ? style.err : style["hidden-err"]}>
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
    );
}