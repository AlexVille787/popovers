import Popover from "./js/Popover";
import "./css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".popover-btn");
  if (!button) return;

  const popover = new Popover({
    title: "Popover title",
    text: "And here's some amazing content. It's very engaging. Right?",
  });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    popover.toggle(button);
  });

  window.addEventListener("resize", () => {
    if (popover.isVisible) {
      popover.positionPopover(button);
    }
  });
});
