class Templates {
  static init() {
    let templates = [...document.querySelectorAll("[type='x-handlebars-template']")];
    templates.forEach(template => {
      this[template.id] = Handlebars.compile(template.innerHTML);
    });
  }
}

class Car {
  constructor(car) {
    this.container = document.getElementById("carContainer"); 
    this.properties = car;
    this.init();
  } 

  init() {
    this.add();
  }

  add(car) {
    let carHTML = Templates.carTemplate(this.properties);
    this.container.insertAdjacentHTML('beforeend', carHTML);
    this.element = this.container.lastElementChild;
  }

  match(filters) {
    return Object.keys(filters).every(filterName => {
      if (filters[filterName] === 'All') {
        return true;
      } else {
        return String(this.properties[filterName]) === filters[filterName];
      }
    });
  }

  hide() {
    this.element.classList.add('hidden');
  }

  show() {
    this.element.classList.remove('hidden');
  }
}

class App {
  constructor(cars) {
    this.selectorContainer = document.getElementById("selectorContainer");
    this.filterButton = document.getElementById("filter");
    this.resetButton = document.getElementById("reset");
    this.carList = cars.map(car => new Car(car));
    this.selectors = { make: [], model: [], year: [], price: [] };
    this.modelMakeMap = {};
    this.init();
  }

  init() {
    this.gatherUniqueValues(cars);
    this.addSelectors();
    this.addListeners(); 
  }

  addListeners() {
    document.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      this.filterVehicles(event);
    });

    this.resetButton.addEventListener('click', () => {
      this.carList.forEach(car => car.show());
      this.showAllOptions();
      this.selectorContainer.firstElementChild.reset();
    });

    this.selectorContainer.addEventListener('change', event => {
      if (event.target.name === 'make') {
        this.filterModels(event);
      } else if (event.target.name === 'model') {
        this.filterMakes(event);
      }
    });
  }

  showAllOptions() {
    let makeSelector = document.querySelector('[name="make"]');
    let modelSelector = document.querySelector('[name="model"]');
    [...makeSelector.options].forEach(option => option.style.display = 'block');
    [...modelSelector.options].forEach(option => option.style.display = 'block');

  }

  filterModels(event) {
    let options = [...event.target.nextElementSibling.options];
    let make = event.target.value;

    options.forEach(option => {
      if (make === 'All' || this.modelMakeMap[option.value] === make) {
        option.style.display = 'block';
      } else if (option.value !== 'All'){
        option.style.display = 'none';
      }
    });
    // Iterate over the options in the 'model' selector
    //   - If an makeModelMap[option] is NOT the make name, hide it
  }

  filterMakes(event) {
    let model = event.target.value;
    let make = this.modelMakeMap[model];
    let options = [...event.target.previousElementSibling.options];

    options.forEach(option => {
      if (model === 'All' || option.value === make) {
        option.style.display = 'block';
      } else if (option.value !== 'All'){
        option.style.display = 'none';
      }
    });
    // grab the make associated with the model
    // Iterate over the options in the 'make' selector
    //   - If make doesn't match earlier make, hide it.
  }

  addSelectors() {
    let selectorHTML = Templates.selectorsTemplate({selectors: this.selectors});
    this.selectorContainer.innerHTML = selectorHTML;
  }

  filterVehicles(event) {
    let filters = this.acquireFilters(event.target);

    this.carList.forEach(car => {
      if (!car.match(filters)) {
        car.hide();
      } else {
        car.show();
      }
    });
  }

  acquireFilters(form) {
    let filters = {};

    let formData = new FormData(form);

    for (let [criteria, value] of formData.entries()) {
      filters[criteria] = value; 
    }

    return filters;
  }

  gatherUniqueValues(cars) {
    Object.keys(this.selectors).forEach(criteria => {
      cars.forEach(car => {
        if (!this.selectors[criteria].includes(car[criteria])) {
          this.selectors[criteria].push(car[criteria]);
          if (criteria === 'model') {
            this.modelMakeMap[car.model] = car.make;
          }
        }
      });
    });
  }
}

const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

document.addEventListener('DOMContentLoaded', () => {
  Templates.init();
  new App(cars);
});
