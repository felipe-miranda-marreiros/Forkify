import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _Message = '';

  //Event Handlers - Publisher-Subscriber Pattern
  addHandlerRender(handler) {
    //A array abaixo tem como objetivo mostrar a função controlRecipes quando o haash (#) mudar no url e quando a página dê load.
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }
  /**
   * @param  {} handler função responsável por atualizar os botões de porções para o usuário.
   */
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  /**
   *
   *_generateMarkup é responsável por renderizar as receitas como imagens, informações, quantidades, etc.
   */
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
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
  _generateMarkupIngredient(ingredient) {
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
