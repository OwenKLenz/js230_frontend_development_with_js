// Data Structures:
//   - A dispatch table containing the validation logic for each form element with the element's id as a key

const VALIDATION_LOGIC = {
  empty: value => value.length === 0,

  phoneNumber: value => /(^\d?-?\d{3}-?\d{3}-?\d{4}$)/.test(value) || value === '',

  password: value => value.length >= 10,

  email: value => /.+@.+/.test(value),
}

const REQUIRED = ['firstName', 'lastName', 'password', 'email'];

const MESSAGES = {
  phoneNumber: "Invalid Phone Number",
  password: "Passwords must be 10 or more characters",
  email: "Invalid Email Address",
}

function Input(element) {
  this.element = element;
  this.id = element.id;
  this.message;
  this.addBlurEvent();
  this.addFocusEvent();
};

Input.prototype.addMessage = function(message) {
  this.message = document.createElement('span');
  this.message.innerText = message;
  this.message.classList.add('message');
  this.element.insertAdjacentElement('afterEnd', this.message);
};

Input.prototype.removeMessage = function() {
  this.message.remove();
};

Input.prototype.addBlurEvent = function() {
  this.element.addEventListener('blur', event => {
    let value = event.currentTarget.value.trim();

    // if (this.element.validity.patternMismatch) {
    //   this.element.classList.add('invalid');
    //   this.addErrorMessage();
    // } else {
    //   this.element.classList.remove('invalid');
    //   this.removeErrorMessage;
    // }

    if (REQUIRED.includes(this.id) && VALIDATION_LOGIC.empty(value)) {
      this.addMessage('This field is required');
      this.element.classList.add('invalid');
    } else if (VALIDATION_LOGIC[this.id]) {
      if (!VALIDATION_LOGIC[this.id](value)) {
        this.addMessage(MESSAGES[this.id]);
        this.element.classList.add('invalid');
      } else {
        this.element.classList.remove('invalid');
        this.element.classList.add('valid');
      }
    } else {
      this.element.classList.remove('invalid');
      this.element.classList.add('valid');
    }
  });
}

Input.prototype.addFocusEvent = function() {
  this.element.addEventListener('focus', () => {
    if (this.message) {
      this.message.remove();
      this.message = null;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let fixErrorsMessage = document.createElement('h3');
  fixErrorsMessage.innerText = "Fix errors before submitting this form";

  let successMessage = document.createElement('h4');
  successMessage.innerText = "Form was successfully submitted!";

  let inputElements = document.querySelectorAll('input');
  inputElements.forEach(el => new Input(el));

  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    if (document.getElementsByClassName('message').length > 0) {
      document.body.insertAdjacentElement("afterbegin", fixErrorsMessage
    } else {
      document.body.insertAdjacentElement("beforeend", successMessage);
      fixErrorsMessage.remove();
    }
  });

});

// 1. Attach blur event listener to each input
//   - For each input, perform the appropriate validation
//   - if invalid, display red error message
//   - Whenever displaying an error increment a errorCount (private?) variable
// 2. Attach focus event listener to each input
//   - Remove error message if present
//   - decrement errorCount
// 3. Don't submit form if there are any errors
//   - If errorCount is > 0


