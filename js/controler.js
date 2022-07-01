"use strict";
import * as model from "./model";
import "core-js/stable";
import "regenerator-runtime";

import recipeView from "./views/recipeView";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import paginationView from "./views/paginationView";
import bookMarkView from "./views/bookMarksView";
import bookMarksView from "./views/bookMarksView";
import newRecipeView from "./views/newRecipeView";

import { MODAL_CLOSE } from "./config";

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipe(id);

    model.state.recipe.saved = model.state.bookMarks.some(
      ({ id: objID }) => objID === id
    );

    recipeView.render(model.state.recipe);
    resultsView.update(model.getSearchResults(model.state.search.page));
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
}

async function controlSearch(query) {
  if (!query) return;
  try {
    model.state.search.page = 1;

    resultsView.renderSpinner();
    await model.search(query);

    resultsView.render(model.getSearchResults(model.state.search.page));
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
}

function controlPagination(goto) {
  resultsView.update(model.getSearchResults(goto));
  paginationView.update(model.state.search);
}

function controlBookMarkClick() {
  const { recipe } = model.state;

  if (!recipe.saved) model.addBookMark(recipe);
  else model.removeBookMark(recipe.id);

  recipeView.update(model.state.recipe);
  bookMarkView.render(model.state.bookMarks);
}

function bookMarksLoad() {
  model.getBookMarks();
  bookMarksView.render(model.state.bookMarks);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

async function controlRecipeAdd(data) {
  try {
    // Spinner animation
    newRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(data);

    // Render Bookmarks
    bookMarkView.render(model.state.bookMarks);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Sucess message
    newRecipeView.renderSucess();

    // Changing the url hash
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
  } catch (error) {
    console.error(error);
    newRecipeView.renderError(error.message);
  }
}

function init() {
  recipeView.addHandlerEvent(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookMarkClick(controlBookMarkClick);

  searchView.addHandlerEvent(controlSearch);
  paginationView.addHandlerEvent(controlPagination);
  bookMarksView.addHandlerEvent(bookMarksLoad);
  newRecipeView.addHandlerSubmit(controlRecipeAdd);
}

init();
