import View from "./view";

class bookMarkView extends View {
  _parent = document.querySelector(".bookmarks__list");
  _errorMsg = "No bookmarks yet. Find a nice recipe and bookmark it :)";

  constructor() {
    super();
  }

  addHandlerEvent(handler) {
    window.addEventListener("load", handler);
  }

  _generateHTML() {
    return Object.values(this._data)
      .map(
        (obj) => `<li class="preview">
        <a class="preview__link preview__link--active" href="#${obj.id}">
          <figure class="preview__fig">
            <img src="${obj.image_url}" alt="${obj.title}">
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${obj.title}</h4>
            <p class="preview__publisher">${obj.publisher}</p>
            <div class="preview__user-generated ${obj.key ? "" : "hidden"}">
              <svg>
              <use href="${this._icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`
      )
      .join("");
  }
}

export default new bookMarkView();
