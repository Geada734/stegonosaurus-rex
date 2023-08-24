import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import AppContext from "./store/app-context";

import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorModal from "./components/modals/ErrorModal";
import LoadingModal from "./components/modals/LoadingModal";
import ResultModal from "./components/modals/ResultModal";

import constants from "./static/constants";

function App() {
 const appCtx = useContext(AppContext);

 // Necessary setups for application.
 useEffect(() => {
  // Gets the language from the local storage.
  const lang = localStorage.getItem(constants.localValues.language);

  // If there is one, sets it, if not, it defaults to english.
  if (lang) appCtx.changeLanguage(lang);
 }, []);

  return (
   <main>
    <Layout>
     <Routes>
      <Route path={constants.paths.home} element={<HomePage />} />
      <Route path={constants.paths.about} element={<AboutPage />} />
      <Route path={constants.paths.faq} element={<FAQPage />} />
      <Route path="*" element={<NotFoundPage />} />
     </Routes>
    </Layout>
    <LoadingModal id="loading-modal" />
    <ErrorModal id="error-modal" />
    <ResultModal id="result-modal" />
   </main>
  );
}

export default App;
