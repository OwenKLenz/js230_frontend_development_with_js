// 2. General App class
//   - Store the `languages` container element in a property
//   - Attach an event listener to languages container
//     - 
//   - Iterates over the languages when constructor is invoked and creates a new language object for each language
//   - When initialized on DOMContentLoaded, creates stores an array of Language objects from argument array of languages
//     - Invoke the new Language constructor with the language data
//   - After constructing the languages, iterate over the languages
//     - appendLanguage
//       - call `toHTML` on each and append the resulting HTML to the `languages` container

// 3. Language class
//   - constructor sets the name and description of the language
//   - Contains the DOM object representing the language HTML created from Handlebars template
//   - Method to set an event listener function on the button
//     - function tracks a private boolean truncate variable that gets toggled and determines if entire text is shown
//     - Toggle method targets the text content and sets it to the full text or partial text
//   - toHTML method sends language data to the template argument to return an HTML template
//   - 

const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  let languageTemplate = Handlebars.compile(document.querySelector('#language').innerHTML);

  class Language {
    constructor({name, description}) {
      this.name = name;
      this.description = description;
      this.domElement = this.createElement();
      this.addToggleListener();
    }

    createElement() {
      let container = document.createElement('div');
      container.innerHTML = languageTemplate({ 
        name: this.name,
        description: this.description.slice(0, 120),
        large: this.description.length > 120,
      });

      return container;
    }

    addToggleListener() {
      let button = this.domElement.querySelector('button');
      if (button) {
        button.addEventListener('click', this.createToggleListener());
      }
    }

    createToggleListener() {
      let truncated = true;

      return function(event) {
        if (truncated) {
          this.displayAll(event);
        } else {
          this.displaySome(event); 
        };

        truncated = !truncated;

      }.bind(this);
    }

    displaySome(event) {
      event.target.previousElementSibling.innerText = this.description.slice(0, 120) + "...";
      event.target.innerText = 'Show Less';
    }

    displayAll(event) {
      event.target.previousElementSibling.innerText = this.description;
      event.target.innerText = 'Show More';
    }
  }

  class App {
    constructor(languages) {
      this.languages = [];
      this.languageContainer = document.getElementById('languages');

      languages.forEach(this.addLanguage.bind(this));
    }

    addLanguage(language) {
      let newLanguage = new Language(language);
      this.languages.push(newLanguage);
      this.languageContainer.appendChild(newLanguage.domElement); 
    }
  }

  let myApp = new App(languages);
  myApp.addLanguage({ name: "Fred", description: "Fred is cool" })
});
