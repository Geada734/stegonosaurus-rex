import { createContext, useState } from 'react';

const AppContext = createContext({
    language: 'en',
    changeLanguage: (lang) => {}
});

export function AppContextProvider(props){
    const [userLanguage, setUserLanguage] = useState('en');

    function changeLanguageHandler(lang){
        setUserLanguage(lang);
    };

    const context = {
        language: userLanguage,
        changeLanguage: changeLanguageHandler
    };

    return <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
};

export default AppContext;