import React, { useContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home/page';
import ProductListPage from './product-list/page';
import ProductIdPage from './product-list/product-id/ProductIdPage';
import CreatePage from './create-product/page';
import AnalyticsPage from './analytics/page';
import ClientsPage from './clients/page';
import NotAuthPage from './not-auth/page';
import PendingPage from './pending/page';
import { AuthContext } from '../providers/AuthProvider';
import AppBarMenu from '../components/layout/nav/AppBar';
import SideBar from '../components/layout/nav/side-bar/SideBar';
import { CategoriesProvider } from '../providers/CategoriesProvider';
import CategoryMenuPage from './create-product/category-menu/page';
import CreateProductPage from './create-product/product/page';
import CreateCategoriesPage from './create-product/category-menu/create-categories/page';
import EditCategoriesPage from './create-product/category-menu/edit-categories/page';

function App() {
    const { isLoggedIn, isPending } = useContext(AuthContext);

    if (isPending) {
        return <PendingPage />;
    }

    return (
        <CategoriesProvider>
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
                        <Route path={'/create'} element={<CreatePage />} />
                        <Route
                            path={'/create/category-menu'}
                            element={<CategoryMenuPage />}
                        />
                        <Route
                            path={'/create/category-menu/create-categories'}
                            element={<CreateCategoriesPage />}
                        />
                        <Route
                            path={'/create/category-menu/edit-categories'}
                            element={<EditCategoriesPage />}
                        />
                        <Route
                            path={'/create/product'}
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
        </CategoriesProvider>
    );
}

export default App;
