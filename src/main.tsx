import React, { createContext, lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { Cart } from './pages/Cart/Cart';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Layout } from './layout/Layout/Layout.tsx';
import Product from './pages/Product/Product.tsx';
import 'firebase/auth';
import 'firebase/firestore';
import axios from 'axios';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Registration } from './pages/Registration/Registration.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import Admin from './pages/Admin/Admin.tsx';
import { Provider } from 'react-redux';
import { Success } from './pages/Success/Success.tsx';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<>Loading...</>}><Menu /></Suspense>
            },
            {
                path: '/cart',
                element: <RequireAuth><Cart /></RequireAuth>
            },
            {
                path: '/product/:id',
                element: <Product />,
                errorElement: <>Error!!!</>,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((res, rej) => {
                            axios.get(`/product/${params.id}`).then(data => res(data)).catch(rej);

                        })
                    });
                }
            },
            {
                path: '/admin',
                element: <Admin />
            },
            {
                path: '/success',
                element: <Success />
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'registration',
                element: <Registration />
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode >,
)