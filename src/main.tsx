import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import '../src/app/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToastMessage from './components/layout/common/ui/alerts/toast-message/ToastMessage.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { Context, store } from './api/context.ts';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/providers/AuthProvider.tsx';

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
