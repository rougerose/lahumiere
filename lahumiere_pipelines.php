<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

function lahumiere_insert_head_css($flux) {
    $flux .= '<link rel="stylesheet" href="'.find_in_path('css/app.min.css').'" type="text/css" />';
    return $flux;
}


function lahumiere_insert_head($flux) {
  // lib
  $flux .= '<script src="'.find_in_path('js/lib.min.js').'" type="text/javascript" defer></script>';

  // app
  $flux .= '<script src="'.find_in_path('js/app.min.js').'" type="text/javascript" defer></script>';

  return $flux;
}
