import { icons } from "../config";

class view {
  _icons = icons;
  constructor() {}

  renderSpinner() {
    this._parent.innerHTML = "";
    this._parent.insertAdjacentHTML(
      "afterbegin",
      `        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`
    );
  }

  render(data) {
    if (
      !data ||
      (Array.isArray(data) && !data.length) ||
      !Object.keys(data).length
    )
      return this.renderError();

    this._data = data;
    this._parent.innerHTML = this._generateHTML();
  }
  update(data) {
    if (
      !data ||
      (Array.isArray(data) && !data.length) ||
      !Object.keys(data).length
    )
      return;

    this._data = data;
    const newHTML = this._generateHTML();

    // Convert html to DOM object
    const newDOM = document.createRange().createContextualFragment(newHTML);

    // currentElements
    const currentElements = [...this._parent.querySelectorAll("*")];

    // "virtual" elements
    const newElements = [...newDOM.querySelectorAll("*")];

    newElements.forEach((newElem, index) => {
      const currElem = currentElements[index];

      // If both elements have not changed
      if (newElem.isEqualNode(currElem)) return;

      // If the element is a text element
      if (newElem.firstChild?.nodeValue.trim()) {
        currElem.textContent = newElem.textContent;
      }

      // Update the currentElement atributes
      [...newElem.attributes].forEach(({ name, value }) =>
        currElem.setAttribute(name, value)
      );
    });
  }

  renderError(msg) {
    this._parent.innerHTML = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${msg ?? this._errorMsg}</p>
    </div>`;
  }

  renderSucess() {
    this._parent.innerHTML = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${this._sucessMsg}</p>
    </div>`;
  }

  generatePreview(obj) {
    const id = window.location.hash.slice(1);
    return `<a class="preview__link${
      obj.id === id ? " preview__link--active" : ""
    }" href="#${obj.id}">
  <figure class="preview__fig">
    <img src="${obj.image_url}" alt="${obj.title}">
  </figure>
  <div class="preview__data">
    <h4 class="preview__title">${obj.title}</h4>
    <p class="preview__publisher">${obj.publisher}</p>
  </div>
  <div class="preview__user-generated ${obj.key ? "" : "hidden"}">
  <svg>
  <use href="${this._icons}#icon-user"></use>
  </svg>
</div>
</a>`;
  }
}

export default view;
