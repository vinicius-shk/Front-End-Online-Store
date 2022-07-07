import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho de Compras</Link>
        Digite algum termo de pesquisa ou escolha uma categoria.
      </div>
    );
  }
}

export default Home;
