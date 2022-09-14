import { Route, Routes } from 'react-router-dom';

import classes from './App.css';

import Layout from './layout/Layout';

import navItems from './static/strings.js'

function App() {
  return (
    <Layout className={classes.app}>
      <Routes>
        {navItems.map(navItem => 
          <Route path={navItem.path} key={navItem.key} 
          element={navItem.element}/>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
