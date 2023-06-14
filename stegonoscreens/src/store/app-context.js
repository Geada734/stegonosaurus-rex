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
  const [showLoading, setShowLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
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
    if (text && text.trim() !== "") setShowLoading(true);
    else setShowLoading(false);
  }

  function popResultHandler(result) {
    setResult(result);
    if (result && result.trim() !== "") setShowResult(true);
    else setShowResult(false);
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
    showLoading: showLoading,
    result: result,
    popResult: popResultHandler,
    showResult: showResult,
    token: token,
    setToken: setTokenHandler,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContext;
