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

    this.arrowElement = this.createArrowElement();
    this.updateArrowPosition();
  }

  createArrowElement() {
    const arrowElement = document.createElement("span");

    arrowElement.dataset.element = "arrow";
    arrowElement.classList.add("sortable-table__sort-arrow");
    arrowElement.innerHTML = `<span class="sort-arrow"></span>`;

    return arrowElement;
  }

  updateArrowPosition() {
    const columnElement = this.element.querySelector(`[data-id="${this.sortedId}"]`);
    columnElement.append(this.arrowElement);
  }

  handleElementClick = (e) => {
    const element = e.target.closest(".sortable-table__cell[data-sortable='true']");

    this.sortedId = element.dataset.id;
    this.sortedOrder = element.dataset.order === 'desc' ? 'asc' : 'desc';

    element.dataset.order = this.sortedOrder;

    this.updateArrowPosition();
    this.sort(this.sortedId, this.sortedOrder);
  };


  createEventListeners() {
    this.element.addEventListener('pointerdown', this.handleElementClick);
  }

  destroyEventListeners() {
    this.element.removeEventListener('pointerdown', this.handleElementClick);
  }

  destroy() {
    super.destroy();
    this.destroyEventListeners();
  }
}

