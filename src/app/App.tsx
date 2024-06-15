import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/page.tsx';
import AppBarMenu from '../components/layout/nav/app-bar.tsx';
import { useContext } from 'react';
import { AuthContext } from '../lib/providers/auth-provider.tsx';
import NotAuthPage from './not-auth/page.tsx';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

function App() {
    const { isLoggedIn } = useContext(AuthContext);
    const notify = () => toast('Wow so easy !');

    return (
        <div className={'App'}>
            <AppBarMenu />
            <Button onClick={notify}>Notify !</Button>
            <Routes>
                {isLoggedIn ? (
                    <Route path={'/'} element={<HomePage />} />
                ) : (
                    <Route path={'/'} element={<NotAuthPage />} />
                )}
            </Routes>
        </div>
    );
}

export default App;
