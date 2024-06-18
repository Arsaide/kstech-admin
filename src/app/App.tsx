import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import NotAuth from './not-auth/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import SideBarMenu from '../components/layout/nav/side-bar/SideBar.tsx';
import ProductListPage from './product-list/page.tsx';
import { AuthContext } from '../utils/providers/AuthProvider.tsx';
import PendingPage from './pending/page.tsx';
import HomePage from './home/page.tsx';

function App() {
    const { isLoggedIn, isPending } = useContext(AuthContext);

    if (isPending) {
        return <PendingPage />;
    }

    return (
        <div className={'App'}>
            {isPending ? (
                <PendingPage />
            ) : (
                <>
                    {isLoggedIn && <AppBarMenu />}
                    {isLoggedIn ? (
                        <SideBarMenu>
                            <Routes>
                                <Route path={'/'} element={<HomePage />} />
                                <Route
                                    path={'/products-list'}
                                    element={<ProductListPage />}
                                />
                            </Routes>
                        </SideBarMenu>
                    ) : (
                        <Routes>
                            <Route path={'*'} element={<NotAuth />} />
                        </Routes>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
