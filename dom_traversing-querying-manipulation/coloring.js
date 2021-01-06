function walkToGeneration(element, counter, callback) {
  let childElements = element.children;

  console.log(childElements);
  if (!callback(element, counter) && childElements) {
    counter += 1;
    [...childElements].forEach(childElement => walkToGeneration(childElement, counter, callback));
  }
}

function colorGeneration(generationNum) {
  let firstNode = document.getElementById('1');

  walkToGeneration(firstNode, 1, function (element, counter) {
    if (counter === generationNum) {
      element.setAttribute('class', 'generation-color');
      return true;
    } 
  });
}

colorGeneration(3);
