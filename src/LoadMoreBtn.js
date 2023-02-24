export default class LoadMoreBtn {
  constructor({ selector, isHidden = true }) {
    this.button = document.querySelector(selector);
    if (isHidden) this.hide();
    else this.show;
  }

  disabled() {
    this.button.disabled = true;
  }

  enabled() {
    this.button.disabled = false;
  }
  hide() {
    this.button.classList.add('hidden');
  }
  show() {
    this.button.classList.remove('hidden');
  }
}
