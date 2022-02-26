import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';

const { async } = require('regenerator-runtime');

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
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

//Event Handlers - Publisher-Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
