import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AppContext from "./store/app-context";

import * as api from "./apis/appApi";

import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorModal from "./components/modals/ErrorModal";
import LoadingModal from "./components/modals/LoadingModal";
import ResultModal from "./components/modals/ResultModal";

import errors from "./static/errors";
import strings from "./static/strings";

import classes from "./App.css";

function App() {
 const appCtx = useContext(AppContext);
 const [ready, setReady] = useState(false);

 // Necessary setups for application.
 useEffect(() => {
  appCtx.popLoading(strings.loadingModal.loadingApp[appCtx.language]);
  let localToken = localStorage.getItem("stegoToken");

  // Set the session token if there is one in local storage.
  if (localToken) {
   appCtx.setToken(localToken);

   appCtx.popLoading("");
   setReady(true);
  } else {
   // If there is no token in local storage, get another one from the server.
   api.getToken(handleToken, handleError);
  }

  // Gets the language from the local storage.
  const lang = localStorage.getItem("stegoLang");

  // If there is one, sets it, if not, it defaults to english.
  if (lang) appCtx.changeLanguage(lang);
 }, []);

 // Handles the token comming from the server.
 function handleToken(token) {
  /*
   * token: session token.
   */
  appCtx.setToken(token);
  localStorage.setItem("stegoToken", token);

  setReady(true);
  appCtx.popLoading("");
 }

 // Handles REST errors.
 function handleError(e) {
  /*
   * e: error.
   */
  appCtx.popLoading("");
  appCtx.raiseError(errors["serverDown"]);
 }

 if (ready) {
  return (
   <main>
    <Layout className={classes.app}>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="*" element={<NotFoundPage />} />
     </Routes>
    </Layout>
    <LoadingModal id="loading-modal" />
    <ErrorModal id="error-modal" />
    <ResultModal id="result-modal" />
   </main>
  );
 } else {
  return (
   // Modals are present even if the app is not ready to be rendered.
   <main>
    <LoadingModal id="loading-modal" />
    <ErrorModal id="error-modal" />
   </main>
  );
 }
}

export default App;
