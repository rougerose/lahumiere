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
