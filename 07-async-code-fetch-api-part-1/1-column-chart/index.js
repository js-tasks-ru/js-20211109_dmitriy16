import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
  element;
  chartHeight = 50;
  subElements = {};

  constructor({label = '', link = '', url = '', range = {from: new Date(), to: new Date()}, formatHeading = data => data,} = {}) {

    this.label = label;
    this.link = link;
    this.url = new URL(url, BACKEND_URL);
    this.range = range;
    this.formatHeading = formatHeading;

    this.render();
    this.update(this.range.from, this.range.to);
  }

  getTemplate() {
    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          ${this.getTitle()}
          ${this.getTitleLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
          </div>
          <div data-element="body" class="column-chart__chart">
          </div>
        </div>
      </div>
    `;
  }

  getTitle() {
    return this.label ? `Total ${this.label}` : '';
  }

  getTitleLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  getHeader(data) {
    const total = Object.values(data).reduce((acc, value) => acc + value, 0);
    if (this.formatHeading) {
      return this.formatHeading(total);
    }
    return `${total}`;
  }

  getCharts(data) {
    const maxValue = Math.max(...Object.values(data));
    const ratio = this.chartHeight / maxValue;
    return Object.entries(data).map(([date, currentValue]) => {
      const currentChartHeight = String(Math.floor(currentValue * ratio));
      const currentChartPercent = (currentValue / maxValue * 100).toFixed();
      return `<div style="--value: ${currentChartHeight}" data-date="${date}" data-tooltip="${currentChartPercent}%"></div>`;
    }).join('');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  async update (from, to) {
    this.element.classList.add('column-chart_loading');
    this.url.searchParams.set('from', from.toISOString());
    this.url.searchParams.set('to', to.toISOString());
    const data = await fetchJson(this.url);

    if (data && Object.values(data).length) {
      this.element.classList.remove('column-chart_loading');
      this.subElements.header.innerHTML = this.getHeader(data);
      this.subElements.body.innerHTML = this.getCharts(data);
    }

    this.data = data;
    return this.data;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = null;
  }
}
