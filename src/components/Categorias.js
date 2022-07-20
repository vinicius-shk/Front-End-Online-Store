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
    const { onClick, open } = this.props;
    return (
      <div
        className={ ` ${open ? ' absolute  w-[100vw]'
          : 'hidden'} 
            md:absolute 
            md:flex top-0 
            mt-[110px] 
            bg-verde 
            md:border-r-2 
            md:border-x-black 
            md:border-b-2
            md:border-y-black 
            md:p-4` }
      >
        <label
          htmlFor="categoria"
          className="flex flex-col gap-5 items-center md:items-start text-white pt-5 pb-5"
        >
          {listaCategorias.map((item) => (
            <div key={ item.id }>

              <input
                data-testid="category"
                type="radio"
                id={ item.id }
                name="categoria"
                onClick={ onClick }
                className="mr-2"
              />
              {item.name}
            </div>
          ))}
        </label>
      </div>
    );
  }
}

Categorias.propTypes = {
  onClick: PropTypes.func,
}.isRequired;

export default Categorias;
