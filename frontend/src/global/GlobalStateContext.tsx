import { createContext, useContext, useState } from 'react';

interface IGlobalState {
    isVerified: boolean;
    setIsVerified: (value: boolean) => void;
    titlePage: string;
    setTitlePage: (value: string) => void;
}

const GlobalStateContext = createContext<IGlobalState | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
    const [isVerified, setIsVerified] = useState(false);
    const [titlePage, setTitlePage] = useState('Dashboard');

    const state: IGlobalState = {
        isVerified,
        setIsVerified,
        titlePage,
        setTitlePage,
    };

    return <GlobalStateContext.Provider value={state}>{children}</GlobalStateContext.Provider>;
}

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState deve essere utilizzato all\'interno di GlobalStateProvider');
    }
    return context;
}