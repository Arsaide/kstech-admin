import { Route, Routes } from 'react-router-dom';
import HomePage from './home/page.tsx';
import { useContext } from 'react';
import { AuthContext } from '../lib/providers/AuthProvider.tsx';
import NotAuth from './not-auth/page.tsx';
import PendingPage from './pending/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import SideBarMenu from '../components/layout/nav/side-bar/SideBar.tsx';
import ProductListPage from './product-list/page.tsx';
import CreateProductPage from './create-product/page.tsx';
import AnalyticsPage from './analytics/page.tsx';
import ClientsPage from './clients/page.tsx';
import ProductId from './product-list/product-id/ProductId.tsx';

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
                                    path={'/products-list'}
                                    element={<ProductListPage />}
                                />
                                <Route
                                    path={'/products-list/:id/'}
                                    element={<ProductId />}
                                />
                                <Route
                                    path={'/create-product'}
                                    element={<CreateProductPage />}
                                />
                                <Route
                                    path={'/analytics'}
                                    element={<AnalyticsPage />}
                                />
                                <Route
                                    path={'/clients'}
                                    element={<ClientsPage />}
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
