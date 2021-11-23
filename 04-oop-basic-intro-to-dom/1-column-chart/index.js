export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor({data = [], label = '', value = '', link = '', formatHeading = (data) => data} = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
  }

  getTemplate() {
    return `
      <div class="column-chart ${this.getLoadingClass()}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.getTitle()}
          ${this.getTitleLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.formatHeading(this.value)}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getCharts(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getLoadingClass() {
    return !this.data.length ? 'column-chart_loading' : '';
  }

  getTitle() {
    return this.label ? `Total ${this.label}` : '';
  }

  getTitleLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getCharts(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    let charts = '';
    for (const item of this.data) {
      let value = Math.floor(item * scale);
      let percent = (item / maxValue * 100).toFixed();
      charts += `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
    }

    return charts;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  update(newData) {
    this.data = newData;
    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element.remove();
  }
}
