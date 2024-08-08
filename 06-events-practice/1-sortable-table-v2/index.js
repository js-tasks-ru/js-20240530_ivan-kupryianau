import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted: { sortedId = 'title', sortedOrder = 'asc' } = {},
  } = {}) {
    super(headersConfig, data);

    this.headerConfig = headersConfig;
    this.data = data;
    this.sortedId = sortedId;
    this.sortedOrder = sortedOrder;
    this.isSortLocally = true;
    this.sort(sortedId, sortedOrder);
    this.createEventListeners();
  }

  sortOnServer() {
    return undefined;
  }

  handleSortSource(id, order) {
    if (this.isSortLocally) {
      this.sort(id, order);
    } else {
      this.sortOnServer();
    }
  }

  handleElementClick = (e) => {
    const element = document.querySelector(".sortable-table__cell[data-sortable='true']");
    const div = document.createElement("div");
    div.classList.add('arrowContainer');
    element.append(div);
    e.currentTarget.querySelector('.arrowContainer').innerHTML = this.handleAddArrow();
    this.sortedId = element.dataset.id;
    this.sortedOrder = element.dataset.order ? 'asc' : 'desc';
    element.dataset.order = this.sortedOrder;
    this.handleSortSource(this.sortedId, this.sortedOrder);
  }

  handleAddArrow() {
    return (`
       <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
    `);
  }

  createEventListeners() {
    this.element.addEventListener('click', (e) => this.handleElementClick(e));
  }

  destroyEventListeners() {
    this.element.removeEventListener('click', this.handleElementClick);
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}

