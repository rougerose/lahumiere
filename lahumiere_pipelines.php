<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

function lahumiere_insert_head_css($flux) {
    $flux .= '<link rel="stylesheet" href="'.find_in_path('css/app.css').'" type="text/css" />';
    return $flux;
}
