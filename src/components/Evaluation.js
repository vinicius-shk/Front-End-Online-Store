import React, { Component } from 'react';

class Evaluation extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nota: '',
      comment: '',
      evaluations: [],
      storage: undefined,
      loading: true,
    };
  }

componentDidMount = () => {
  this.setState({ storage: JSON.parse(localStorage.getItem('evaluations')) }, () => {
    this.setState({ loading: false });
  });
};

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  handleEval = () => {
    const { evaluations } = this.state;
    return evaluations;
  }

  onSaveButtonClick = (event) => {
    const { evaluations } = this.state;
    const newRating = this.state;
    this.setState({
      email: '',
      nota: '',
      comment: '',
      evaluations: [newRating, ...evaluations],
    }, () => {
      const evaluationList = this.handleEval();
      localStorage.setItem('evaluations', JSON.stringify(evaluationList));
      this.setState({ storage: JSON.parse(localStorage.getItem('evaluations')) });
    });
    event.preventDefault();
  };

  render() {
    const { email, nota, comment, storage, loading } = this.state;
    return (
      <div>
        <div>
          <form>
            <label htmlFor="email">
              Email:
              <input
                data-testid="product-detail-email"
                id="email"
                value={ email }
                type="email"
                name="email"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <label htmlFor="rating">
              <input
                data-testid="1-rating"
                id="nota"
                type="radio"
                value="1"
                name="rating"
                score="1"
                checked={ nota === '1' }
                onChange={ this.handleChange }
              />
              1
            </label>
            <label htmlFor="rating">
              <input
                data-testid="2-rating"
                id="nota"
                type="radio"
                value="2"
                name="rating"
                score="2"
                checked={ nota === '2' }
                onChange={ this.handleChange }
              />
              2
            </label>
            <label htmlFor="rating">
              <input
                data-testid="3-rating"
                id="nota"
                type="radio"
                value="3"
                name="rating"
                score="3"
                checked={ nota === '3' }
                onChange={ this.handleChange }
              />
              3
            </label>
            <label htmlFor="rating">
              <input
                data-testid="4-rating"
                id="nota"
                type="radio"
                value="4"
                name="rating"
                score="4"
                checked={ nota === '4' }
                onChange={ this.handleChange }
              />
              4
            </label>
            <label htmlFor="rating">
              <input
                data-testid="5-rating"
                id="nota"
                type="radio"
                value="5"
                name="rating"
                score="5"
                checked={ nota === '5' }
                onChange={ this.handleChange }
              />
              5
            </label>
            <br />
            <label htmlFor="comment">
              Comentário:
              <input
                data-testid="product-detail-evaluation"
                type="textarea"
                name="comment"
                id="comment"
                value={ comment }
                placeholder="Deixe seu comentário"
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <button
              data-testid="submit-review-btn"
              type="submit"
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>
          </form>
          <p>Esta é uma avaliação sobre o produto realizada na tela de detalhe.</p>
        </div>
        <br />

        <div>
          {storage && !loading
            && storage.map((evaluation) => (
              <div key={ evaluation.email }>
                <p>{evaluation.email}</p>
                <p>{evaluation.nota}</p>
                <p>{evaluation.comment}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Evaluation;
