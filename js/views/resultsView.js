import View from "./view";

class resultsView extends View {
  _parent = document.querySelector(".results");
  _data;
  _errorMsg = "Nothing found";

  constructor() {
    super();
  }

  _generateHTML() {
    return this._data.map((obj) => this.generatePreview(obj)).join("");
  }
}

export default new resultsView();
