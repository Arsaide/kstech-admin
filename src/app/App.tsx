import { useContext } from 'react';
import { AuthContext } from '../utils/providers/AuthProvider.tsx';
import PendingPage from './pending/page.tsx';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home/page.tsx';
import ProductListPage from './product-list/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import SideBar from '../components/layout/nav/side-bar/SideBar.tsx';
import NotAuthPage from './not-auth/page.tsx';
import CreateProductPage from './create-product/page.tsx';
import AnalyticsPage from './analytics/page.tsx';
import ClientsPage from './clients/page.tsx';
import ProductIdPage from './product-list/product-id/ProductIdPage.tsx';

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
                        <Route
                            path={'/products-list/:id'}
                            element={<ProductIdPage />}
                        />
                        <Route
                            path={'/create-product'}
                            element={<CreateProductPage />}
                        />
                        <Route
                            path={'/analytics'}
                            element={<AnalyticsPage />}
                        />
                        <Route path={'/clients'} element={<ClientsPage />} />
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
