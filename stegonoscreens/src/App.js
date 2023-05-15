import { Route, Routes } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import classes from './App.css';

import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorModal from './components/ErrorModal';
import LoadingModal from './components/LoadingModal';
import ResultModal from './components/ResultModal';

import AppContext from './store/app-context';
import * as api from './apis/appApi.js';
import errors from './static/errors';
import strings from './static/strings.js';

function App() {
  const appCtx = useContext(AppContext);
  const [ready, setReady] = useState(false);

  useEffect(()=> {
    appCtx.setShowLoading(true);
    appCtx.setLoadingText(strings.loadingModal.loadingApp[appCtx.language]);
    api.getToken(setToken, raiseError);
  }, [])

  function setToken(token) {
    appCtx.setToken(token);
    setReady(true);
    appCtx.setShowLoading(false);
  };

  function raiseError(e) {
    appCtx.raiseError(errors['serverDown']);
    appCtx.setShowError(true);
  };

  if(ready){
    return (<main>
        <Layout className={classes.app}>
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/faq' element={<FAQPage />} />
              <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Layout>
        <LoadingModal />
        <ErrorModal />
        <ResultModal />
      </main>
    );
  }

  else{
    return <main>
      <LoadingModal />
      <ErrorModal />
    </main>
  };
}

export default App;
