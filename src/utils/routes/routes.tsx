import { createBrowserRouter } from 'react-router-dom';
import SideBarMenu from '../../components/layout/nav/side-bar/SideBar.tsx';
import HomePage from '../../app/home/page.tsx';
import ProductListPage from '../../app/product-list/page.tsx';
import ProductIdPage from '../../app/product-list/product-id/ProductIdPage.tsx';
import CreateProductPage from '../../app/create-product/page.tsx';
import AnalyticsPage from '../../app/analytics/page.tsx';
import ClientsPage from '../../app/clients/page.tsx';
import NotAuth from '../../app/not-auth/page.tsx';

export const authRouter = createBrowserRouter([
    {
        path: '/',
        element: <SideBarMenu />,
        errorElement: <NotAuth />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: 'products-list',
                element: <ProductListPage />,
            },
            {
                path: 'products-list/*',
                element: <ProductListPage />,
            },
            {
                path: 'products-list/:id',
                element: <ProductIdPage />,
            },
            {
                path: 'create-product',
                element: <CreateProductPage />,
            },
            {
                path: 'analytics',
                element: <AnalyticsPage />,
            },
            {
                path: 'clients',
                element: <ClientsPage />,
            },
        ],
    },
]);

export const notAuthRouter = createBrowserRouter([
    {
        path: '*',
        element: <NotAuth />,
    },
]);
