import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/page.tsx';
import AppBarMenu from '../components/layout/nav/app-bar.tsx';
import { useContext } from 'react';
import { AuthContext } from '../lib/providers/auth-provider.tsx';
import NotAuth from './not-auth/page.tsx';

function App() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className={'App'}>
            <AppBarMenu />
            <Routes>
                {isLoggedIn ? (
                    <Route path={'/'} element={<HomePage />} />
                ) : (
                    <Route path={'/'} element={<NotAuth />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
