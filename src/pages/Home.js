import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../components/Categorias';

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho de Compras</Link>
        <Categorias />
      </div>
    );
  }
}

export default Home;
