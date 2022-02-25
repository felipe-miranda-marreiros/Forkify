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

/**
 * A função showRecipe é uma async function que retorna um fetch de uma API.
 * Nela temos, Try, Catch
 */
const showRecipe = async function () {
  try {
    /**
     * Guardamos o conteúdo da API em uma variável chamada response. O fetch é precedido de await.
     */
    const response = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca36'
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    /**
     * Formatamos o conteúdo do fetch (que vem em string), em formato json(), conforme a variável abaixo.
     */
    const data = await response.json();

    /**
     * Se o conteúdo do response tiver algum erro, nós usamos o if abaixo para mostrar ao usuário o conteúdo do erro.
     *
     * response.ok é um valor booleano que apresenta true ou false. True significa que a conexão foi feita com sucesso e False ocorreu algum erro.
     *
     * data.message é o status do conteúdo da API.
     *
     */
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    /**
     * O objeto abaixo é uma forma de formatação da data recebida pelo fetch. É só uma reorganização de nome. Recipe faz parte da data.data.
     */
    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    /**
     * A função de catch é detectar qualquer erro apresentado no try.
     */
  } catch (error) {
    alert(error);
  }
};

showRecipe();
