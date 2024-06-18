import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import '../src/app/globals.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './utils/providers/AuthProvider.tsx';
import ToastMessage from './components/layout/common/ui/alerts/toast-message/ToastMessage.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { Context, store } from './api/context.ts';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
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
    </QueryClientProvider>,
);
