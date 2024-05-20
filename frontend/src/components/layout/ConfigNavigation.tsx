import { Home, School } from '@mui/icons-material';
import PageDashboard from "../../pages/PageDashboard.tsx";
import PageCourse from "../../pages/PageCourse.tsx";
import PageLogin from "../../pages/PageLogin.tsx";


export const ConfigNavigation = [
    {
        title: 'Dashboard',
        icon: Home,
        path: '/dashboard',
        element: <PageDashboard/>,
        tokenCheck: true
    },
    {
        title: 'Corsi',
        icon: School,
        path: '/course',
        element: <PageCourse/>,
        tokenCheck: true
    },

    {
        path: '/',
        element: <PageLogin/>,
        title: '',
        tokenCheck: false
    }
];
