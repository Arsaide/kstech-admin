import { useContext } from 'react';
import { AuthContext } from '../utils/providers/AuthProvider.tsx';
import PendingPage from './pending/page.tsx';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home/page.tsx';
import ProductListPage from './product-list/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import SideBar from '../components/layout/nav/side-bar/SideBar.tsx';
import NotAuthPage from './not-auth/page.tsx';

function App() {
    const { isLoggedIn, isPending } = useContext(AuthContext);

    if (isPending) {
        return <PendingPage />;
    }

    return (
        <>
            {isLoggedIn && <AppBarMenu />}
            {isLoggedIn ? (
                <SideBar>
                    <Routes>
                        <Route path={'/'} element={<HomePage />} />
                        <Route
                            path={'/products-list'}
                            element={<ProductListPage />}
                        />
                    </Routes>
                </SideBar>
            ) : (
                <Routes>
                    <Route path={'*'} element={<NotAuthPage />} />
                </Routes>
            )}
        </>
    );
}

export default App;
