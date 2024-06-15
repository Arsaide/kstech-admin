import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import '../src/app/globals.css';
import { BrowserRouter } from 'react-router-dom';
import Store from './api/store/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Context.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>,
);
