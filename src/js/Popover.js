export default class Popover {
  constructor() {
    this.title = null;
    this.text = null;
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
    // Обновляем данные из data-атрибутов перед показом
    if (targetElement.dataset.title) {
      this.title = targetElement.dataset.title;
    }
    if (targetElement.dataset.content) {
      this.text = targetElement.dataset.content;
    }

    if (!this.popoverElement) {
      this.popoverElement = this.createPopover();
      document.body.append(this.popoverElement);
    } else {
      // Обновляем существующий попап с новыми данными
      const titleElement = this.popoverElement.querySelector(".popover-title");
      const contentElement =
        this.popoverElement.querySelector(".popover-content");

      if (titleElement) titleElement.textContent = this.title;
      if (contentElement) contentElement.textContent = this.text;
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
