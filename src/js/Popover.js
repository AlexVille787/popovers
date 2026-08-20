export default class Popover {
  constructor(options = {}) {
    this.title = options.title || "Popover title";
    this.text =
      options.text ||
      "And here's some amazing content. It's very engaging. Right?";
    this.element = null;
    this.popoverElement = null;
    this.isVisible = false;
  }

  // Создаёт DOM-структуру попапа
  createPopover() {
    const popover = document.createElement("div");
    popover.className = "popover";
    popover.style.display = "none";

    const title = document.createElement("div");
    title.className = "popover-title";
    title.textContent = this.title;

    const content = document.createElement("div");
    content.className = "popover-content";
    content.textContent = this.text;

    const arrow = document.createElement("div");
    arrow.className = "popover-arrow";

    popover.append(arrow, title, content);

    return popover;
  }

  // Позиционирует попап над элементом
  positionPopover(targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const popoverRect = this.popoverElement.getBoundingClientRect();

    const left = rect.left + rect.width / 2 - popoverRect.width / 2;
    const bottom = window.innerHeight - rect.top + 10;

    this.popoverElement.style.left = `${Math.max(10, left)}px`;
    this.popoverElement.style.bottom = `${bottom}px`;
    this.popoverElement.style.top = "auto";
  }

  // Показывает попап
  show(targetElement) {
    if (!this.popoverElement) {
      this.popoverElement = this.createPopover();
      document.body.append(this.popoverElement);
    }

    this.popoverElement.style.display = "block";
    this.positionPopover(targetElement);
    this.isVisible = true;
  }

  // Скрывает попап
  hide() {
    if (this.popoverElement) {
      this.popoverElement.style.display = "none";
      this.isVisible = false;
    }
  }

  // Переключает состояние попапа
  toggle(targetElement) {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show(targetElement);
    }
  }

  // Удаляет попап из DOM
  destroy() {
    if (this.popoverElement && this.popoverElement.parentNode) {
      this.popoverElement.remove();
    }
    this.popoverElement = null;
    this.isVisible = false;
  }
}
