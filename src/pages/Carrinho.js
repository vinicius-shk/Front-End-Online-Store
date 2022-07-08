import React, { Component } from 'react';

class Carrinho extends Component {
  constructor() {
    super();
    this.state = {
      quantidadeCarrinho: 1,
    };
  }

  handleBtnClick = ({ target }) => {
    console.log(target.id);
    if (target.id === '+') {
      this.setState((prevState) => ({
        quantidadeCarrinho: prevState.quantidadeCarrinho + 1,
      }));
    } else {
      this.setState((prevState) => ({
        quantidadeCarrinho: prevState.quantidadeCarrinho - 1,
      }));
    }
  }

  render() {
    const { quantidadeCarrinho } = this.state;
    return (
      <div
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio

        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.handleBtnClick }
          id="+"

        >
          +
        </button>
        <span>{quantidadeCarrinho}</span>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.handleBtnClick }
          id="-"
        >
          -
        </button>

      </div>
    );
  }
}

export default Carrinho;
