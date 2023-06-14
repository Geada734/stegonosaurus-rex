import { createContext, useState } from "react";

const AppContext = createContext({
  language: "en",
  changeLanguage: (lang) => {},
  error: null,
  raiseError: (error) => {},
  showError: false,
  loadingText: "",
  popLoading: (text) => {},
  showLoading: false,
  result: "",
  popResult: (result) => {},
  showResult: false,
  token: "",
  setToken: (token) => token,
});

export function AppContextProvider(props) {
  const [userLanguage, setUserLanguage] = useState("en");
  const [raisedError, setRaisedError] = useState(null);
  const [showedError, setShowedError] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showedLoading, setShowedLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showedResult, setShowedResult] = useState(false);
  const [token, setToken] = useState("");

  function changeLanguageHandler(lang) {
    setUserLanguage(lang);
  }

  function raiseErrorHandler(err) {
    setRaisedError(err);
    if (err) setShowedError(true);
    else setShowedError(false);
  }

  function popLoadingHandler(text) {
    setLoadingText(text);
    if (text && text.trim() !== "") setShowedLoading(true);
    else setShowedLoading(false);
  }

  function popResultHandler(result) {
    setResult(result);
    if (result && result.trim() !== "") setShowedResult(true);
    else setShowedResult(false);
  }

  function setTokenHandler(token) {
    setToken(token);
  }

  const context = {
    language: userLanguage,
    changeLanguage: changeLanguageHandler,
    error: raisedError,
    raiseError: raiseErrorHandler,
    showError: showedError,
    loadingText: loadingText,
    popLoading: popLoadingHandler,
    showLoading: showedLoading,
    result: result,
    popResult: popResultHandler,
    showResult: showedResult,
    token: token,
    setToken: setTokenHandler,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContext;
