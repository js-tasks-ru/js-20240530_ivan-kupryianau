export default class SortableTable {
  element;
  subElements;

  constructor(headerConfig = [],
    data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.subElements = {};
    this.getSubElements();
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');

    for (const element of elements) {
      this.subElements[element.dataset.element] = element;
    }
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
            <div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.createTemplateHeader()}
            </div>
            <div data-element="body" class="sortable-table__body">
                ${this.createTemplateBody()}
            </div>
        </div>
      </div>
    `;
  }

  createTemplateBodyItem(dataItem) {
    return `
        <a href="/products/${dataItem.id}" class="sortable-table__row">
        ${this.headerConfig.map((item) => {
    if (item.template) {
      return item.template(dataItem.images);
    } else {
      return `
              <div class="sortable-table__cell">${dataItem[item.id]}</div>
            `;
    }
  }).join("")}
       </a>`;
  }

  createTemplateBody() {
    return this.data.length === 0
      ? this.emptyPlaceholderTemplate()
      : this.data.map(item => this.createTemplateBodyItem(item)).join('');
  }

  emptyPlaceholderTemplate() {
    return `
         <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>
    `;
  }

  createTemplateHeader() {
    return this.headerConfig.map(({id, sortable, title}) => {
      return `
        <div class="sortable-table__cell" data-id=${id} data-sortable=${sortable}>
        <span>${title}</span>
      </div>
      `;
    }).join("");
  }

  sort(field = "title", order = "asc") {
    const k = order === "asc" ? 1 : -1;

    this.data.sort(
      (firstValue, secondValue) =>
        k *
        firstValue[field]
          .toString()
          .localeCompare(secondValue[field], ["ru", "en"], {
            caseFirst: "upper",
            numeric: true,
          }),
    );

    this.update(this.data);
  }

  update(newData) {
    this.data = newData;
    this.element.querySelector('[data-element="body"]').innerHTML = this.createTemplateBody();
    this.subElements.body.innerHTML = this.data.map(item => this.createTemplateBodyItem(item)).join('');
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

