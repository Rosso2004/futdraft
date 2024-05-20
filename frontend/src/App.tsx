import {Routes, Route, useLocation} from 'react-router-dom';
import {ReactNode, useEffect} from 'react';
import CmpLayout from "./components/layout/CmpLayout.tsx";
import { useGlobalState } from "./global/GlobalStateContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ConfigNavigation} from "./components/layout/ConfigNavigation.tsx";
import useTokenCheck from "./utility/useTokenCheck.tsx";

interface ProtectedRouteProps {
    element: ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    useTokenCheck();
    return element;
};

function App() {
    const { setTitlePage } = useGlobalState();
    const location = useLocation();

    useEffect(() => {
        const currentRoute = ConfigNavigation.find(route => route.path === location.pathname);
        const title = currentRoute ? currentRoute.title : 'Dashboard';
        setTitlePage(title);
    }, [location.pathname, setTitlePage]);

    return (
        <CmpLayout title={ConfigNavigation.find(route => route.path === location.pathname)?.title || 'Dashboard'} maxWidth={"xl"}>
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
