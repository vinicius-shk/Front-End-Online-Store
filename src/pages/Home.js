/* eslint-disable react/jsx-closing-tag-location */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../components/Categorias';
import './home.scss';
import { getProductsByCategory, getProductsByName } from '../services/api';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      produtos: undefined,
      nomeProdPesquisa: '',
      open: false,
      loading: false,
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

  handleRadioClick = async ({ target }) => {
    this.setState({ open: false, loading: true });
    const { results } = await getProductsByCategory(target.id);
    this.setState({ loading: false });
    this.setState({ produtos: results });
  }

  handleCartClick = (produto) => {
    const { setItem, itens } = this.props;
    setItem([...itens, produto]);
  };

  renderHomeMessage = () => (
    <div data-testid="home-initial-message" className="text-center p-4 md:ml-[250px]">
      Digite algum termo de pesquisa ou escolha uma categoria no menu.
    </div>)

  renderProds = () => {
    const { produtos } = this.state;
    return produtos.map((produto) => (
      <div
        className="bg-white
        items-center flex flex-col w-[80%] m-auto p-5 rounded md:w-[15%] "
        key={ produto.id }
      >
        <Link
          to={ `/produto/${produto.id}` }
          data-testid="product-detail-link"
        >
          <div className="flex flex-col items-center p-4 text-center ">

            <img src={ produto.thumbnail } alt="" />
            <div className="">
              <h1
                className="text-ellipsis w-[100px] h-[100px] overflow-hidden "
              >
                {produto.title}
              </h1>
            </div>
            <h2 className="font-light text-2xl text-[#333]">
              R$
              {produto.price}
            </h2>
            { produto.shipping.free_shipping
          && <h1 className="text-[#00a650]">Frete grátis</h1> }

          </div>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          className="button w-[150px] h-[50px] md:w-[100px] md:h-[50px]"
          onClick={ () => this.handleCartClick(produto) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    ));
  }

  renderNenhumEncotrado = () => <p>Nenhum produto foi encontrado.</p>

  renderLoading = () => (<div className="text-center p-4 md:ml-[250px]">
    <p>Carregando...</p>
  </div>)

  render() {
    const { produtos, nomeProdPesquisa, open, loading } = this.state;
    const { itens } = this.props;
    return (
      <>
        <header
          className="bg-verde flex w-[100vw] h-[110px] px-3 items-center justify-between
            md:px-8 md:w-auto"
        >
          <div className="w-[80px]">
            <img src="/images/logo-negative-green.svg" alt="" />
          </div>
          <div className="relative mr-[50px]">
            <Link
              to="/carrinho"
              className="text-3xl font-bold underline"
              data-testid="shopping-cart-button"
            >
              <img src="/images/shopping-cart.png" className="w-[40px]" alt="" />
            </Link>
            <p
              data-testid="shopping-cart-size "
              className="absolute
              bg-[#003be5]
              text-white p-1 rounded-lg mt-[-20px] right-0"
            >
              {itens ? itens.length : 0 }
            </p>
          </div>

          <div
            className={ `menu btn1 ${open && 'open'} md:hidden` }
            onClick={ () => this.setState({ open: !open }) }
            onKeyPress={ () => this.setState({ open: !open }) }
            tabIndex="0"
            role="button"
            data-menu="1"
          >
            <div className="icon-left" />
            <div className="icon-right" />
          </div>

        </header>
        <div className="flex flex-col p-7 items-center md:ml-[250px]">
          <input
            type="text"
            data-testid="query-input"
            onChange={ (e) => this.setState({ nomeProdPesquisa: e.target.value }) }
            className="input w-[100%] md:w-[60%]"
          />
          <button
            data-testid="query-button"
            value={ nomeProdPesquisa }
            type="button"
            onClick={ this.handleBtnClick }
            className="button w-[100px] h-[50px] m-['auto']"
          >
            Pesquisar

          </button>
        </div>

        {produtos === undefined && !loading && this.renderHomeMessage()}
        {produtos
        && <div
          className="flex flex-col gap-5 md:ml-[250px]
          md:flex-row md:flex-wrap p-7"
        >
          {this.renderProds()}
        </div>}
        {loading && this.renderLoading()}
        {(Array.isArray(produtos) && produtos.length === 0)
        && this.renderNenhumEncotrado()}
        <Categorias onClick={ this.handleRadioClick } open={ open } />

      </>

    );
  }
}

export default Home;

Home.propTypes = {
  setItem: PropTypes.func,
  itens: PropTypes.array,
}.isRequired;
