Page Structure:
  1. Form
    - Inputs:
      1. firstName - validation: required
      2. lastName - validation: required
      3. password - validation: >= 10 characters
      4. email - validation: pattern=".+@.+"
      5. phoneNumber - validation: not required, if included, must be valid US phone #
    - Submit button

App Logic:
  - App Constructor
    - Properties:
      - Array of inputs
      - The form element
    Methods:
      - Add blur event (takes an input element)
        - Check validityState object for valueMissing 
          - If missing, attach error message
          - increment error count
        - else check validityState object for patternMismatch
          - If mismatch, attach error message
          - increment error count
        - If all elements `willValidate`, remove the fix errors message (if present)
      - Add focus event (takes an input element)
        - Remove fixErrors element
      - Attach form submission listener
        - If all elements checkValidity(), display formSubmitted message and clear values
        - otherwise, display fixErrors element
