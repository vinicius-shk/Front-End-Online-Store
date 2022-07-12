import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Carrinho from './pages/Carrinho';
import Produto from './pages/Produto';
import Home from './pages/Home';

function App() {
  const [itens, setItem] = useState(
    JSON.parse(localStorage.getItem('itens')) === null
      ? [] : JSON.parse(localStorage.getItem('itens')),
  );

  useEffect(() => {
    localStorage.setItem('itens', JSON.stringify(itens));
  }, [itens]);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            path="/produto/:id"
            render={ (props) => (<Produto
              setItem={ setItem }
              itens={ itens }
              { ...props }

            />) }
          />

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
