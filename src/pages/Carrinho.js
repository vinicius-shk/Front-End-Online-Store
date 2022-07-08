import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Carrinho extends Component {
  renderNullProduto = () => (
    <div
      data-testid="shopping-cart-empty-message"
    >
      Seu carrinho está vazio
    </div>)

    renderProds = () => {
      const { itens } = this.props;
      return itens.map((prod) => (
        <div className="" key={ prod.id }>
          <p data-testid="shopping-cart-product-name">{prod.title}</p>
          <p>{prod.price}</p>
          <p data-testid="shopping-cart-product-quantity">1</p>
        </div>
      ));
    }

    render() {
      const { itens } = this.props;
      return (
        <div className="">
          {itens.length === 0 && this.renderNullProduto()}
          {itens.length > 0 && this.renderProds()}
        </div>
      );
    }
}

export default Carrinho;

Carrinho.propTypes = {
  itens: PropTypes.array,
}.isRequired;
