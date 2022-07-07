import React from 'react';
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
    return (
      <nav>
        {listaCategorias.map((item) => (
          <label data-testid="category" htmlFor="categoria" key={ item.id }>
            {item.name}
            <input type="radio" id="categoria" name="item.name" />
          </label>
        ))}
      </nav>
    );
  }
}

export default Categorias;
