import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'react-toastify/dist/ReactToastify.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { Context, store } from './api/context';
import { AuthProvider } from './providers/AuthProvider';
import './app/global.css';
import ToastMessage from './components/layout/common/ui/alerts/toast-message/ToastMessage';
import React from 'react';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Context.Provider value={{ store }}>
                <AuthProvider>
                    <App />
                    <ToastMessage />
                </AuthProvider>
            </Context.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </BrowserRouter>,
);
