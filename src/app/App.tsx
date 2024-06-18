import { Outlet, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../utils/providers/AuthProvider.tsx';
import PendingPage from './pending/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import { authRouter, notAuthRouter } from '../utils/routes/routes.tsx';

function App() {
    const { isLoggedIn, isPending } = useContext(AuthContext);

    if (isPending) {
        return <PendingPage />;
    }

    return (
        <div className="App">
            {isLoggedIn && <AppBarMenu />}
            <RouterProvider
                router={isLoggedIn ? authRouter : notAuthRouter}
                future={{ v7_startTransition: true }}
            />
            <Outlet />
        </div>
    );
}

export default App;
