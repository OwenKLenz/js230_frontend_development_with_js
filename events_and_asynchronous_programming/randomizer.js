// Randomizer

function randomizer(...callbacks) {
  const MILLISECONDS_PER_SECOND = 1000;

  let maxTime = callbacks.length * 2;
  let secondCounter = 1;

  let intervalId = setInterval(() => {
    console.log(secondCounter++);

    if (secondCounter > maxTime) {
      clearInterval(intervalId);
    }
  }, 1000);

  callbacks.forEach(callback => {
    let waitTime = Math.floor(Math.random() * maxTime) * MILLISECONDS_PER_SECOND;

    setTimeout(callback, waitTime);
  });
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3, () => console.log('a'), () => console.log('b'));

// Output:
// 1
// 2

