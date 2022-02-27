import 'core-js/stable';
import 'regenerator-runtime/runtime';

import searchView from './views/searchView';
import * as model from './model';

import recipeView from './views/recipeView';
import resultsView from './views/resultsView';

if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    // resultsView.renderSpinner();
    //Essa variável tem como objetivo detectar qualquer mudança de link no url do navegador. Quando o link mudar, iremos pegar ID atual, por exemplo #5ed6604591c37cdc054bc886, e colocar dinamicamente no fetch (response)
    const id = window.location.hash.slice(1);

    if (!id) return;
    //Colocamos a função renderSpinner antes do fetch para criar a impressão de carregamento
    recipeView.renderSpinner();
    /**
     * @param  {} id pegamos ID do window.location.hash
     */
    await model.loadRecipe(id);
    //Renderizando receitas abaixo
    recipeView.render(model.state.recipe);
    /**
     * A função de catch é detectar qualquer erro apresentado no try.
     */
  } catch (error) {
    //O método renderError mostra uma mensagem de erro caso uma receita não for encontrada
    recipeView.renderError();
  }
};

//A função abaixo tem como objetivo controlar o input do usuário
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //Renderizando preview de receitas
    resultsView.render(model.state.search.results);
  } catch (error) {}
};

//Event Handlers - Publisher-Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
