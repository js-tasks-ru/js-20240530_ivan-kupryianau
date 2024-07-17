export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 1,
    link = '',
    formatHeading = value => value
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.element = this.createElement(this.createTemplate());
  }

  createTemplate() {
    return `
    <div class="${this.createCSSColumnChartClass()}" style="${this.chartHeight}">
      <div class="column-chart__title">
        ${this.label}
        ${this.createTemplateLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.createBodyTemplate()}
        </div>
      </div>
  </div>
`;
  }

  createCSSColumnChartClass() {
    return this.data.length ? `column-chart` : 'column-chart column-chart_loading';
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;

    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  update(newData) {
    this.data = newData;
    this.element.querySelector('[data-element="body"]').innerHTML = this.createBodyTemplate();
  }

  createBodyTemplate() {
    return this.data ? this.getColumnProps().map(({ percent, value }) => {
      return `
        <div style="--value: ${value}" data-tooltip="${percent}"></div>
      `;
    }).join('') : `<img src='./charts-skeleton.svg' alt='charts-skeleton' />`;
  }

  createTemplateLink() {
    return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
