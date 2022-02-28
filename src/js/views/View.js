import icons from 'url:../../img/icons.svg';

export default class view {
  _data;
  /**
   * @param  {} data é responsável por renderizar, globalmente, as receitas usando o método_generateMarkup()
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    //Atualizar apenas textos
    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() != ''
      ) {
        currentElement.textContent = newElement.textContent;
      }
      //Atualizar apenas atributos do HTML
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * @param  {} message=this.#errorMessage mostra uma mensagem de erro para o usuário caso uma receita não for encontrada
   */
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
    <p>${message}.</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  /**
   * @param  {} message=this.#errorMessage mostra uma mensagem de confirmação
   */
  renderMessage(message = this._Message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
    <p>${message}.</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
