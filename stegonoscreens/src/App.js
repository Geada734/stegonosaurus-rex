import { Route, Routes } from 'react-router-dom';

import classes from './App.css';

import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorModal from './components/ErrorModal';
import LoadingModal from './components/LoadingModal';
import ResultModal from './components/ResultModal';

function App() {

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

export default App;
