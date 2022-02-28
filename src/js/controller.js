import 'core-js/stable';
import 'regenerator-runtime/runtime';

import searchView from './views/searchView';
import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';

import recipeView from './views/recipeView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

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

    //Marcação de resultado quando for buscado pelo usuário
    resultsView.update(model.getSearchResultsPage());

    /**
     * @param  {} id pegamos ID do window.location.hash
     */
    await model.loadRecipe(id);
    //Renderizando receitas abaixo
    recipeView.render(model.state.recipe);

    //Atualizando bookmarks para o usuário
    bookmarksView.update(model.state.bookmarks);
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
    resultsView.render(model.getSearchResultsPage());

    //Renderização de botões da paginação
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (goToPage) {
  //Renderizando novos previews de receitas com paginação (getSearchResultsPage)
  resultsView.render(model.getSearchResultsPage(goToPage));

  //Renderização de novos botões da paginação
  paginationView.render(model.state.search);

  recipeView.update(model.state.recipe);
};

const controlServings = function (newServings) {
  //Atualizar a quantidade de porções de cada receita
  model.updateServings(newServings);
  //Atualizar o recipeView()
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Adicionar ou remover bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.state.recipe.bookmarked;
    model.deleteBookmark(model.state.recipe.id);
  }
  //Atualizar a receita para o usuário
  recipeView.update(model.state.recipe);

  //Renderizar bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmars = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Mostrar loading spinner
    addRecipeView.renderSpinner();
    //Fazer upload de uma nova receita para o Forkify
    await model.uploadRecipe(newRecipe);

    //renderizar receita
    recipeView.render(model.state.recipe);

    //Mensagem de confirmação
    addRecipeView.renderMessage();

    //Renderizar bookmark
    bookmarksView.render(model.state.bookmarks);

    //Mudar ID no URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Fechar o modal window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};
//Event Handlers - Publisher-Subscriber Pattern
const init = function () {
  bookmarksView.addHandlerRender(controlBookmars);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
