import SortableTableV1 from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted: {id = 'title', order = 'asc'} = {},
  } = {}) {
    super(headersConfig, data);
    this.sortedId = id;
    this.sortedOrder = order;
    this.createEventListeners();
    this.handleSortSource();
  }

  handleSortSource() {
    this.sort(this.sortedId, this.sortedOrder);
    this.headerSorted = this.element.querySelector(
      `[data-id="${this.sortedId}"]`
    );
    this.headerSorted.append(this.handleCreateArrow());
  }

  handleElementClick = (e) => {
    const element = e.target.closest(".sortable-table__cell[data-sortable='true']");
    e.target.append(this.handleCreateArrow());
    this.sortedId = element.dataset.id;
    this.sortedOrder = element.dataset.order === 'asc' ? 'desc' : 'asc';
    element.dataset.order = this.sortedOrder;

    this.handleSortSource(this.sortedId, this.sortedOrder);
  };

  handleCreateArrow() {
    let arrowElement = this.element.querySelector(
      ".sortable-table__sort-arrow"
    );

    if (!arrowElement) {
      arrowElement = document.createElement("span");
      arrowElement.dataset.element = "arrow";
      arrowElement.classList.add("sortable-table__sort-arrow");
      arrowElement.innerHTML = `<span class="sort-arrow"></span>`;
    }
    return arrowElement;
  }

  createEventListeners() {
    this.element.addEventListener('click', this.handleElementClick);
  }

  destroyEventListeners() {
    this.element.removeEventListener('click', this.handleElementClick);
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}

