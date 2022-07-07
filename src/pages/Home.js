import React, { Component } from 'react';
import { getProductsByName } from '../services/api';

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

  renderHomeMessage = () => (
    <div data-testid="home-initial-message">
      Digite algum termo de pesquisa ou escolha uma categoria.
    </div>)

  renderProds = () => {
    const { produtos } = this.state;
    return produtos.map((produto) => (
      <div className="" data-testid="product" key={ produto.id }>
        <h1>{produto.title}</h1>
        <h2>{produto.price}</h2>
        <img src={ produto.thumbnail } alt="" />
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
      </>
    );
  }
}

export default Home;
