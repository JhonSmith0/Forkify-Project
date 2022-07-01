import View from "./view";
class SearchView extends View {
  _parent = document.querySelector(".search");
  _input = this._parent.querySelector(".search__field");

  constructor() {
    super();
  }

  getQuery() {
    return this._input.value;
  }

  clearInput() {
    this._input.value = "";
  }

  addHandlerEvent(handler) {
    this._parent.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this.getQuery());
      this.clearInput();
    });
  }
}

export default new SearchView();
