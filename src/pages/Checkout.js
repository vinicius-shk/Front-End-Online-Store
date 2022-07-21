/* eslint-disable react/jsx-closing-tag-location */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      loading: true,
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  componentDidMount() {
    const { itens } = this.props;
    itens.forEach(({ price }) => {
      this.setState((prevState) => ({
        total: prevState.total + (price * 100) / 100,
      }));
    });
    this.setState({ loading: false });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  renderForms = () => {
    const { fullname, email, cpf, phone, cep, address } = this.state;
    return (
      <div>
        <fieldset>
          <p className="text-center">Preencha com suas informações: </p>
          <form className="flex flex-col gap-5 mt-8 items-center">
            <label htmlFor="fullname">
              Nome
              <input
                onChange={ this.handleChange }
                value={ fullname }
                type="text"
                name="fullname"
                data-testid="checkout-fullname"
                className="input ml-3"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                onChange={ this.handleChange }
                value={ email }
                type="email"
                name="email"
                data-testid="checkout-email"
                className="input ml-3"
              />
            </label>
            <label htmlFor="cpf">
              CPF
              <input
                onChange={ this.handleChange }
                value={ cpf }
                type="text"
                name="cpf"
                data-testid="checkout-cpf"
                className="input ml-3"
              />
            </label>
            <label htmlFor="phone">
              Telefone
              <input
                onChange={ this.handleChange }
                value={ phone }
                type="text"
                name="phone"
                data-testid="checkout-phone"
                className="input ml-3"
              />
            </label>
            <label htmlFor="cep">
              CEP
              <input
                onChange={ this.handleChange }
                value={ cep }
                type="text"
                name="cep"
                data-testid="checkout-cep"
                className="input ml-3"
              />
            </label>
            <label htmlFor="address">
              Endereço
              <input
                onChange={ this.handleChange }
                value={ address }
                type="text"
                name="address"
                data-testid="checkout-address"
                className="input ml-3"
              />
            </label>
          </form>
        </fieldset>
      </div>
    );
  };

  renderPayment = () => (
    <div className="pt-5">
      <fieldset>
        <p className="text-center">Método de Pagamento: </p>
        <form
          className="flex gap-[10px] flex-col pb-5 md:flex-row md:justify-center
          md:pt-3"
        >
          <label htmlFor="paymentMethod">
            <input type="radio" name="paymentMethod" />
            Cartão de crédito
          </label>
          <label htmlFor="paymentMethod">
            <input type="radio" name="paymentMethod" />
            Cartão de débito
          </label>
          <label htmlFor="paymentMethod">
            <input type="radio" name="paymentMethod" />
            Boleto
          </label>
        </form>
      </fieldset>
    </div>
  )

  renderProds = () => {
    const { itens } = this.props;
    return itens.map((prod) => (
      <div
        className="w-[80%] md:w-[40%] h-[240px] md:h-[330px] flex flex-col items-center
      p-4 bg-white"
        key={ prod.id }
      >
        <img src={ prod.thumbnail } alt={ prod.title } />
        <span className="p-5 text-center">{prod.title}</span>
        { ' ' }
        <span className="text-[#00a650]">
          R$
          { prod.price }
        </span>
      </div>
    ));
  }

  render() {
    const { total, loading } = this.state;
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
        <div className="pt-5 pb-5 md:flex md:flex-row-reverse">
          <div
            className="border-2 border-[#0000001a] w-[60%]
            m-auto p-4 rounded-2xl pb-4 md:mt-[40px]"
          >

            {this.renderForms()}
            {!loading && <p
              className="text-[#00a650] text-xl m-auto justify-center
            flex pt-3"
            >
              {`Total: R$${total}`}
            </p>}
            {this.renderPayment()}
            <button type="button" className="button m-auto p-3 flex">Comprar</button>
          </div>
          <div className="flex flex-col gap-5 pt-10 pb-5 items-center">
            {this.renderProds()}
          </div>
        </div>
      </>
    );
  }
}

export default Checkout;

Checkout.propTypes = {
  itens: PropTypes.array,
}.isRequired;
