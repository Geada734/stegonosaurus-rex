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

function App() {
 const appCtx = useContext(AppContext);

 // Necessary setups for application.
 useEffect(() => {
  // Gets the language from the local storage.
  const lang = localStorage.getItem("stegoLang");

  // If there is one, sets it, if not, it defaults to english.
  if (lang) appCtx.changeLanguage(lang);
 }, []);

  return (
   <main>
    <Layout>
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
}

export default App;
