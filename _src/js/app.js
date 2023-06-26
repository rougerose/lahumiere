$(function () {
  // SearchOverlay
  let $searchOpen = $(".js-search-open"),
    $searchClose = $(".js-search-close"),
    $searchContainer = $(".js-form--search"),
    $searchInput = $(".js-form__field--search");

  if ($searchOpen.length) {
    $searchOpen.on("click", openSearch);
    $searchClose.on("click", closeSearch);

    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        closeSearch();
      }
    });

    function openSearch(event) {
      event.preventDefault();
      $searchContainer.addClass("is-visible");
      $searchInput.focus();
    }

    function closeSearch() {
      $searchContainer.removeClass("is-visible");
      $searchInput.blur();
      $searchInput.val("");
    }
  }

  // Portfolio
  let $grid = $(".js-portfolio");

  if ($grid.length) {
    // init Masonry
    $grid.masonry({
      itemSelector: ".o-layout__item",
      columnWidth: ".c-portfolio__sizer",
      percentPosition: true,
    });

    // imagesLoaded
    $grid.imagesLoaded().progress(function () {
      $grid.masonry("layout");
    });
  }
});
