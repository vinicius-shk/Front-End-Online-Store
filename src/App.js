import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import Produto from './pages/Produto';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/produto/:id" component={ Produto } />
          <Route path="/carrinho" component={ Carrinho } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
