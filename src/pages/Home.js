import React, { Component } from 'react';
<<<<<<< HEAD
import Categorias from '../components/Categorias';
=======
import { Link } from 'react-router-dom';
>>>>>>> 8cf1587cfe86f00b3b9068d081654442103252ce

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
<<<<<<< HEAD
        <Categorias />
=======
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho de Compras</Link>
        Digite algum termo de pesquisa ou escolha uma categoria.
>>>>>>> 8cf1587cfe86f00b3b9068d081654442103252ce
      </div>
    );
  }
}

export default Home;
