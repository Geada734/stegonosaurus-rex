// Context for the application.
import { createContext, useState } from "react";

const AppContext = createContext({
  token: "",
  setToken: (token) => token,
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
});

export function AppContextProvider(props) {
  const [token, setToken] = useState("");
  const [userLanguage, setUserLanguage] = useState("en");
  // Error info and trigger for the error modal.
  const [raisedError, setRaisedError] = useState(null);
  const [showedError, setShowedError] = useState(false);
  // Loading message and trigger for the loading modal.
  const [loadingText, setLoadingText] = useState("");
  const [showedLoading, setShowedLoading] = useState(false);
  // Result and trigger for the result modal.
  const [result, setResult] = useState("");
  const [showedResult, setShowedResult] = useState(false);

  function setTokenHandler(token) {
    setToken(token);
  }

  function changeLanguageHandler(lang) {
    setUserLanguage(lang);
  }

  // Error is set and shown in one function.
  function raiseErrorHandler(err) {
    /*
     * err: error info.
     */
    setRaisedError(err);
    if (err) setShowedError(true);
    else setShowedError(false);
  }

  // Loading is set and shown in one function.
  function popLoadingHandler(text) {
    /*
     * text: text to be displayed as the modal's header.
     */
    setLoadingText(text);
    if (text && text.trim() !== "") setShowedLoading(true);
    else setShowedLoading(false);
  }

  // Results are set and shown in one function.
  function popResultHandler(result) {
    /*
     * result: resulting image.
     */
    setResult(result);
    if (result && result.trim() !== "") setShowedResult(true);
    else setShowedResult(false);
  }

  const context = {
    token: token,
    setToken: setTokenHandler,
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
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContext;
