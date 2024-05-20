import { Search, Construction, StarRate } from '@mui/icons-material';
import PageSearch from "../../pages/PageSearch.tsx";
import PageSquadBuilder from "../../pages/PageSquadBuilder.tsx";
import PageLogin from "../../pages/PageLogin.tsx";
import PageMyTeams from "../../pages/PageMyTeams.tsx";


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
        path: '/',
        element: <PageLogin/>,
        title: '',
        tokenCheck: false
    }
];
