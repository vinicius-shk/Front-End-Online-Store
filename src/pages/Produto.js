import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsByID } from '../services/api';

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
    return (
      <div className="">
        <h1 data-testid="product-detail-name">{produto.title}</h1>
        <h2>{produto.price}</h2>
        <img src={ produto.thumbnail } alt="" />
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
      <div>
        Produto
        {produto && this.renderProd()}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.addOnItens }
        >
          Adicionar Ao Carrinho

        </button>
        <Link to="/carrinho">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho

          </button>
        </Link>
      </div>
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
