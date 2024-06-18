import { createRoot } from 'react-dom/client';
import { createContext } from 'react';
import App from './app/App.tsx';
import '../src/app/globals.css';
import Store from './api/store/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './utils/providers/AuthProvider.tsx';
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

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <QueryClientProvider client={queryClient}>
        <Context.Provider value={{ store }}>
            <AuthProvider>
                <App />
                <ToastMessage />
            </AuthProvider>
        </Context.Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);
