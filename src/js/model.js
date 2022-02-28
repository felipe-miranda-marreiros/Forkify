import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

/**
 * A função loadRecipe é uma async function que retorna um fetch de uma API.
 * Nela temos, Try, Catch
 */
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    /**
     * O objeto abaixo é uma forma de formatação da data recebida pelo fetch. É só uma reorganização de nome. Recipe faz parte da data.data.
     */
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

//A função abaxio tem como objetivo fazer fetch para buscar receitas. As receitas vem em formato Array.
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      //O objeto abaixo é apenas questão de formatação
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredients => {
    ingredients.quantity =
      //Formula: newQuantity * newServings / oldServings
      // 2 * 8 / 4 = 4;
      (ingredients.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
