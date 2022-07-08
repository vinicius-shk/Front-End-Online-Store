import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import Produto from './pages/Produto';
import Home from './pages/Home';

function App() {
  const [itens, setItem] = useState([]);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/produto/:id" component={ Produto } />
          <Route
            path="/carrinho"
            render={ (props) => <Carrinho { ...props } itens={ itens } /> }
          />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home { ...props } setItem={ setItem } itens={ itens } />) }
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
