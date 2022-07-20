import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsByID } from '../services/api';
import Evaluation from '../components/Evaluation';

export default class Produto extends Component {
  constructor() {
    super();
    this.state = {
      produto: undefined,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { match: { params: { id } } } = this.props;
    const res = await getProductsByID(id);
    this.setState({ produto: res });
  }

  renderProd = () => {
    const { produto } = this.state;
    const { itens } = this.props;

    return (
      <div className="border-2 border-[#0000001a] w-[80%] margin-auto p-4 rounded-2xl">
        <h1 data-testid="product-detail-name">{produto.title}</h1>
        <img className="m-auto p-3" src={ produto.thumbnail } alt="" />
        <div className="flex justify-between">
          <h2 className="text-[#00a650]">
            R$
            {produto.price}

          </h2>
          <p data-testid="shopping-cart-size">
            Itens no Cart:
            {itens ? itens.length : 0 }
          </p>
        </div>
        <div className="flex flex-col gap-[10px] pt-[20px]">
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addOnItens }
            className="button p-[5px]"
          >
            Adicionar Ao Carrinho

          </button>
          <Link to="/carrinho" className="m-auto">
            <button
              data-testid="shopping-cart-button"
              type="button"
              className=" rounded-[10px] text-black p-[3px] bg-[#ebebeb]"
            >
              Ver Carrinho

            </button>
          </Link>
        </div>
      </div>
    );
  }

  addOnItens = () => {
    const { produto } = this.state;
    const { setItem, itens } = this.props;
    setItem([...itens, produto]);
  }

  render() {
    const { produto } = this.state;
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
          <div className="relative mr-[50px]" />
        </header>
        <div className="bg-white rounded flex flex-col align-middle items-center pt-9">
          {produto && this.renderProd()}
          <Evaluation />
        </div>
      </>
    );
  }
}

Produto.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
