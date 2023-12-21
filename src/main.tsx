import React, { lazy, Suspense } from 'react'
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
                            setTimeout(() => {
                                axios.get(`http://localhost:3001/api/${params.id}`).then(data => res(data)).catch(rej);
                            }, 2000)
                        })
                    });
                }
            },
            {
                path: '/admin',
                element: <Admin />
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
        <RouterProvider router={router} />
    </React.StrictMode >,
)
