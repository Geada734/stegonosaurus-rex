import { createContext, useState } from 'react';

const AppContext = createContext({
    language: 'en',
    changeLanguage: (lang) => {},
    error: null,
    raiseError: (error) => {} 
});

export function AppContextProvider(props){
    const [userLanguage, setUserLanguage] = useState('en');
    const [raisedError, setRaisedError] = useState(null);

    function changeLanguageHandler(lang){
        setUserLanguage(lang);
    };

    function raiseErrorHandler(err) {
        setRaisedError(err);
    };

    const context = {
        language: userLanguage,
        changeLanguage: changeLanguageHandler,
        error: raisedError,
        raiseError: raiseErrorHandler
    };

    return <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
};

export default AppContext;