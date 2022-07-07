import React, { Component } from 'react';
import Categorias from '../components/Categorias';

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <Categorias />
      </div>
    );
  }
}

export default Home;
