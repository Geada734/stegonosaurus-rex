import { Route, Routes } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import classes from "./App.css";

import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorModal from "./components/modals/ErrorModal";
import LoadingModal from "./components/modals/LoadingModal";
import ResultModal from "./components/modals/ResultModal";

import AppContext from "./store/app-context";
import * as api from "./apis/appApi.js";
import errors from "./static/errors";
import strings from "./static/strings.js";

function App() {
  const appCtx = useContext(AppContext);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    appCtx.popLoading(strings.loadingModal.loadingApp[appCtx.language]);
    api.getToken(handleToken, handleError);
    const lang = localStorage.getItem("stegoLang");
    if (lang) appCtx.changeLanguage(lang);
  }, []);

  function handleToken(token) {
    appCtx.setToken(token);
    setReady(true);
    appCtx.popLoading("");
  }

  function handleError(e) {
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
        <LoadingModal />
        <ErrorModal />
        <ResultModal />
      </main>
    );
  } else {
    return (
      <main>
        <LoadingModal />
        <ErrorModal />
      </main>
    );
  }
}

export default App;
