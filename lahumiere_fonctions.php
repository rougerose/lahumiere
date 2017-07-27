<?php

if (!defined("_ECRIRE_INC_VERSION")) return;

/**
 * Suppression des retours à la ligne et tabulations
 * générés par les boucles de SPIP.
 *
 * @filtre
 * @link      http://seenthis.net/messages/391910#message392025
 * @link      http://www.paris-beyrouth.org/tutoriaux-spip/article/objectif-pagespeed-100-100-avec
 * @author    Arno
 * @param     string $html
 * @return    string $html
**/
function mini_html($texte) {
  $texte = preg_replace(",\n[\t\ ]*,", "", $texte);
  $texte = preg_replace(",\n+,", "", $texte);
  return $texte;
}



/**
 * Formater un prénom et un nom.
 *
 * fonction reprise de
 * https://contrib.spip.net/Ameliorer-l-affichage-public-et-la
 *
 * @filtre
 * @param  string $texte        Nom*Prénom
 * @return string Prénom Nom    Prénom suivi d'une espace insécable Nom ou la chaîne d'entrée.
 */
function prenom_nom($texte) {
  if (strstr($texte, "*")) {
    if (prenom($texte) && nom($texte)) {
      return prenom($texte)."&nbsp;".nom($texte);
    }
  }
  else {
    return $texte;
  }
}

/**
 * Formater un nom.
 *
 * fonction reprise de
 * https://contrib.spip.net/Ameliorer-l-affichage-public-et-la
 *
 * @filtre
 * @param  string $texte Nom*Prénom
 * @return string $nom|$texte Le nom ou la chaîne complète.
 */
function nom($texte) {
  if ($nom = strstr($texte, "*", true)) {
    return trim($nom);
  }
  else {
    return $texte;
  }
}


/**
 * Formater un prénom.
 *
 * fonction reprise de
 * https://contrib.spip.net/Ameliorer-l-affichage-public-et-la
 *
 * @filtre
 * @param  string $texte Nom*Prénom
 * @return string $prenom|void Le prénom ou rien.
 */
function prenom($texte) {
  if(strstr($texte,"*")) {
    if($prenom = trim(preg_replace('/^(.*)\*(.*)/i','$2',$texte))) {
      return trim($prenom);
    }
  }
  else {
    return "";
  }
}
