(function(){
'use strict';
// =====================================
// portfolio
//
// utilise masonry et imagesloaded
// =====================================

var $grid = $('.js-portfolio');

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

})();