import View from "./view";

class paginationView extends View {
  _parent = document.querySelector(".pagination");
  constructor() {
    super();
  }

  _generateHTML() {
    const { results, page } = this._data;
    const prev = page - 1;
    const next = page + 1;
    const max = Math.ceil(results.length / this._data.PERPAGE);

    return `<button class="btn--inline pagination__btn--prev ${
      prev <= 0 ? "hidden" : ""
    }" data-goto="${prev}">
    <svg class="search__icon">
      <use href="${this._icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page - 1}</span>
  </button>
      
  <button class="btn--inline pagination__btn--next ${
    next > max ? "hidden" : ""
  }" data-goto="${next}">
    <span>Page ${page + 1}</span>
    <svg class="search__icon">
      <use href="${this._icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }

  addHandlerEvent(handler) {
    this._parent.addEventListener("click", function (e) {
      const target = e.target.closest("button");
      if (!target) return;

      const goto = +target.dataset.goto;
      handler(goto);
    });
  }
}

export default new paginationView();
