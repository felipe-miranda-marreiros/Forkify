import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = 'We could not find that recipe. Please try another one!';
  #Message = '';

  /**
   * @param  {} data é responsável por renderizar, globalmente, as receitas usando o método #generateMarkup()
   */
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  #clear() {
    this.#parentElement.innerHTML = '';
  }
  /**
   *
   * @param {html} parentEl recebe o parente mais próximo e coloca uma animação de "carregando" antes de qualquer coisa aparecer.
   */
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * @param  {} message=this.#errorMessage mostra uma mensagem de erro para o usuário caso uma receita não for encontrada
   */
  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
    <p>${message}. Please try again!</p>
  </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * @param  {} message=this.#errorMessage mostra uma mensagem de confirmação
   */
  renderMessage(message = this.#errorMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
    <p>${message}. Please try again!</p>
  </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //Event Handlers - Publisher-Subscriber Pattern
  addHandlerRender(handler) {
    //A array abaixo tem como objetivo mostrar a função controlRecipes quando o haash (#) mudar no url e quando a página dê load.
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }
  /**
   *
   * #generateMarkup é responsável por renderizar as receitas como imagens, informações, quantidades, etc.
   */
  #generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this.#data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }
  /**
   * @param  {string} ingredient tem como função renderizar os ingredientes para receita. Esse método é separado por questões de refatoração.
   *
   * new Fraction é o uma biblioteca do JavaScript que transforma, por exemplo, 0/5 em 1/2.
   */
  #generateMarkupIngredient(ingredient) {
    return `
    <li class="recipe__ingredient">
        <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity
            ? new Fraction(ingredient.quantity).toString()
            : ''
        }</div>
        <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
   </li>
    `;
  }
}

export default new RecipeView();
