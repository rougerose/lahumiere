<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

// zcore
$GLOBALS['z_blocs'] = array('content', 'head', 'head_js', 'header', 'footer');


// Développement

// pas de cache
define('_NO_CACHE', -1);

// tous les logs
define('_LOG_FILELINE',true);

// pas de cache CSS et JS
define('_INTERDIRE_COMPACTE_HEAD_ECRIRE', true);

// toutes les erreurs dans SPIP
define('SPIP_ERREUR_REPORT',E_ALL);
