/* eslint-disable react/jsx-max-depth */
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
        <h2 className="text-center pt-3">Avalie</h2>
        <div>
          <form>
            <div className="text-right p-5 flex gap-[5px] justify-end items-center">

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
            </div>
            <div className="flex flex-col gap-4 p-4 items-center">
              <label htmlFor="email">
                Email:
                <input
                  data-testid="product-detail-email"
                  id="email"
                  value={ email }
                  type="email"
                  placeholder="Digite seu email"
                  name="email"
                  onChange={ this.handleChange }
                  className="input ml-5"
                />
              </label>
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
                  className="input ml-5"
                />
              </label>
            </div>
            <button
              data-testid="submit-review-btn"
              type="submit"
              onClick={ this.onSaveButtonClick }
              className="button p-3 flex m-auto"
            >
              Salvar
            </button>
          </form>
          <p className="p-8">
            Esta é uma avaliação sobre o produto realizada na tela de detalhe.
          </p>
        </div>
        <br />

        <div className="p-2 flex flex-col gap-7">
          {storage && !loading
            && storage.map((evaluation) => (
              <div key={ evaluation.email } className="flex flex-col gap-2">
                <p>
                  Usuario:
                  {' '}
                  {evaluation.email}
                </p>
                <p>
                  Nota:
                  {evaluation.nota}
                </p>
                <p>
                  {evaluation.comment}
                </p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Evaluation;
