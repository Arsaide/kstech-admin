import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import '../src/app/globals.css';
import { BrowserRouter } from 'react-router-dom';
import Store from './api/store/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './lib/providers/AuthProvider.tsx';
import ToastMessage from './components/layout/common/ui/alerts/toast-message/ToastMessage.tsx';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({
    store,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
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
