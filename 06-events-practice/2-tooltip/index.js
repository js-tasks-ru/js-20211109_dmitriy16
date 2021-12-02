class Tooltip {
  element
  static _tooltipInstance;

  constructor() {
    if (!Tooltip._tooltipInstance) {
      Tooltip._tooltipInstance = this;
    } else {
      return Tooltip._tooltipInstance;
    }
  }

  initialize() {
    this.initEventListeners();
  }

  render(text) {
    const element = document.createElement('div');
    element.className = 'tooltip';
    element.innerHTML = text;

    this.element = element;
    document.body.append(this.element);
  }

  over = event => {
    const element = event.target.closest('[data-tooltip]');
    if (element) {
      this.render(element.dataset.tooltip);
      document.addEventListener('pointermove', this.move);
    }
  }

  out = () => {
    if (this.element) {
      this.remove();
    }
  }

  move = event => {
    this.element.style.left = `${Math.round(event.clientX + 10)}px`;
    this.element.style.top = `${Math.round(event.clientY + 10)}px`;
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.over);
    document.addEventListener('pointerout', this.out);
  }

  removeListeners() {
    document.addEventListener('pointerover', this.over);
    document.addEventListener('pointerout', this.out);
    document.addEventListener('pointermove', this.move);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.removeListeners();
  }
}

export default Tooltip;
