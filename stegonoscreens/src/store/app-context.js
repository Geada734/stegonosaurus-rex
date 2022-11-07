import { createContext, useState } from 'react';

const AppContext = createContext({
    language: 'en',
    changeLanguage: (lang) => {},
    error: null,
    raiseError: (error) => {},
    showError: false,
    setShowError: (flag) => {} 
});

export function AppContextProvider(props){
    const [userLanguage, setUserLanguage] = useState('en');
    const [raisedError, setRaisedError] = useState(null);
    const [showedError, setShowedError] = useState(false);

    function changeLanguageHandler(lang){
        setUserLanguage(lang);
    };

    function raiseErrorHandler(err) {
        setRaisedError(err);
    };

    function showErrorHandler(flag) {
        setShowedError(flag);
    };

    const context = {
        language: userLanguage,
        changeLanguage: changeLanguageHandler,
        error: raisedError,
        raiseError: raiseErrorHandler,
        showError: showedError,
        setShowError: showErrorHandler
    };

    return <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
};

export default AppContext;