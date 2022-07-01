import fracty from "fracty";
import View from "./view";

class RecipeView extends View {
  _parent = document.querySelector(".recipe");
  _data;
  _errorMsg = "We could'not find that recipe!";
  _sucessMsg = "Start by searching for a recipe or an ingredient. Have fun!";

  constructor() {
    super();
    this.renderSucess();
  }

  _generateHTML() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image_url}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${this._icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${this._icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings" data-update-to="${
          this._data.servings - 1 || 1
        }">
          <svg>
            <use href="${this._icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${this._icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
      <svg>
        <use href="${this._icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round" data-saved="${this._data.saved}">
      <svg class="">
        <use href="${this._icons}#icon-bookmark${
      this._data.saved ? "-fill" : ""
    }"></use>
      </svg>
    </button>
  </div>
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${this._data.ingredients
        .map((obj) => {
          return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${this._icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          obj.quantity ? fracty(obj.quantity) : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${obj.unit || ""}</span>
          ${obj.description}
        </div>
      </li>`;
        })
        .join("")}
  
      
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${this._data.publisher}</span>. Please
      check out directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.source_url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${this._icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  // Publisher
  addHandlerEvent(handler) {
    ["load", "hashchange"].forEach((e) => window.addEventListener(e, handler));
  }

  addHandlerServings(handler) {
    this._parent.addEventListener("click", function (e) {
      const target = e.target.closest(".btn--tiny ");
      if (!target) return;

      const { updateTo } = target.dataset;
      handler(+updateTo);
    });
  }

  addHandlerBookMarkClick(handler) {
    this._parent.addEventListener("click", function (e) {
      const button = e.target.closest(".btn--round");
      if (!button) return;

      handler(button.dataset.saved);
    });
  }
}

export default new RecipeView();
