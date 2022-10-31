import {useState, useContext} from 'react';
import { Route, Routes } from 'react-router-dom';

import classes from './App.css';
import strings from './static/strings';

import AppContext from './store/app-context';

import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorModal from './components/ErrorModal';
import LoadingModal from './components/LoadingModal';
import ImageDisplayModal from './components/ImageDisplayModal';

function App() {
  const appCtx = useContext(AppContext);

  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);

  function closeErrorModal(){
    setShowError(false);
    setError(null);
  };

  return (<main>
      <Layout className={classes.app}>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <LoadingModal showModal={showLoading} title={strings.loadingModal.loadingFAQs[appCtx.language]}/>
      <ErrorModal error={error} showModal={showError} closeHandler={setShowError}></ErrorModal>
    </main>
  );
}

export default App;
