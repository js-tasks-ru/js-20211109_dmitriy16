export default class NotificationMessage {
  element;

  static notificationInstance;

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
    if (NotificationMessage.notificationInstance) {
      NotificationMessage.notificationInstance.remove();
    }
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    NotificationMessage.notificationInstance = this.element;
  }

  show(target = document.body) {
    target.append(this.element);
    setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    this.element.remove();
    NotificationMessage.notificationInstance = null;
  }

  destroy() {
    this.element.remove();
  }
}
