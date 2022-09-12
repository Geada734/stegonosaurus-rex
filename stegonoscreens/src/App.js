import { Route, Routes } from 'react-router-dom';

import './App.css';

import Layout from './layout/Layout';

import navItems from './static/navItems'

function App() {
  return (
    <Layout>
      <Routes>
        {navItems.map(navItem => 
          <Route path={navItem.path} element={navItem.element}/>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
