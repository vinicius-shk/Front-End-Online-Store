import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/carrinho" component={ Carrinho } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
