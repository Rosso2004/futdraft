import {Routes, Route, useLocation} from 'react-router-dom';
import {ReactNode, useEffect, useState} from 'react';
import CmpLayout from "./components/layout/CmpLayout.tsx";
import { useGlobalState } from "./global/GlobalStateContext.tsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ConfigNavigation} from "./components/layout/ConfigNavigation.tsx";
import useTokenCheck from "./utility/useTokenCheck.tsx";
import axios from "axios";

interface ProtectedRouteProps {
    element: ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    useTokenCheck();
    return element;
};

function App() {
    const { setTitlePage, isVerified } = useGlobalState();
    const location = useLocation();
    const [avatarData, setAvatarData] = useState('');

    useEffect(() => {
        const currentRoute = ConfigNavigation.find(route => route.path === location.pathname);
        const title = currentRoute ? currentRoute.title : 'Dashboard';
        setTitlePage(title);
        if (isVerified) {
            axios.get(import.meta.env.VITE_URL_WEB_API + '/api/user/getUser', { withCredentials: true })
                .then(response => {
                    setAvatarData(response.data.firstname[0]);
                })
                .catch(error => {
                    toast.error(error.response.message);
                });
        }
    }, [isVerified, location.pathname, setTitlePage]);

    return (
        <CmpLayout title={ConfigNavigation.find(route => route.path === location.pathname)?.title || 'Dashboard'} maxWidth={"xl"} avatarData={avatarData}>
            <Routes>
                {ConfigNavigation.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.tokenCheck ? <ProtectedRoute element={route.element} /> : route.element}
                    />
                ))}
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={6000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="text-left"
            />
        </CmpLayout>
    );
}

export default App;
