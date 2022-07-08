import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Carrinho extends Component {
  renderProds = () => {
    const { itens } = this.props;
    return itens.map((produto) => (
      <div
        className=""
        key={ produto.id }
      >
        <h1 data-testid="shopping-cart-product-name">{produto.title}</h1>
        <h2>{produto.price}</h2>
        <p data-testid="shopping-cart-product-quantity">1</p>
      </div>
    ));
  }

  renderMessage = () => (
    <div
      data-testid="shopping-cart-empty-message"
    >
      Seu carrinho está vazio
    </div>
  )

  render() {
    const { itens } = this.props;
    return (
      <div>
        { !itens ? this.renderMessage() : this.renderProds() }
      </div>
    );
  }
}

Carrinho.propTypes = {
  itens: PropTypes.array,
}.isRequired;

export default Carrinho;
