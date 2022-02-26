import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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
