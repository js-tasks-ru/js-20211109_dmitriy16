export default class NotificationMessage {
  element;

  static isShowed;

  constructor(message = '', { duration = 0, type = ''} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  getTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (NotificationMessage.isShowed) {
      NotificationMessage.isShowed.remove();
    }
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    NotificationMessage.isShowed = this.element;
  }

  show(target = document.body) {
    target.append(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
    NotificationMessage.isShowed = null;
  }

  destroy() {
    this.element.remove();
  }
}
