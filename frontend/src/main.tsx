import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import { GlobalStateProvider } from './global/GlobalStateContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <GlobalStateProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </GlobalStateProvider>
    // </React.StrictMode>,
)
