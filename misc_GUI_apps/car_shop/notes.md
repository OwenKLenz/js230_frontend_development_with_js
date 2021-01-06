3. Static HTML
  - Cars container
  - Selectors container
2. Templates:
  - A car display template
    - image
    - make
    - model
    - price
    - year
  - A selector template of selectors containing unique data points
    - makes
    - models
    - years
    - price
3. Container Objects
  App:
    - Gather unique values (array of objects with selector name as key and array of unique values as value)
      - [{critera: 'make', values: ['Toyota', 'Audi', 'Ford']}, model: ['Tacoma', 'Focus'..]...}]
    - collection of cars
    - collection of selectors
    - filterCars(k-vPair array)
    - gatherFilterCriteria 
  Car:
    - Contains the data associated with the car (for filtering)
    - A hide/show method
    - A reference to its car container
  Selector:
    - references each selector element
    - this.name is selector type (make, model, etc.)
    - selector `value()` is a method that retrieves the current value of selector
4. EventListeners
  - Click on filter button 
    - iterate over selectors gathering filtering critera for each category (array of k-v pairs)
    - get selector name as key, selector value() as value
    - iterate over cars, if car matches all k-v pairs, `show` it, otherwise `hide` it 
  - click on reset button
    - `show` all cars and reset selectors
