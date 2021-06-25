class Progressbar {
  constructor(selector, data) {
    this.selector = selector;
    this.data = data;

    this.DOM = null;

    this.init();
  }

  init() {
    //jei bent vienas is ju nevalidus, tai baigiame darba
    if (!thia.isValidSelector() || !this.isValidData()) {
      cosole.error('ERROR: netraejo pirmines patkros');
      return false;
    }

    //susirandame reikiama vieta, pagal pateikta selector
    const DOM = document.querySelector(this.selector);
    // jeigu vieta neegzistuoja, tai baigiame darba
    if (!this.DOM) {
      console.error('ERROR: nerastas elementas, pagal duota selector');
      return false;
    }

    // generuojame turini ir istatome i reikiama vieta
    this.render();
  }
  //patikrinti, ar validus selector
  isValidSelector() {
    if (typeof this.selector !== 'string' || this.selector === '') {
      return false;
    }
    return true;
  }
  //patikrinti, ar validus data
  isValidData() {
    if (!Array.isArray(this.data) || this.data.length === 0) {
      return false;
    }
    return true;
  }
  render() {
    let HTML = '';
    for (const bar of this.data) {
      HTML += `
        <div class="progress-bar">
                    <div class="top">
                        <div class="title">${bar.title}</div>
                        <div class="value">${bar.value}%</div>
                    </div>
                    <div class="bottom">
                        <div class="progress" style="width: ${bar.value}%;">
                            <div class="value"></div>
                        </div>
                    </div>
                </div>
        `;
    }

    this.DOM.innerHTML += HTML;
  }
}

export { Progressbar };
