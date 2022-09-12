import { Route, Routes } from 'react-router-dom';

import './App.css';

import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';

import navData from './static/navItems.json'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/about' element={<AboutPage />}/>
        <Route path='/faq' element={<FAQPage />}/>
      </Routes>
    </Layout>
  );
}

export default App;
