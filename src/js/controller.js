import 'core-js/stable';
import 'regenerator-runtime/runtime';

import searchView from './views/searchView';
import * as model from './model';

import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

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

    //Renderizando preview de receitas com paginação (getSearchResultsPage)
    resultsView.render(model.getSearchResultsPage(1));

    //Renderização de botões da paginação
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (goToPage) {
  //Renderizando novos previews de receitas com paginação (getSearchResultsPage)
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Renderização de novos botões da paginação
  paginationView.render(model.state.search);
};

//Event Handlers - Publisher-Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
