import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { Layout } from './layout/Layout/Layout.tsx';
import Product from './pages/Product/Product.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Menu />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/product/:id',
                element: <Product />
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
