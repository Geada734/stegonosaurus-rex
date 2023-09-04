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
import DisclaimerModal from "./components/modals/DisclaimerModal";

import constants from "./static/constants";

function App() {
 const appCtx = useContext(AppContext);

 // Necessary setups for application.
 useEffect(() => {
  // Gets the local app data.
  const lang = localStorage.getItem(constants.localValues.language);
  const acknowledgement = localStorage.getItem(
   constants.localValues.acknowledged
  );

  // If there is one, sets it, if not, it defaults to english.
  if (lang) appCtx.changeLanguage(lang);
  if (!acknowledgement) appCtx.popDisclaimer(true);
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
   <DisclaimerModal id="disclaimer-modal" />
  </main>
 );
}

export default App;
