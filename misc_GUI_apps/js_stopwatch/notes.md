Classes
  EventCallbacks

  App
  - Stopwatch 
    - hour
    - minute
    - second
    - centisecond
    - element
  - Presentation
    - buttons
    - startStopButton
    - resetButton
    - stopwatch
  - intervalId(s)

Events
  - Click start/stop
    - If start, setInterval every 10 ms
      - Every invocation of callback increments cs, if cs === 99, cs = 0 and seconds = 1, etc.
      - set button text to Stop
    - If stop, 
      - clearInterval
      - set button text to Start

  - Click reset
    - if interval was set, clearInterval
    - set hour, minute, etc. to 0 and update DOM
