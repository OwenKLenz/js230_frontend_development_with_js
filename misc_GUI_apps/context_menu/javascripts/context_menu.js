$(() => {
  let $menu = $('.contextMenu');
  let $thing = $('.thing');

  $thing.on('contextmenu', event => {
    event.preventDefault(); 
    event.stopPropagation();
    $menu.css('display', 'block');
    $menu.css('left', event.clientX);
    $menu.css('top', event.clientY);
    $(document).on('click', event => {
      if(!$(event.target).hasClass('contextMenu')) {
        $menu.css('display', 'none');
      }
    });
  });
});
