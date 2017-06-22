$(function(){
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

// =====================================
// search-overlay
// =====================================

var $searchOpen = $('.js-search-open'),
    $searchClose = $('.js-search-close'),
    $searchContainer = $('.js-form--search'),
    $searchInput = $('.js-form__field--search');

$searchOpen.on('click', openSearch);

$searchClose.on('click', closeSearch);

$(document).keyup(function(e) {
  if( e.keyCode == 27 ) {
    closeSearch();
  }
});

function openSearch() {
  event.preventDefault();
  $searchContainer.addClass('is-visible');
  $searchInput.focus();
}

function closeSearch() {
  $searchContainer.removeClass('is-visible');
  $searchInput.blur();
  $searchInput.val('');
}

});