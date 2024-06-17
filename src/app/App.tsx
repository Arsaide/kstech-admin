import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/page.tsx';
import { useContext } from 'react';
import { AuthContext } from '../lib/providers/AuthProvider.tsx';
import NotAuth from './not-auth/page.tsx';
import PendingPage from './pending-page/page.tsx';
import AppBarMenu from '../components/layout/nav/AppBar.tsx';
import SideBar from '../components/layout/nav/side-bar/SideBar.tsx';

function App() {
    const { isLoggedIn, isPending } = useContext(AuthContext);

    return (
        <div className={'App'}>
            {isPending ? (
                <PendingPage />
            ) : (
                <>
                    <AppBarMenu />
                    <SideBar>
                        <Routes>
                            {isLoggedIn ? (
                                <Route path={'/'} element={<HomePage />} />
                            ) : (
                                <Route path={'/'} element={<NotAuth />} />
                            )}
                        </Routes>
                    </SideBar>
                </>
            )}
        </div>
    );
}

export default App;
