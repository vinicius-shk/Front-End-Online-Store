import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          <p>Preencha com suas informações: </p>
          <form>
            <label htmlFor="fullname">
              Nome
              <input
                onChange={ this.handleChange }
                value={ fullname }
                type="text"
                name="fullname"
                data-testid="checkout-fullname"
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
              />
            </label>
          </form>
        </fieldset>
      </div>
    );
  };

  renderPayment = () => (
    <div>
      <fieldset>
        <p>Método de Pagamento: </p>
        <form>
          <label htmlFor="paymentMethod">
            Cartão de crédito
            <input type="radio" name="paymentMethod" />
          </label>
          <label htmlFor="paymentMethod">
            Cartão de débito
            <input type="radio" name="paymentMethod" />
          </label>
          <label htmlFor="paymentMethod">
            Boleto
            <input type="radio" name="paymentMethod" />
          </label>
        </form>
      </fieldset>
    </div>
  )

  renderProds = () => {
    const { itens } = this.props;
    return itens.map((prod) => (
      <div className="" key={ prod.id }>
        <img src={ prod.thumbnail } alt={ prod.title } />
        <span>{prod.title}</span>
        { ' ' }
        <span>
          R$:
          { prod.price }
        </span>
      </div>
    ));
  }

  render() {
    const { total, loading } = this.state;
    return (
      <div>
        {this.renderProds()}
        {!loading && <p>{`Total: ${total}`}</p>}
        {this.renderForms()}
        {this.renderPayment()}
        <button type="button">Comprar</button>
      </div>
    );
  }
}

export default Checkout;

Checkout.propTypes = {
  itens: PropTypes.array,
}.isRequired;
