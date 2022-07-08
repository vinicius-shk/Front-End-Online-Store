import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categorias extends React.Component {
  state = {
    listaCategorias: [],
  };

  componentDidMount = async () => {
    const listaCategorias = await getCategories();
    this.setState({
      listaCategorias,
    });
  };

  render() {
    const { listaCategorias } = this.state;
    const { onClick } = this.props;
    return (
      <nav>
        <label
          htmlFor="categoria"
        >
          {listaCategorias.map((item) => (
            <div key={ item.id }>
              {item.name}
              <input
                data-testid="category"
                type="radio"
                id={ item.id }
                name="categoria"
                onClick={ onClick }
              />
            </div>
          ))}
        </label>
      </nav>
    );
  }
}

Categorias.propTypes = {
  onClick: PropTypes.func,
}.isRequired;

export default Categorias;
