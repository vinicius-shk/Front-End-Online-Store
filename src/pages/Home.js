import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsByCategory, getProductsByName } from '../services/api';
import Categorias from '../components/Categorias';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      produtos: undefined,
      nomeProdPesquisa: '',
    };
  }

  getProducts = async () => {
    const { nomeProdPesquisa } = this.state;
    const data = await getProductsByName(nomeProdPesquisa);
    this.setState({
      produtos: data.results,
    });
  }

  handleBtnClick = () => {
    this.getProducts();
  }

  handleCartClick = (produto) => {
    const { setItem, itens } = this.props;
    setItem([...itens, produto]);
  };

  handleRadioClick = async ({ target }) => {
    const { results } = await getProductsByCategory(target.id);
    this.setState({ produtos: results });
  }

  renderHomeMessage = () => (
    <div data-testid="home-initial-message">
      Digite algum termo de pesquisa ou escolha uma categoria.
    </div>)

  renderProds = () => {
    const { produtos } = this.state;
    return produtos.map((produto) => (
      <div
        className=""
        data-testid="product"
        key={ produto.id }
      >
        <Link
          to={ `/produto/${produto.id}` }
          data-testid="product-detail-link"
        >
          <h1>{produto.title}</h1>
          <h2>{produto.price}</h2>
          <img src={ produto.thumbnail } alt="" />
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => this.handleCartClick(produto) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    ));
  }

  renderNenhumEncotrado = () => <p>Nenhum produto foi encontrado</p>

  render() {
    const { produtos, nomeProdPesquisa } = this.state;
    return (
      <>
        <input
          type="text"
          data-testid="query-input"
          onChange={ (e) => this.setState({ nomeProdPesquisa: e.target.value }) }
        />
        <button
          data-testid="query-button"
          value={ nomeProdPesquisa }
          type="button"
          onClick={ this.handleBtnClick }
        >
          Pesquisar

        </button>
        {produtos === undefined && this.renderHomeMessage()}
        {produtos && this.renderProds()}
        {(Array.isArray(produtos) && produtos.length === 0)
        && this.renderNenhumEncotrado()}
        <Categorias onClick={ this.handleRadioClick } />
        <Link to="/carrinho" data-testid="shopping-cart-button">
          Carrinho de Compras
        </Link>
      </>

    );
  }
}

Home.propTypes = {
  setItem: PropTypes.func,
  itens: PropTypes.array,
}.isRequired;

export default Home;
