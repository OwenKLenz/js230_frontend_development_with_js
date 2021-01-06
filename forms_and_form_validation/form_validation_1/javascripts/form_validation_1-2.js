document.addEventListener('DOMContentLoaded', () => {
  class App {
    constructor() {
			this.messageTemplate = Handlebars.compile(document.getElementById('message-template').innerHTML);

      this.inputs = [...document.querySelectorAll('input')];
      this.form = document.querySelector('form');
      this.inputs.forEach(this.attachBlurEvent.bind(this));
      this.inputs.forEach(this.attachFocusEvent.bind(this));
			this.attachSubmitListener(this.form);
      this.addCCKeypressListener();
      this.addNameKeypressListener();
    }

    allInputsValid() {
      return this.inputs.every(inputElement => {
        return inputElement.checkValidity();
      });
    }

    attachBlurEvent(inputElement) {
      inputElement.addEventListener('blur', event => {
        let validityState = event.currentTarget.validity;
        let message;

				if (!event.currentTarget.classList.contains('invalid')) {
					if (validityState.valueMissing) {
						message = event.currentTarget.dataset.requiredMessage;
					} else if (validityState.patternMismatch) {
						message = event.currentTarget.dataset.patternMismatchMessage;
					}
				}

        if (message) {
          this.addErrorMessage(event.currentTarget, message);
          event.currentTarget.classList.add('invalid');
        } else if (event.currentTarget.validity.patternMismatch || 
                   event.currentTarget.validity.valueMissing) 
        {
          event.currentTarget.classList.add('invalid');
				} else {
					event.currentTarget.classList.add('valid');
        }
				
				if (this.allInputsValid()) {
					this.form.nextElementSibling.textContent = "";
				}
      });
    }

		attachSubmitListener(form) {
			form.addEventListener('submit', event => {
				event.preventDefault();
				if (!this.allInputsValid()) {
					this.form.nextElementSibling.textContent = "Please complete all required fields before submitting";
					this.inputs.forEach(input => input.dispatchEvent(new Event('blur')));
				} else {
					alert("Thanks for your submission!");
					this.form.reset();
					this.inputs.forEach(input => input.classList.remove('valid'));
				}
			});
		}

    addCCKeypressListener() {
      let ccElementContainer = document.querySelector('.ccn').parentNode;
      ccElementContainer.addEventListener('keydown', event => {
        if (!/\d/.test(event.key)) {
          event.preventDefault();
        }
      });
    }

    addNameKeypressListener() {
      let nameContainer = document.getElementById('firstName').parentNode;
      nameContainer.addEventListener('keydown', event => {
        if (!/[a-zA-Z\'\s]/.test(event.key)) {
          event.preventDefault();
        }
      });
    }

		attachFocusEvent(inputElement) {
			inputElement.addEventListener('focus', (event => {
        if (inputElement.name !== 'ccn') {
          this.removeErrorMessage(event.currentTarget);
        }
				event.target.classList.remove('invalid');
				event.target.classList.remove('valid');
			}).bind(this));
    }

    addErrorMessage(element, message) {
			let messageHTML = this.messageTemplate({message});
			element.insertAdjacentHTML('afterend', messageHTML);
			element.classList.remove('valid');
    }
		
		removeErrorMessage(element) {
			if (element.classList.contains('invalid')) {
				element.nextElementSibling.remove();
				element.classList.remove('invalid');
			}
		}
  }

  new App();
});
