import { RECIPE_URL, SEARCH_URL, PERPAGE, API_KEY } from "./config.js";
import { AJAX } from "./helpers.js";

// -----------------------------------
// STATE
// -----------------------------------
export const state = {
  recipe: {},
  search: {
    page: 1,
    PERPAGE,
    query: "",
    results: [],
    page: 1,
  },
  bookMarks: [],
};

/**
 * Get the recipe infos from the forkify and update the state.recipe
 * @param {number | string} id
 */
export async function loadRecipe(id) {
  const json = await AJAX(RECIPE_URL + id + `?key=${API_KEY}`).get();
  const { recipe } = json.data;
  state.recipe = recipe;

  state.recipe.saved = recipe.id in state.bookMarks;
}

/**
 * Get recipes from the forkify api based on the specified query and then update the state
 * @param {string} query
 */
export async function search(query) {
  const json = await AJAX(SEARCH_URL + query + `&key=${API_KEY}`).get();
  const { recipes } = json.data;

  state.search.results = recipes;
  state.search.query = query;
}

/**
 * Get the search results from the search.results object based on the page parameter and
 * update the search.page
 * @param {number} page
 * @returns {Array} Array containing recipes preview
 */
export function getSearchResults(page = 1) {
  state.search.page = page;
  const { results } = state.search;
  console.log(state);

  const start = (page - 1) * PERPAGE;
  const end = PERPAGE * page;

  return results.slice(start, end);
}

/**
 * Update the ingredients amount of the current recipe based on the newServings parameter
 * @param {number} newServings
 */
export function updateServings(newServings) {
  const { recipe } = state;
  if (!recipe) return;

  const { servings } = recipe;

  recipe.ingredients.forEach((obj) => {
    if (!obj.quantity) return;

    obj.quantity = (obj.quantity * newServings) / servings;
  });

  recipe.servings = newServings;
}

/**
 * Add the recipe to the bookMarks object and update the localStorage
 * @param {object} recipe
 */
export function addBookMark(recipe) {
  state.bookMarks.unshift(recipe);
  localStorage.setItem("bookMarks", JSON.stringify(state.bookMarks));

  recipe.saved = true;
}

/**
 * Remove the recipe from the bookMarks object and update the localStorage
 * @param {Number | String} id id of the recipe
 */
export function removeBookMark(id) {
  const { bookMarks } = state;

  bookMarks.splice(
    bookMarks.findIndex(({ id: objID }) => objID === id),
    1
  );
  localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
  state.recipe.saved = false;
}

/**
 * Get the values from localStorage and update the bookMarks object
 */
export function getBookMarks() {
  const item = localStorage.getItem("bookMarks");
  const bookMarks = item ? JSON.parse(item) : [];

  state.bookMarks = bookMarks;
}

/**
 * Upload a recipe to the forkify server
 * @param {Array} newRecipe Array of entries
 */
export async function uploadRecipe(newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(([key, value]) => {
      if (!key.startsWith("ingredient")) return;

      delete newRecipe[key];
      if (!value) return;
      return true;
    })
    .map(([, value]) => {
      const arr = value.replaceAll(" ", "").split(",");
      if (arr.length !== 3) throw new Error("Ingredients format is wrong!");

      const [quantity, unit, description] = arr;

      return {
        quantity: quantity ? +quantity : null,
        unit: unit || null,
        description: description || null,
      };
    });

  newRecipe.ingredients = ingredients;
  newRecipe.servings = +newRecipe.servings;
  newRecipe.cooking_time = +newRecipe.cooking_time;

  const { data } = await AJAX(RECIPE_URL + "?key=" + API_KEY).post(newRecipe);
  state.recipe = data.recipe;

  addBookMark(state.recipe);
}
