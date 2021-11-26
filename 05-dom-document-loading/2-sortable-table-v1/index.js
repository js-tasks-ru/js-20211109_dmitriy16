export default class SortableTable {
  element;
  subElements = {};

  constructor(headerCfg, {data = []} = {}) {
    this.header = headerCfg;
    this.data = Array.isArray(data) ? data : data.data;

    this.render();
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.getTableHeader()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.getTableRows(this.data)}
          </div>
          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getTableHeader() {
    return this.header.map(({id = '', title = '', sortable = false}) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
          <span>${title}</span>
          <span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>
        </div>
        `;
    }).join('');
  }

  getTableRows(tableRows) {
    return tableRows.map(item => {
      return `<a href="/products/${item.id}" class="sortable-table__row">
        ${this.getTableCells(item)}
      </a>`;
    }).join('');
  }

  getTableCells(tableCell) {
    return this.header.map(({id, template}) => {return {id, template};}).map(({id, template}) => {
      if (template) {
        return template(tableCell[id]);
      } else {
        return `<div class="sortable-table__cell">${tableCell[id]}</div>`;
      }
    }).join('');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');
    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;
      return accum;
    }, {});
  }

  sort(fieldValue, orderValue) {
    const headerType = this.header.find(item => item.id === fieldValue);
    const sortDir = (orderValue === 'asc') ? 1 : (-1);
    const sortType = headerType.sortType === 'string' ? (a, b) => a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'}) : (a, b) => a - b;
    const dataSorting = [...this.data].sort((a, b) => sortType(a[fieldValue], b[fieldValue]) * sortDir);
    const currentHeader = this.element.querySelectorAll('.sortable-table__cell[data-sortable="true"]');
    const newHeader = this.element.querySelector(`.sortable-table__cell[data-id=${fieldValue}]`);

    currentHeader.forEach(cell => cell.dataset.order = '');
    newHeader.dataset.orderValue = orderValue;
    this.subElements.body.innerHTML = this.getTableRows(dataSorting);
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.element.remove();
    this.subElements = {};
  }
}

