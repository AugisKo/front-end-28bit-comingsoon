class Form {
  constructor(selector, toastObject) {
    this.selector = selector;
    this.toastObject = toastObject;

    this.DOM = null;
    this.allInputsDOM = [];
    this.submitButtonDOM = null;

    this.init();
  }
  init() {
    // patikrinti, ar validus selektorius
    //jei bent vienas is ju nevalidus, tai baigiame darba
    if (!this.isValidSelector()) {
      cosole.error('ERROR: nepraejo pirmines patkros');
      return false;
    }

    //susirasti DOM elementa
    this.DOM = document.querySelector(this.selector);

    //jei ne, baigiam darba
    if (!this.DOM) {
      console.error('ERROR: Elementa not found');
      return false;
    }

    //susirasti visus formos laukus: input, textarea
    //susirasti formos submit mygtuka
    this.allInputsDOM = this.DOM.querySelectorAll('input, textarea');
    this.submitButtonDOM = this.DOM.querySelector('button');

    //uzregistruojame mygtuko paspaudimo ivyki
    this.addEvents();
  }
  //patikrinti, ar validus selector
  isValidSelector() {
    if (typeof this.selector !== 'string' || this.selector === '') {
      //console.error('ERROR: nevalidus selektorius');
      return false;
    }
    return true;
  }
  isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    //console.error('ERROR: Email address has wrong format');
    return true;
  }

  isValidMessage(message) {
    if (typeof message !== 'string' || message === '') {
      //console.error('ERROR: Message has to be a text');
      return false;
    }
    return true;
  }
  isValidName(name) {
    if (!this.isValidMessage(name)) {
      //console.error('ERROR: Name has to be a text');
      return false;
    }
    if (name.length < 2) {
      //console.error('ERROR: Name has to be longer than 2 letters');
      return false;
    }
    if (name[0].toLowerCase() === name[0]) {
      console.error('ERROR: Name can not to be empty');
      return false;
    }
    if (name.slice(1).toLowerCase() !== name.slice(1)) {
      console.error('ERROR: Name has to be one word');
      return false;
    }
    return true;
  }
  addEvents() {
    this.submitButtonDOM.addEventListener('click', (event) => {
      event.preventDefault();
      let allGood = true;

      for (let element of this.allInputsDOM) {
        const validationRule = element.dataset.validation;

        if (validationRule === 'email') {
          if (this.isValidEmail(element.value) === false) {
            allGood = false;
            break;
          }
        }
        if (validationRule === 'name') {
          if (this.isValidName(element.value) === false) {
            allGood = false;
            break;
          }
        }
        if (validationRule === 'message') {
          if (this.isValidMessage(element.value) === false) {
            allGood = false;
            break;
          }
        }
      }
      console.log('All Good?', allGood);
      if (allGood) {
        this.toastObject.success('Tavo formos informacija buvo issiusta!');
      } else {
        this.toastObject.error('Formoje yra klaida!');
      }
    });

    // submit mygtumo paspaudimo metu reikia isjungti default veikima

    //issitraukti is visu formos lauku informacija
    //eiti per visus laukus ir atpazinus informacijos tipa atlikti tos informacijos validacija

    //jei patikrinus visus laukus nerasta nei vienos klaidos, tai "siunciam pranesima"
    // jei patikrinus rasta bent viena klaida, tai parodome visus klaidos pranesimus (kol kas, viskas pateikiama i console )
  }
}

export { Form };
