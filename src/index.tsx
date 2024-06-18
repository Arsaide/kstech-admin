import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'react-toastify/dist/ReactToastify.css';
import "react-image-gallery/styles/css/image-gallery.css";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {Context, store} from './api/context';
import { AuthProvider } from './utils/providers/AuthProvider';
import './app/global.css';


const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <Context.Provider value={{ store }}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Context.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </BrowserRouter>,
);
