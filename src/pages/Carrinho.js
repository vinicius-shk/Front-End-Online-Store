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
        <div
          className="w-[80%] md:w-[40%] h-[240px] flex flex-col items-center
            p-4 bg-white"
          key={ prod.id }
        >
          <img src={ prod.thumbnail } alt="" />
          <p data-testid="shopping-cart-product-name">{prod.title}</p>
          <p className="text-[#00a650]">
            R$
            {prod.price}
          </p>
          <div className="flex gap-5 pt-3">
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ this.handleBtnClick }
              name="-"
              id={ prod.id }
              className="bg-[#003be5] w-[20px]
              h-[30px] text-white flex items-center justify-center rounded-lg"
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
              className="bg-[#003be5] w-[20px]
              h-[30px] text-white flex items-center justify-center rounded-lg"
              disabled={ prod.available_quantity <= quantidadeCarrinho[prod.id] }
            >
              +
            </button>
          </div>
        </div>
      ));
    }

    render() {
      const { itens } = this.props;
      return (
        <>
          <header
            className="bg-verde flex w-[100vw] h-[110px] px-3 items-center justify-between
          md:px-8 md:w-auto"
          >
            <div className="w-[40px]">
              <Link to="/">
                <img src="/images/back-button.png" alt="" />
              </Link>
            </div>
            <div className="w-[80px]">
              <img src="/images/logo-negative-green.svg" alt="" />
            </div>
          </header>
          <div className=" flex flex-col gap-[50px] pt-5 pb-5 items-center">
            {itens.length === 0 && this.renderNullProduto()}
            {itens.length > 0 && this.renderProds()}
            <Link to="/checkout">
              <button
                data-testid="checkout-products"
                type="button"
                className="button w-[150px] h-[50px]"
              >
                Finalizar compra
              </button>
            </Link>
          </div>
        </>
      );
    }
}

export default Carrinho;

Carrinho.propTypes = {
  itens: PropTypes.array,
}.isRequired;
