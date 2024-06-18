import React, {useContext} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./home/page";
import ProductListPage from "./product-list/page";
import ProductIdPage from "./product-list/product-id/ProductIdPage";
import CreateProductPage from "./create-product/page";
import AnalyticsPage from "./analytics/page";
import ClientsPage from "./clients/page";
import NotAuthPage from "./not-auth/page";
import PendingPage from './pending/page';
import {AuthContext} from "../utils/providers/AuthProvider";
import AppBarMenu from "../components/pages/layout/nav/AppBar";
import SideBar from "../components/pages/layout/nav/side-bar/SideBar";

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
