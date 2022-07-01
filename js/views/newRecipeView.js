import View from "./view";

class NewRecipeView extends View {
  _parent = document.querySelector(".upload");

  _overlay = document.querySelector(".overlay");
  _window = document.querySelector(".add-recipe-window");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  _sucessMsg = "Recipe was sucessfully uploaded :)";

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerCloseWindow();
  }

  _generateHTML() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="TEST" required name="title" type="text" />
    <label>URL</label>
    <input value="TEST" required name="source_url" type="text" />
    <label>Image URL</label>
    <input value="TEST" required name="image_url" type="text" />
    <label>Publisher</label>
    <input value="TEST" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cooking_time" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="${this._icons}#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>`;
  }

  toggleWindow = () => {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  };

  addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", () => {
      this.toggleWindow();
      this._parent.innerHTML = this._generateHTML();
    });
  }

  addHandlerCloseWindow() {
    [this._btnClose, this._overlay].forEach((elm) =>
      elm.addEventListener("click", this.toggleWindow)
    );
  }

  addHandlerSubmit(handler) {
    this._parent.addEventListener("submit", (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parent)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new NewRecipeView();
