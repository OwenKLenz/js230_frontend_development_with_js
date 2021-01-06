- Div 1: 7 nodes
- Div 2: 5 nodes

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Counting Nodes</title>
    <meta charset="utf-8"/>
  </head>
  <body>
    <div>
      <p>Then press the <em>Draw</em> button</p>
    </div> 

    <div><p>Then press the <em>Draw</em> button.</p></div>
  </body>

  <script>
    let counter = 0;

    function walk(startingNode, callback) {
      [...startingNode.childNodes].forEach(childNode => {
        callback();
        if (childNode.childNodes) {
          walk(childNode, callback);
        }
      });
    }

    walk(document.body.firstElementChild, function () {
      counter += 1;
    });

    console.log(`First div has ${counter} nodes`);

    counter = 0;


    walk(document.body.firstElementChild.nextElementSibling, function () {
      counter += 1;
    });

    console.log(`Second div has ${counter} nodes`);
  </script>
</html>
```
