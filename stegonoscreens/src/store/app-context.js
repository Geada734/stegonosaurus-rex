import { createContext, useState } from 'react';

const AppContext = createContext({
    language: 'en',
    changeLanguage: (lang) => {},
    error: null,
    raiseError: (error) => {},
    showError: false,
    setShowError: (flag) => {},
    loadingText: '',
    setLoadingText: (text) => {},
    showLoading: false,
    setShowLoading: (flag) => {},
    result: '',
    showResult: (flag) => {},
    token: '',
    setToken: (token) => token 
});

export function AppContextProvider(props){
    const [userLanguage, setUserLanguage] = useState('en');
    const [raisedError, setRaisedError] = useState(null);
    const [showedError, setShowedError] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [result, setResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [token, setToken] = useState('');

    function changeLanguageHandler(lang){
        setUserLanguage(lang);
    };

    function raiseErrorHandler(err) {
        setRaisedError(err);
    };

    function showErrorHandler(flag) {
        setShowedError(flag);
    };

    function setLoadingTextHandler(text) {
        setLoadingText(text);
    };

    function setShowLoadingHandler(flag) {
        setShowLoading(flag);
    };

    function setResultHandler(result) {
        setResult(result);
    };

    function setShowResultHandler(flag) {
        setShowResult(flag);
    };
    
    function setTokenHandler(token) {
        setToken(token);
    };

    const context = {
        language: userLanguage,
        changeLanguage: changeLanguageHandler,
        error: raisedError,
        raiseError: raiseErrorHandler,
        showError: showedError,
        setShowError: showErrorHandler,
        loadingText: loadingText,
        setLoadingText: setLoadingTextHandler,
        showLoading: showLoading,
        setShowLoading: setShowLoadingHandler,
        result: result,
        setResult: setResultHandler,
        showResult: showResult,
        setShowResult: setShowResultHandler,
        token: token,
        setToken: setTokenHandler

    };

    return <AppContext.Provider value={context}>
        {props.children}
    </AppContext.Provider>
};

export default AppContext;