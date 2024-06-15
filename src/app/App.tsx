import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/page.tsx';
import ToastMessage from '../components/layout/common/ui/alerts/toast-message/ToastMessage.tsx';
import AppBarMenu from '../components/layout/nav/app-bar.tsx';

function App() {
    return (
        <div className={'App'}>
            <AppBarMenu />
            sdf
            <Routes>
                <Route path={'/'} element={<HomePage />} />
            </Routes>
            <ToastMessage />
        </div>
    );
}

export default App;
