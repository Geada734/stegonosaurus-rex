import { Route, Routes } from 'react-router-dom';

import classes from './App.css';

import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ErrorModal from './components/ErrorModal';
import LoadingModal from './components/LoadingModal';
import ImageDisplayModal from './components/ImageDisplayModal';

function App() {

  return (<main>
      <Layout className={classes.app}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Layout>
    </main>
  );
}

export default App;
