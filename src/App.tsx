import './scss/app.scss';
import React from 'react';
import Header from './Components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import FullPizza from './pages/FullPizza';

const Cart = React.lazy(() => import('./pages/Cart'))

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<React.Suspense fallback={<>Please wait, loading</>} ><Cart/></React.Suspense>} />
            <Route path="pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
