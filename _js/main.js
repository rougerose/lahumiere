$(function(){
  var $grid = $(".js-portfolio");
  // init Masonry
  if ($grid.length) {
    // init Masonry
    $grid.masonry({
      itemSelector: '.o-layout__item',
      columnWidth: '.c-portfolio__sizer',
      percentPosition: true
    });
    // imagesLoaded
    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });
  }
});
