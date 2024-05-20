import { Search, Construction, StarRate } from '@mui/icons-material';
import PageSearch from "../../pages/PageSearch.tsx";
import PageSquadBuilder from "../../pages/PageSquadBuilder.tsx";
import PageLogin from "../../pages/PageLogin.tsx";
import PageMyTeams from "../../pages/PageMyTeams.tsx";
import PageSignIn from "../../pages/PageSignIn.tsx";
import PageProfile from "../../pages/PageProfile.tsx";


export const ConfigNavigation = [
    {
        title: 'Ricerca',
        icon: Search,
        path: '/search',
        element: <PageSearch/>,
        tokenCheck: true
    },
    {
        title: 'Squad Builder',
        icon: Construction,
        path: '/squad_builder',
        element: <PageSquadBuilder/>,
        tokenCheck: true
    },
    {
        title: 'My Teams',
        icon: StarRate,
        path: '/myteams',
        element: <PageMyTeams/>,
        tokenCheck: true
    },
    {
        title: 'Profilo',
        path: '/profile',
        element: <PageProfile/>,
        tokenCheck: true
    },

    {
        path: '/',
        element: <PageLogin/>,
        title: '',
        tokenCheck: false
    },
    {
        path: '/signin',
        element: <PageSignIn/>,
        title: '',
        tokenCheck: false
    }
];
