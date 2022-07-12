import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Carrinho extends Component {
  constructor() {
    super();
    this.state = {
      quantidadeCarrinho: {},
    };
  }

  componentDidMount() {
    this.createStates();
  }

handleBtnClick = ({ target }) => {
  const { id } = target;
  const { quantidadeCarrinho } = this.state;
  if (target.name === '+') {
    const quantidade = quantidadeCarrinho[id] + 1;
    const obj = quantidadeCarrinho;
    obj[id] = quantidade;
    this.setState(() => ({
      quantidadeCarrinho: obj,
    }));
  } else {
    if (quantidadeCarrinho[id] === 1) return;
    const quantidade = quantidadeCarrinho[id] - 1;
    const obj = quantidadeCarrinho;
    obj[id] = quantidade;
    this.setState(() => ({
      quantidadeCarrinho: obj,
    }));
  }
}

createStates = () => {
  const { itens } = this.props;
  // const { quantidadeCarrinho } = this.state;
  const obj = {};
  itens.forEach(({ id }) => {
    obj[id] = 1;
  });
  this.setState({ quantidadeCarrinho: obj });
}

renderNullProduto = () => (
  <div
    data-testid="shopping-cart-empty-message"
  >
    Seu carrinho está vazio
  </div>)

    renderProds = () => {
      const { itens } = this.props;
      const { quantidadeCarrinho } = this.state;
      return itens.map((prod) => (
        <div className="" key={ prod.id }>
          <p data-testid="shopping-cart-product-name">{prod.title}</p>
          <p>{prod.price}</p>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ this.handleBtnClick }
            name="-"
            id={ prod.id }
          >
            -
          </button>

          <span
            data-testid="shopping-cart-product-quantity"
          >
            {quantidadeCarrinho[prod.id]}

          </span>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ this.handleBtnClick }
            name="+"
            id={ prod.id }
          >
            +
          </button>
        </div>
      ));
    }

    render() {
      const { itens } = this.props;
      return (
        <div className="">
          {itens.length === 0 && this.renderNullProduto()}
          {itens.length > 0 && this.renderProds()}
          <Link to="/checkout">
            <button
              data-testid="checkout-products"
              type="button"
            >
              Finalizar compra
            </button>
          </Link>
        </div>
      );
    }
}

export default Carrinho;

Carrinho.propTypes = {
  itens: PropTypes.array,
}.isRequired;
