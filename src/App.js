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
            render={ () => <Carrinho itens={ itens } /> }
          />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
