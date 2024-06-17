import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/page.tsx';
import { useContext } from 'react';
import { AuthContext } from '../lib/providers/AuthProvider.tsx';
import NotAuth from './not-auth/page.tsx';
import PendingPage from './pending-page/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import SideBarMenu from '../components/layout/nav/side-bar/SideBar.tsx';
import ProductListPage from './product-list/page.tsx';

function App() {
    const { isLoggedIn, isPending } = useContext(AuthContext);

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
                                    path={'/product-list'}
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
