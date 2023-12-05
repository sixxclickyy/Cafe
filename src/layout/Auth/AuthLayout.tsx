import { Outlet } from 'react-router-dom';
import style from './AuthLayout.module.css';

export function AuthLayout() {
    return <div className={style.container}>
        <div className={style.logo}>

        </div>
        <div className={style.content}>
            <Outlet />
        </div>
    </div>
};
