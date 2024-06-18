import React from 'react';
import { createRoot } from 'react-dom/client';
import { createContext } from 'react';
import App from './app/App.tsx';
import '../src/app/globals.css';
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Store from './api/store/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './lib/providers/AuthProvider.tsx';
import ToastMessage from './components/layout/common/ui/alerts/toast-message/ToastMessage.tsx';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './app/home/page.tsx';
import ProductListPage from './app/product-list/page.tsx';
import ProductId from './app/product-list/product-id/ProductId.tsx';
import CreateProductPage from './app/create-product/page.tsx';
import AnalyticsPage from './app/analytics/page.tsx';
import ClientsPage from './app/clients/page.tsx';

const queryClient = new QueryClient();

interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({
    store,
});

const root = createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/products-list',
        element: <ProductListPage />,
    },
    {
        path: '/products-list/:id/',
        element: <ProductId />,
    },
    {
        path: '/create-product',
        element: <CreateProductPage />,
    },
    {
        path: '/analytics',
        element: <AnalyticsPage />,
    },
    {
        path: '/clients',
        element: <ClientsPage />,
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <QueryClientProvider client={queryClient}>
            <Context.Provider value={{ store }}>
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                    <ToastMessage />
                </AuthProvider>
            </Context.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
);
